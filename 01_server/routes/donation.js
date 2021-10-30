const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Campaign = require('../../00_db/models/campaign');
const Donation = require('../../00_db/models/donation');
const moment = require("moment");
const { ObjectId } = require('mongodb'); // or ObjectID 
const path = require('path')
const fs = require('fs');
const stripe = require('stripe')('sk_test_51J2N0iLkAa6v5r0HiSY93io4c5kDp9BVLLTDEr7YC75Q34vlvFIxsYDLMhDF8R64NNRmgD2R2qKXQ4KTZ8fmcEJL00f6hbBnNS')


// Stats per month
router.get('/stats/donations/month/:id', async (req, res) => {
  try {
    let campaignId = ObjectId(req.params.id)
    let payment = await Donation.aggregate(
      [
        {
          $match: {
            "campaignId": campaignId
          }
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            sum: { $sum: "$sum" },
            counter: { $sum: 1 }
          }
        }
      ],

      function (err, result) {
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


// Stats per day
router.get('/stats/donations/day/:id', async (req, res) => {
  try {
    let campaignId = ObjectId(req.params.id)
    let payment = await Donation.aggregate(
      [
        {
          $match: {
            "campaignId": campaignId
          }
        },
        {
          $group: {
            _id: { $dayOfYear: "$createdAt" },
            date: { $min: "$createdAt" },
            sum: { $sum: "$sum" },
            counter: { $sum: 1 }
          }
        }
      ],

      function (err, result) {
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
router.get('/donations/campaign/:id', async (req, res) => {
  try {
    let campaignId = ObjectId(req.params.id)
    let payment = await Donation.aggregate(
      [
        {
          $match: {
            "campaignId": campaignId
          }
        },
        {
          $group: {
            _id: false,
            sum: { $sum: "$sum" }
          }
        }
      ],

      function (err, result) {
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
router.get('/donators/campaign/:id', async (req, res) => {
  try {
    let campaignId = ObjectId(req.params.id)
    let donators = await Donation.find({ campaignId: campaignId }).distinct("email")
    res.send(donators)
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})

// Get donations by campaign (limit 1)
router.get('/dons/campaign/:id', async (req, res) => {
  try {
    let count = await Donation.find({ campaignId: req.params.id }).countDocuments();
    var random = randomNumber((count > 10) ? count - 10 : 0, count)
    let donations = await Donation.find({ campaignId: req.params.id }, { sum: true, fname: true, lname: true, email: true, message: true, createdAt: true }).limit(1).skip(random);
    res.send(donations)
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})

// Get donation by campaingId
router.get('/all/donations/campaign/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    let campaignId = ObjectId(req.params.id)
    let donations = await Donation.find({ campaignId: campaignId })
    res.send(donations)
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})


// Get search by filter
router.post('/donations/filter', async (req, res) => {
  try {
    // let result = await Payment.find(req.body.query)
    let result = await Donation.aggregate([
      {
        $match: req.body.query
      },
      {
        $lookup: {
          from: "campaigns",
          localField: "campaignId",
          foreignField: "_id",
          as: "campaign_collection"
        }
      },
      { $unwind: "$campaign_collection" },
      {
        $project: {
          _id: "$_id",
          fname: "$fname",
          lname: "$lname",
          email: "$email",
          address: "$address",
          zip: "$zip",
          city: "$city",
          amount: "$sum",
          campaign_name: "$campaign_collection.name",
          campaign_id: "$campaign_collection._id",
          date: "$createdAt"
        }
      }
    ]);
    res.send(result)
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})

// Export query to csv
router.post('/donations/export', async (req, res) => {
  try {
    let result = await Donation.find(req.body.query, req.body.filter)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = router
