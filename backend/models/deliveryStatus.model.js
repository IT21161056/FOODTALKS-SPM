const mongoose = require("mongoose");

const deliverystateSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    cusname: {
      type: String,
    },
    date: {
      type: String,
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

module.exports = mongoose.model("DeliveryStateModel", deliverystateSchema);
