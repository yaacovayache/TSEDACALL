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
module.exports = router
