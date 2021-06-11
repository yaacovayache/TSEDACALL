const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Campaign = require('../../00_db/models/campaign');
const User = require('../../00_db/models/user');
const moment = require("moment");


// Create new campaign
router.post('/campaign', async(req, res) => {
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

module.exports = router
