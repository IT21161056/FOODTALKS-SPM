const mongoose = require("mongoose");

const deliverystateSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DeliveryStateModel", deliverystateSchema);
