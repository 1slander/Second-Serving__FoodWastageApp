const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Advert" }],
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

const Cart = model("Cart", cartSchema);

module.exports = Cart;
