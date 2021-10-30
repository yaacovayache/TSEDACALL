const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const User = require('../../00_db/models/user');
const Campaign = require('../../00_db/models/campaign');
const moment = require("moment");
var multer  = require('multer')
const uploadImage = require('../middleware/upload')
var fs = require('fs');
const path = require('path');
const {ObjectId} = require('mongodb'); // or ObjectID

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        dirIfExist(path.join(__dirname, `../profile/${req.params.id}`))
        cb(null, path.join(__dirname, `../profile/${req.params.id}`))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase())
    }
})
const upload = multer({
    storage: storage
})

// Sign up new user
router.post('/register', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const accessToken = await user.generateAuthToken()

        res.status(201).send({ user, accessToken })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Log in existing user
router.post('/login', async(req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const accessToken = await user.generateAuthToken()
        res.send({ user, accessToken })
    } catch (err) {
        console.log(err)
        res.status(400).send({message: err.message})
    }
})

// Log out a user (delete token)
router.post('/logout', auth, async(req, res) => {
    try {
        req.user.accessToken = ''
        await req.user.save()

        res.status(200).send({ message: `${req.user.fname} has logged out` })
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})


// Get all associations
router.get('/associations', async(req, res) => {
    try {
        let associations = await User.find({role:2})
        res.send(associations)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get user By ID
router.get('/user/uid/:id', async(req, res) => {
    try {
        let user = await User.findById(req.params.id)
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Add message by chat
router.post('/send/message/:id/:type', auth, async(req, res) => {

    try {
        const user = await User.findByIdAndUpdate({_id: req.params.id}, {$push : {chat: {message : req.body.message, sender : req.params.type} } })
        res.send({ message: 'sent', error : 0})
    } catch (err) {
        console.log(err)
        res.status(400).send({message: err.message, error : 1})
    }
})

// get all messages of specific user by id
router.get('/message/:id', auth, async(req, res) => {

    try {
        const discution = await User.findById({_id: req.params.id}, {_id: false, chat:true})
        res.send(discution.chat)
    } catch (err) {
        console.log(err)
        res.status(400).send({message: err.message, error : 1})
    }
})

// get all users with messages
router.get('/users/messages', auth, async(req, res) => {

    try {
        const users = await User.find({chat: { $not: {$size: 0} }}).sort({"chat.seen": 1})
        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(400).send({message: err.message, error : 1})
    }
})

// Get profile picture
router.get('/profile/:id', async(req, res) => {
    const user = await User.findById({_id: req.params.id}, {img:true})
    const imageName = user.img.toString()
    const imagePath = (user.img != 'default.png') ? path.join(__dirname, `../profile/${(user._id).toString()}`, imageName) : path.join(__dirname, `../profile`, imageName);
    fs.exists(imagePath, exists => {
        if (exists) res.sendFile(imagePath);
        else res.status(400).send('Error: Image does not exists');
    });
})

// Upload profile picture
router.post('/profile/:id', auth, upload.single('newPhotoProfile'), async(req, res, next) => {
    var filename = req.file.filename;
    var user = await User.findById({_id: req.params.id}, {img:true})
    if (user.img != 'default.png'){
        var lastFilePath = path.join(__dirname, `../profile/${(user._id).toString()}`, (user.img).toString())
        try { fs.unlinkSync(lastFilePath); }catch (err) { console.log(err) }
    }
    user = await User.findByIdAndUpdate({_id: req.params.id},  { $set: {img:filename} })
    res.send(user)
})

// Get donation by association Id (limit = 5)
router.get('/donations/association/:id/:limit', async(req, res) => {
    try {
        let limit = (Number(req.params.limit))? Number(req.params.limit): 10000000000
        let associationId = ObjectId(req.params.id)
        let donations = await User.aggregate([
            {
                $lookup:{
                    from: "campaigns",
                    localField: "_id",
                    foreignField: "founder_id",
                    as: "campaign_collection"
                }
            },
            {   $unwind:"$campaign_collection" },
            {
                $lookup:{
                    from: "donations", 
                    localField: "campaign_collection._id", 
                    foreignField: "campaignId",
                    as: "donations_collection"
                }
            },
            {   $unwind:"$donations_collection" },    
            { $sort : { "donations_collection.createdAt" : -1 } },
    
            {
                $match:{"_id" : associationId}
            },
            { $limit : limit },
            {   
                $project:{
                    _id : "$donations_collection._id",
                    fname : "$donations_collection.fname",
                    lname : "$donations_collection.lname",
                    email : "$donations_collection.email",
                    address : "$donations_collection.address",
                    zip : "$donations_collection.zip",
                    city : "$donations_collection.city",
                    amount : "$donations_collection.sum",
                    campaign_name : "$campaign_collection.name",
                    campaign_id : "$campaign_collection._id",
                    date : "$donations_collection.createdAt"
                } 
            }
        ]);
        res.send(donations)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
  })


// Get association by campaign_id
router.get('/association/:campaign_id', async(req, res) => {
    try {
        let campaignId = ObjectId(req.params.campaign_id)
        let association = await Campaign.aggregate([
            {
                $lookup:{
                    from: "users", 
                    localField: "founder_id", 
                    foreignField: "_id",
                    as: "usersColl"
                }
            },
            {   $unwind:"$usersColl" },        
            {
                $match:{"_id" : campaignId}
            },
            {   
                $project:{
                    _id : 1,
                    fname : "$usersColl.fname",
                    lname : "$usersColl.lname",
                    email : "$usersColl.email",
                    address : "$usersColl.address",
                    zip : "$usersColl.zip",
                    city : "$usersColl.city",
                    associationName : "$usersColl.associationName",
                    campaign_name : "$name",
                } 
            }
        ]);
        res.send(association[0])
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
  })

// Get count donation by association Id
router.get('/count/donations/association/:id', async(req, res) => {
    try {
        let associationId = ObjectId(req.params.id)
        let count = await User.aggregate([
            {
                $lookup:{
                    from: "campaigns",
                    localField: "_id",
                    foreignField: "founder_id",
                    as: "campaignColl"
                }
            },
            {   $unwind:"$campaignColl" },
            {
                $lookup:{
                    from: "donations", 
                    localField: "campaignColl._id", 
                    foreignField: "campaignId",
                    as: "donationsColl"
                }
            },
            {   $unwind:"$donationsColl" },        
            {
                $match:{"_id" : associationId}
            },
            {   
                $group:{
                    _id:false,
                    count:{$sum:1},
                } 
            }
        ]);
        res.send(count[0])
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
  })

// Get donator by association Id
router.get('/donations/association/:id', async(req, res) => {
    try {
        let associationId = ObjectId(req.params.id)
        let donations = await User.aggregate([
            {
                $lookup:{
                    from: "campaigns",
                    localField: "_id",
                    foreignField: "founder_id",
                    as: "campaignColl"
                }
            },
            {   $unwind:"$campaignColl" },
            {
                $lookup:{
                    from: "donations", 
                    localField: "campaignColl._id", 
                    foreignField: "campaignId",
                    as: "donationsColl"
                }
            },
            {   $unwind:"$donationsColl" },        
            {
                $match:{"_id" : associationId}
            },
            {   
                $group:{
                    _id : 1,
                    fname: { $first : "$donationsColl.fname" }
                } 
            }
        ]);
        res.send(donations)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
  })

// Change user chat to seen
router.post('/seen/message/:id/:type', auth, async(req, res) => {

    try {
        const user = await User.updateMany({"_id": req.params.id, "chat.sender": req.params.type}, {$set : {"chat.$[chat].seen": true } }, {"arrayFilters": [{"chat.sender": req.params.type}]})
        res.send({ message: 'updated', error : 0})
    } catch (err) {
        console.log(err)
        res.status(400).send({message: err.message, error : 1})
    }
})

// Update user by id
router.put('/user/uid/:id', auth, async(req, res) => {
    try {
        const user = await User.updateMany({"_id": req.params.id}, {$set : req.body.item})
        res.send({ message: 'updated', error : 0})
    } catch (err) {
        console.log(err)
        res.status(400).send({message: err.message, error : 1})
    }
})

// path.join(__dirname, `../profile/${req.params.id}`)
function dirIfExist(name){
    if (!fs.existsSync(name)){
        fs.mkdirSync(name);
    }
}


module.exports = router
