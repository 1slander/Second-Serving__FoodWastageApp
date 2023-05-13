const { Schema, model } = require("mongoose");
const AdvertModel = "../models/Advert.model.js";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        advert: {
          type: Schema.Types.ObjectId,
          ref: "AdvertModel",
          // required: true,
        },
        title: {
          type: String,
        },
        amount: {
          type: String,
        },
        cost: {
          type: Number,
        },
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
