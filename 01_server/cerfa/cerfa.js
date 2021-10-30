const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const moment = require("moment");
const createHtmlCerfa = require('./createTable');
const init = require('./createPdf');
var path = require('path'); 
const fs = require('fs');


const buildPaths = require('./buildPaths');
var nodemailer = require('nodemailer');


EMAIL = { user: 'lznjeremy@gmail.com', pass: 'kjljakxradqkfzcu' }

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL.user,
      pass: EMAIL.pass
    }
  });

// Create Cerfa
router.post('/cerfa', async(req, res) => {
    try {
        const data = req.body;
        if (fs.existsSync(buildPaths.buildPathDir(data.donator.don_id))) {
            var pdf = fs.readFileSync(buildPaths.buildPathPdf(buildPaths.folderStringCreation(data.donator.don_id)));
        } else {
            createHtmlCerfa(data);
            var pdf = await init(data);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('content-type', 'application/pdf');
        res.send(pdf);
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// Create Cerfa and send to email
router.post('/cerfa/mail', async(req, res) => {
    try {
        data = req.body.cerfa;
        email = req.body.email;

        if (fs.existsSync(buildPaths.buildPathDir(data.donator.don_id))) {
            var pdf = fs.readFileSync(buildPaths.buildPathPdf(buildPaths.folderStringCreation(data.donator.don_id)));
        } else {
            createHtmlCerfa(data);
            var pdf = await init(data);
        }

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('content-type', 'application/pdf');

        var mailOptions = {
            from: EMAIL.user,
            to: email,
            subject: 'Cerfa TSEDACALL',
            text: 'Bonjour, voici votre cerfa',
            attachments: [{
                filename: 'cerfa.pdf',
                path: buildPaths.buildPathPdf(buildPaths.folderStringCreation(data.donator.don_id)),
                contentType: 'application/pdf'
              }]
          };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) res.status(400).send(error); else res.send({message : 'Email envoyé à : ' + info.response, error:false});
        });
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router
