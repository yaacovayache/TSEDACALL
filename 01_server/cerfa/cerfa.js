const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const moment = require("moment");
const createHtmlCerfa = require('./createTable');
const init = require('./createPdf');



// Create Cerfa
router.post('/cerfa', async(req, res) => {
    try {
        data = req.body
        createHtmlCerfa(data)
        const pdf = await init();
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('content-type', 'application/pdf');
        res.send(pdf);
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router
