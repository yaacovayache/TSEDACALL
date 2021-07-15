const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Campaign = require('../../00_db/models/campaign');
const Payment = require('../../00_db/models/donation');
const moment = require("moment");


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
        let campaign = await Campaign.findById(req.params.id)
        res.send(campaign)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get campaign by founder
router.get('/campaigns/founder/:id', async(req, res) => {
    try {
        founder = {_id: req.params.id}
        let campaigns = await Campaign.find({founder:founder})
        res.send(campaigns)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get all campaigns
router.get('/campaign', async(req, res) => {
    try {
        let campaigns = await Campaign.find()
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


module.exports = router
