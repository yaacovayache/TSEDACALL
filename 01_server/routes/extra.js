const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Currency = require('../../00_db/models/currency');
const PaymentType = require('../../00_db/models/paymentType');
const Country = require('../../00_db/models/country');



// Get all currencies
router.get('/currency', async(req, res) => {
    try {
        let currencies = await Currency.find()
        res.send(currencies)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get all payments type
router.get('/payment-type', async(req, res) => {
    try {
        let paymentType = await PaymentType.find()
        res.send(paymentType)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Get all countries
router.get('/country', async(req, res) => {
    try {
        let country = await Country.find()
        res.send(country)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Add currency
router.post('/currency', async(req, res) => {
    const currency = new Currency(req.body)
    try {
        await currency.save()
        res.status(201).send(currency)
    } catch (err) {
        res.status(400).send(err)
    }
})

// Add currency
router.post('/payment-type', async(req, res) => {
    const paymentType = new PaymentType(req.body)
    try {
        await paymentType.save()
        res.status(201).send(paymentType)
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router
