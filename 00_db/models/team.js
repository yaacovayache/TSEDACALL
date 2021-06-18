  
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

// Item Sub-Schema that will populate orderSchema 'users' field.
const campaignSubSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "campaigns",
    required: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  media: {
    type: String,
  },
  founder: {
    type: userSubSchema,
  },
  createdAt: {
    type: String,
  }
}, { _id: false });


const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: userSubSchema,
    required: true
  },  
  users: [userSubSchema],
  campaign: {
    type: campaignSubSchema,
    required: true
  },
  createdAt: {
    type: String,
    default: new Date()
  }
});

// Middleware for hashing the password using bcrypt algorithm
// This runs just before saving the document
teamSchema.pre("save", async function (next) {
  const team = this;

  next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;