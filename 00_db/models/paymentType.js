  
const mongoose = require("mongoose");

const paymentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date()
  }
});

paymentTypeSchema.pre("save", async function (next) {
  const paymentType = this;
  next();
});

const PaymentType = mongoose.model("PaymentType", paymentTypeSchema);

module.exports = PaymentType;