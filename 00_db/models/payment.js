const mongoose = require("mongoose");
const moment = require("moment");

const paymentSchema = new mongoose.Schema({
    id_card: {
        type: String,
    },
    promise: {
        type: Boolean,
        default:false
    },
    card_brand: {
        type: String,
    },
    exp_month: {
        type: Number,
    },
    exp_year: {
        type: Number,
    },
    card_suffix: {
        type: String,
    },
    name_account:{
        type: String,
    },
    email_account:{
        type: String,
    },
    sum:{
        type: Number,
        required: true,
    },
    manually:{
        type: Boolean,
        default: false,
    },
    currency:{
        type: String,
        required: true,
    },
    payment_method_id:{
        type: String,
    },
    subscription_id:{
        type: String,
    },
    price_id:{
        type: String,
    },
    is_subscription:{
        type: Boolean,
    },
    end_subscription:{
        type: Date,
    },
    month_number:{
        type: Number,
    },
    customer_id:{
        type: String,
    },
    product_id:{
        type: String,
    },
    client_secret:{
        type: String,
    },
    payment_intent_id:{
        type: String,
    },
    payment_method_types:{
        type: [String],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

paymentSchema.pre("save", async function(next) {
    const payment = this;

    next();
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;