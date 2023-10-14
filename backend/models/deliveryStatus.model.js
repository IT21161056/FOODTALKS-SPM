const mongoose = require("mongoose");

const deliveryStatusSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    cusname: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    deliverPerson: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deliveryStatus", deliveryStatusSchema);
