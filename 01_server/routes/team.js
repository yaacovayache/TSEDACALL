const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Team = require('../../00_db/models/team');
const User = require('../../00_db/models/user');
const Campaign = require('../../00_db/models/campaign');
const moment = require("moment");


// Create new team
router.post('/team', auth, async(req, res) => {
    const team = new Team(req.body)
    try {
        await team.save()

        res.status(201).send(team)
    } catch (err) {
        res.status(400).send(err)
    }
})

// Add user in team
router.put('/team/:id/user', auth, async(req, res) => {
    try {
        const result = await Team.findByIdAndUpdate(req.params.id,  { $push: {users:req.body.users} })
        res.send(result);
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Update team
router.put('/team/:id', auth, async(req, res) => {
    try {
        const result = await Team.findByIdAndUpdate(req.params.id, req.body)
        res.send(result);
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get exist team
router.get('/team/:id', async(req, res) => {
    try {
        let team = await Team.findById(req.params.id)
        res.send(team)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get all teams
router.get('/teams', async(req, res) => {
    try {
        let teams = await Team.find()
        res.send(teams)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})



module.exports = router
