const mongoose = require("mongoose");
const moment = require("moment");

const donationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    telephone: {
        type: String
    },
    email: {
        type: String,
        required:true
    },
    address: {
        type: String
    },
    zip: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    anonymous: {
        type: Boolean,
        default:false
    },
    isRegistered: {
        type: Boolean,
        required:true,
        default:false
    },
    message: {
        type: String,
        default:''
    },
    promise: {
        type: Boolean,
        default:false
    },
    sum:{
        type: Number,
        required: true,
    },
    currency:{
        type: String,
        required: true,
    },
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaigns",
        required: true,
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payments",
        required: true,
    },
    type_payment:{
        type: String,
    },
    type_donator:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

donationSchema.pre("save", async function(next) {
    const donation = this;

    next();
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;