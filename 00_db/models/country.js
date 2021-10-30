  
const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  country_code: {
    type: String,
    required: true,
  },
  country_name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date()
  }
});

countrySchema.pre("save", async function (next) {
  const currency = this;

  next();
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;