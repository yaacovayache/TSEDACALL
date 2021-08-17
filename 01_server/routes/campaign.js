const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Campaign = require('../../00_db/models/campaign');
const Payment = require('../../00_db/models/donation');
const User = require('../../00_db/models/user');
const moment = require("moment");
const uploadImage = require('../middleware/upload')
var fs = require('fs');
const path = require('path');
var multer  = require('multer')
const {ObjectId} = require('mongodb'); // or ObjectID 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../campaign"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase())
    }
})
const upload = multer({
    storage: storage
})


// Create new campaign
router.post('/campaign', auth, async(req, res) => {
    const campaign = new Campaign(req.body)
    try {
        await campaign.save()

        res.status(201).send({ campaign })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Get exist campaign
router.get('/campaign/:id', async(req, res) => {
    try {
        campaignId = req.params.id;
        console.log(campaignId)
        let campaign = await Campaign.findById(campaignId)
        let totalSum = await Payment.aggregate([{$match:{"campaignId": ObjectId(campaignId)}},{ $group: { _id: false, sum: {$sum: "$sum"}}}])
        campaign.totalSum = totalSum[0].sum
        console.log(totalSum)
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
        res.send(campaigns)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get all campaigns
router.get('/campaign', async(req, res) => {
    try {
        let campaigns = await Campaign.find({actif:true})
        for (let campaign of campaigns){
            let totalSum = await Payment.aggregate([{$match:{"campaignId": campaign._id}},{ $group: { _id: false, sum: {$sum: "$sum"}}}])
            campaign.totalSum = totalSum[0].sum
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
        res.send(result);
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get cover picture campaign
router.get('/cover/:id', async(req, res) => {
    const campaign = await Campaign.findById({_id: req.params.id}, {_id:false, cover:true})
    const imageName = campaign.cover.toString()
    const imagePath = path.join(__dirname, `../campaign/${req.params.id}/cover`, imageName);
    fs.exists(imagePath, exists => {
        if (exists) res.sendFile(imagePath);
        else res.status(400).send('Error: Image does not exists');
    });
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
        let campaigns = await Campaign.find({actif:true});
        for (let campaign of campaigns){
            let totalSum = await Payment.aggregate([{$match:{"campaignId": campaign._id}},{ $group: { _id: false, sum: {$sum: "$sum"}}}])
            campaign.totalSum = totalSum[0].sum
        }
        campaigns = campaigns.sort(compare);
        res.send(campaigns[0])
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

module.exports = router
