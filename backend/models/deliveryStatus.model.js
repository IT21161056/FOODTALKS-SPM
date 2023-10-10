const mongoose = require("mongoose");

const deliveryStatusSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
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
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deliveryStatus", deliveryStatusSchema);
