const { Schema, model } = require("mongoose");

let ProductSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: "Advert" }],
  title: {
    type: String,
  },
  amount: {
    type: String,
  },
  cost: {
    type: Number,
  },
});

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // products: [{ type: Schema.Types.ObjectId, ref: "Advert" }],
    products: [ProductSchema],
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
