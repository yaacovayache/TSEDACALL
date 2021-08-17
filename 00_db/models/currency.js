  
const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date()
  }
});

currencySchema.pre("save", async function (next) {
  const currency = this;

  next();
});

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;