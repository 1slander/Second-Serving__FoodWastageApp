const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  creator: {
    type: String,
  },
  amount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const AdvertModel = mongoose.model("Advert", adSchema);

module.exports = AdvertModel;
