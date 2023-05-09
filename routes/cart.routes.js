const express = require("express");
const router = express.Router();

// import models
const CartModel = require("../models/Cart.model");
const UserModel = require("../models/User.model");
const AdvertModel = require("../models/Advert.model");

// GET
router.get("/", async (req, res, next) => {
  // Get the user Id from the session
  const userId = req.session.currentUser._id;
  console.log(userId);
  try {
    const userCart = await CartModel.findOne({ user: userId });
    console.log(userCart);
    if (!userCart) {
      res.send("You Cart is empty");
    } else {
      // res.render("cart/cart.hbs", userCart);
      res.send("here is your cart");
    }
  } catch (err) {
    console.log(err);
  }
});

// Post

router.post("/", async (req, res) => {
  const userId = req.session.currentUser._id;
  let { id: productId, title, amount, cost } = req.body;
  try {
    let userCart = await CartModel.findById(userId);
    if (!userCart) {
      userCart = await CartModel.create({
        user: userId,
        products: [{ productId, title, amount, cost }],
      });
    } else {
      userCart.products.push({ productId, title, amount, cost });
    }
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
