const mongoose = require("mongoose");

// Item Sub-Schema that will populate orderSchema 'users' field.
const userSubSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  fname: {
    type: String,
  },
  lname: {
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
  }
}, { _id: false });

const campaignSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: { 
      type: String
    },
    founder: {
      type: userSubSchema,
      required: true
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