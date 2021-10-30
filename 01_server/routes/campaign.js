const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Campaign = require('../../00_db/models/campaign');
const Donation = require('../../00_db/models/donation');
const User = require('../../00_db/models/user');
const moment = require("moment");
const uploadImage = require('../middleware/upload')
var fs = require('fs');
const path = require('path');
var multer  = require('multer')
const {ObjectId} = require('mongodb'); // or ObjectID 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../campaign/${req.params.id}/media`))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase())
    }
})
const upload = multer({
    storage: storage
})

const cover = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../campaign/${req.params.id}/cover`))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase())
    }
})
const upload_cover = multer({
    storage: cover
})


// Create new campaign
router.post('/campaign', auth, async(req, res) => {
    const campaign = new Campaign(req.body)
    try {
        await campaign.save()
        fs.mkdirSync(path.join(__dirname, `../campaign/${campaign._id}`));
        fs.mkdirSync(path.join(__dirname, `../campaign/${campaign._id}/cover`));
        fs.mkdirSync(path.join(__dirname, `../campaign/${campaign._id}/media`));
        res.status(201).send({ campaign })
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// Get exist campaign
router.get('/campaign/:id', async(req, res) => {
    try {
        campaignId = req.params.id;
        let campaign = await Campaign.findById(campaignId)
        let totalSum = await Donation.aggregate([{$match:{"campaignId": ObjectId(campaignId)}},{ $group: { _id: false, sum: {$sum: "$sum"}}}])
        campaign.totalSum = (totalSum.length)? totalSum[0].sum : 0
        res.send(campaign)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get exist campaign by url
router.post('/campaign/byurl', async(req, res) => {
    try {
        const url = req.body.url
        console.log(url)
        let campaign = await Campaign.findOne({url:url})
        let totalSum = await Donation.aggregate([{$match:{"campaignId": ObjectId(campaign._id)}},{ $group: { _id: false, sum: {$sum: "$sum"}}}])
        campaign.totalSum = (totalSum.length)? totalSum[0].sum : 0
        res.send(campaign)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get campaign by founder
router.get('/campaigns/founder/:id', async(req, res) => {
    try {
        founder = req.params.id
        let campaigns = await Campaign.find({founder_id:founder})
        for (let campaign of campaigns){
            let totalSum = await Donation.aggregate([{$match:{"campaignId": campaign._id}},{ $group: { _id: false, sum: {$sum: "$sum"}}}])
            campaign.totalSum = (totalSum.length)? totalSum[0].sum : 0
        }
        res.send(campaigns)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get all campaigns actif
router.get('/campaign', async(req, res) => {
    try {
        let campaigns = await Campaign.find({actif:true})
        for (let campaign of campaigns){
            let totalSum = await Donation.aggregate([{$match:{"campaignId": campaign._id}},{ $group: { _id: false, sum: {$sum: "$sum"}}}])
            campaign.totalSum = (totalSum.length)? totalSum[0].sum : 0
        }
        res.send(campaigns)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Update exist campaign
router.put('/campaign/:id', auth, async(req, res) => {
    try {
        const result = await Campaign.updateOne({ _id: req.params.id }, req.body)
        res.send({ message: 'updated', error : 0});
    } catch (err) {
        console.log(err)
        res.status(500).send({message: err.message, error : 1})
    }
})

// Get cover picture campaign
router.get('/cover/:id', async(req, res) => {
    const campaign = await Campaign.findById({_id: req.params.id}, {_id:false, cover:true})
    if (campaign.cover){
        const imageName = campaign.cover.toString()
        const imagePath = path.join(__dirname, `../campaign/${req.params.id}/cover`, imageName);
        fs.exists(imagePath, exists => {
            if (exists) res.sendFile(imagePath);
            else res.status(400).send('Error: Image does not exists');
        });
    }
})

// Get media names
router.get('/media/name/:id', async(req, res) => {
    const id = req.params.id
    const media = await Campaign.findById({_id: req.params.id}, {_id:false, media:true})
    res.send(media);
})

// Get media campaign
router.get('/media/:id/:name', async(req, res) => {
    const imageName = req.params.name
    const id = req.params.id
    const imagePath = path.join(__dirname, `../campaign/${id}/media`, imageName);
    fs.exists(imagePath, exists => {
        if (exists) res.sendFile(imagePath);
        else res.status(400).send('Error: Image does not exists');
    });
})

function compare( a, b ) {
    if ( a.totalSum < b.totalSum ){
      return 1;
    }
    if ( a.totalSum > b.totalSum ){
      return -1;
    }
    return 0;
  }

// Get vedette campaign
router.get('/campaign/find/top', async(req, res) => {
    try {
        let campaigns = await Campaign.find({actif:true, collect:false});
        for (let campaign of campaigns){
            let totalSum = await Donation.aggregate([{$match:{"campaignId": campaign._id}},{ $group: { _id: false, sum: {$sum: "$sum"}}}])
            campaign.totalSum = (totalSum.length)? totalSum[0].sum : 0
        }
        campaigns = campaigns.sort(compare);
        res.send(campaigns[0])
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Add media Image
router.post('/add/media/:id', upload.single('media'), async(req, res, next) => {
    const filename = req.file.filename;
    campaign = await Campaign.findByIdAndUpdate({_id: req.params.id},  { $push: {media:filename} })
    res.send(campaign)
})

// Update cover Image
router.post('/add/cover/:id', upload_cover.single('cover'), async(req, res, next) => {
    var filename = req.file.filename;
    var campaign = await Campaign.findById({_id: req.params.id}, {cover:true})
    if (campaign.cover){
        var lastFilePath = path.join(__dirname, `../campaign/${req.params.id}/cover`, campaign.cover)
        try { fs.unlinkSync(lastFilePath); }catch (err) { console.log(err) }
    }
    result = await Campaign.findByIdAndUpdate({_id: req.params.id},  { $set: {cover:filename} })
    res.send(result)
})

// Delete media Image
router.post('/delete/media/:id/:name', async(req, res, next) => {
    try{
        var lastFilePath = path.join(__dirname, `../campaign/${req.params.id}/media`, (req.params.name).toString())
        fs.unlinkSync(lastFilePath);
        campaign = await Campaign.findByIdAndUpdate({_id: req.params.id},  { $pull: {media:req.params.name} })
        res.send({ message: 'deleted', error : 0})
    } catch (err) {
        console.log(err)
        res.status(400).send({message: err.message, error : 1})
    }
})

module.exports = router
