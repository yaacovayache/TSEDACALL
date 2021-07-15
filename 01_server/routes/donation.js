const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Campaign = require('../../00_db/models/campaign');
const Payment = require('../../00_db/models/donation');
const moment = require("moment");
const {ObjectId} = require('mongodb'); // or ObjectID 


// Create new donation
router.post('/payment', async(req, res) => {
    const payment = new Payment(req.body)
    try {
        await payment.save()

        res.status(201).send({ payment })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Stats per month
router.get('/stats/donations/month/:id', async(req, res) => {
    try {
        let campaignId = ObjectId(req.params.id)
        let payment = await Payment.aggregate(
            [
              {
                  $match:{
                      "campaignId": campaignId
                  }
              },
              {
                $group: {
                    _id: {$month: "$createdAt"},
                    sum: {$sum: "$sum"}, 
                    counter: {$sum: 1} 
                }
              }
            ],
        
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.json(result);
              }
            }
          );
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// Current sum by campaign
router.get('/donations/campaign/:id', async(req, res) => {
  try {
      let campaignId = ObjectId(req.params.id)
      let payment = await Payment.aggregate(
          [
            {
                $match:{
                    "campaignId": campaignId
                }
            },
            {
              $group: {
                  _id: false,
                  sum: {$sum: "$sum"}
              }
            }
          ],
      
          function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.json(result);
            }
          }
        );
  } catch (err) {
      console.log(err)
      res.status(500).send()
  }
})


// Get all donators by campaign
router.get('/donators/campaign/:id', async(req, res) => {
  try {
      let campaignId = ObjectId(req.params.id)
      let donators = await Payment.find({campaignId:campaignId}).distinct("userDetails")
      res.send(donators)
  } catch (err) {
      console.log(err)
      res.status(500).send()
  }
})

module.exports = router
