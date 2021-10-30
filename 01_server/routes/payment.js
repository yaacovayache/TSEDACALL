const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Payment = require('../../00_db/models/payment');
const Donation = require('../../00_db/models/donation');
const moment = require("moment");
const { ObjectId } = require('mongodb'); // or ObjectID 
const path = require('path')
const fs = require('fs');
const stripe = require('stripe')('sk_test_51J2N0iLkAa6v5r0HiSY93io4c5kDp9BVLLTDEr7YC75Q34vlvFIxsYDLMhDF8R64NNRmgD2R2qKXQ4KTZ8fmcEJL00f6hbBnNS')

// Create stripe customer
router.post('/stripe/customer', async (req, res) => {
    console.log('/stripe/customer')
    try {
      const customer = req.body
      const product = await stripe.products.create({ name: 'Donation' });
      const result = await stripe.customers.create({
        address: customer.paymentMethod.billing_details.address,
        email: customer.paymentMethod.billing_details.email,
        name: customer.paymentMethod.billing_details.name,
        phone: customer.paymentMethod.billing_details.phone,
        payment_method: customer.paymentMethod.id,
        invoice_settings: { default_payment_method: customer.paymentMethod.id},
      });
      
      res.status(201).send({ customer_id: result.id, product_id: product.id, paymentMethod_id: customer.paymentMethod.id })
    } catch (err) {
      console.log(err)
      res.status(400).send(err)
    }
  })

  router.post('/stripe/subscription', async (req, res) => {
    console.log('/stripe/subscription')
    try {
      const data = req.body
  
      const price = await stripe.prices.create({ unit_amount: data.price*100, currency: data.currency, recurring: {interval: 'month'}, product: data.product_id });
  
      let now = new Date()
  
      const end_date = addMonths(now, data.month_number)
  
      const result = await stripe.subscriptions.create({customer: data.customer_id, items: [ {price: price.id}], cancel_at: end_date});
      
      res.status(201).send(result)
    } catch (err) {
      console.log(err)
      res.status(400).send(err)
    }
  })

  // Create stripe invoice payment
router.post('/stripe/invoice/payment', async (req, res) => {
    try {
      const data = req.body
      const invoiceItem = await stripe.invoiceItems.create({
        customer: data.customer_id,
        price_data: {unit_amount: data.price, currency: data.currency, product: data.product_id}
      });
      const invoice = await stripe.invoices.create({customer: data.customer_id});
      res.status(201).send(invoice)
    } catch (err) {
      console.log(err)
      res.status(400).send(err)
    }
  })

// Create stripe payment
router.post('/stripe/checkout', async (req, res) => {
    console.log('/stripe/checkout')
    const data = req.body
    params = {amount: (data.price)*100, currency: data.currency, customer: data.customer_id, payment_method: data.paymentMethod_id, payment_method_types:[data.payment_method_types]}
    const intent = await stripe.paymentIntents.create(params)
    res.status(201).send(intent)
  })

  router.post('/payment', async (req, res) => {
    console.log('/payment')
    data = req.body
    try {

        const payment = new Payment(data)

        await payment.save()

        data['paymentId'] = payment['_id']
        if ('is_subscription' in data)
            data['sum'] = data['sum']*data['month_number']
        const donation = new Donation(data)

        await donation.save()

        res.status(201).send(donation)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
  })


  function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

module.exports = router
