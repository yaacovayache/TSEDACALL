const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    cover: { 
      type: String
    },
    media: { 
      type: [String]
    },
    video: { 
      type: String
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
      type: String
    },
    collect: {
      type: Boolean,
      default:false
    },
    totalSum: {
      type: Number
    },
    actif: {
      type:Boolean,
      default:false
    },
    url: {
      type:String
    },
    createdAt: {
      type: String,
      default: new Date()
    }
  });

campaignSchema.pre("save", async function(next) {
    // const campaign = this;
    this.url = this.get('associationName').replace(' ', '-').toLowerCase() + '/' + this.get('name').replace(' ', '-').toLowerCase()
    next();
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;