const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const User = require('../../00_db/models/user');
const moment = require("moment");

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
module.exports = router
