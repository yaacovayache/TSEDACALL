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
    media: { 
      type: String
    },
    founder: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
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