const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },

  mobileNumber: {
    type: String,
    required: true,
  },

  mobileNumber: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  deliverLocation: {
    type: String,
    required: true,
  },

  deliverDate: {
    type: String,
    required: true,
  },

  deliveryPerson: {
    type: String,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("OrderModel", orderSchema);
