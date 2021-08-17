const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: { 
      type: String,
      required:true
    },
    media: { 
      type: [String]
    },
    founder_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    associationName: {
      type: String,
    },
    email: {
      type: String,
    },
    img: { 
      type: String, 
    },
    telephone: {
      type: String,
    },
    address: {
      type: String,
    },
    zip: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    goal: {
      type: Number,
      required: true
    },
    endAt: {
      type: String,
      required: true
    },
    totalSum: {
      type: Number
    },
    actif: {
      type:Boolean,
      default:true
    },
    createdAt: {
      type: String,
      default: new Date()
    }
  });

campaignSchema.pre("save", async function(next) {
    const campaign = this;
    next();
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;