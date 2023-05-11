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
  try {
    const userCart = await CartModel.findOne({ user: userId });

    if (!userCart) {
      res.render("cart/cart.hbs");
    } else {
      res.render("cart/cart.hbs", {
        userCart,
        userInSession: req.session.currentUser,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Post

router.post("/", async (req, res) => {
  const userId = req.session.currentUser._id;
  let { advert: productId, title, amount, cost } = req.body;
  try {
    let cart = await CartModel.findOne({ user: userId });
    console.log("This cart", cart);

    if (cart) {
      cart.products.push({ productId, title, amount, cost });
      cart = await cart.save();
    } else {
      const newCart = await CartModel.create({
        user: userId,
        products: [
          { advert: productId, title: title, amount: amount, cost: cost },
        ],
      });
    }
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
