const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const User = require('../../00_db/models/user');
const moment = require("moment");
var multer  = require('multer')
const uploadImage = require('../middleware/upload')
var fs = require('fs');
const path = require('path');
const {ObjectId} = require('mongodb'); // or ObjectID

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../profile"))
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
router.post('/send/message/:id', auth, async(req, res) => {

    try {
        const user = await User.findByIdAndUpdate({_id: req.params.id}, {$push : {chat: {client : req.body.message} } })
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

// Get profile picture
router.get('/profile/:id', async(req, res) => {
    const user = await User.findById({_id: req.params.id}, {_id:false, img:true})
    const imageName = user.img.toString()
    const imagePath = path.join(__dirname, "../profile", imageName);
    fs.exists(imagePath, exists => {
        if (exists) res.sendFile(imagePath);
        else res.status(400).send('Error: Image does not exists');
    });
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
            { $limit : limit },
            {   
                $project:{
                    _id : 1,
                    fname : "$donationsColl.fname",
                    lname : "$donationsColl.lname",
                    email : "$donationsColl.email",
                    address : "$donationsColl.address",
                    zip : "$donationsColl.zip",
                    city : "$donationsColl.city",
                    amount : "$donationsColl.sum",
                    campaign_name : "$campaignColl.name",
                    campaign_id : "$campaignColl._id",
                    date : "$donationsColl.createdAt"
                } 
            }
        ]);
        res.send(donations)
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


module.exports = router
