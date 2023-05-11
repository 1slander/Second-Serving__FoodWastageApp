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
  let price = 0;
  try {
    const userCart = await CartModel.findOne({ user: userId });

    if (!userCart) {
      res.render("cart/cart.hbs");
    } else {
      userCart.products.forEach(
        (product) => (price += product.cost * product.amount)
      );
      res.render("cart/cart.hbs", {
        userCart,
        userInSession: req.session.currentUser,
        price,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Post

router.post("/", async (req, res) => {
  const userId = req.session.currentUser._id;
  let { productId: advert, title, amount, cost } = req.body;
  console.log(req.body);
  try {
    let cart = await CartModel.findOne({ user: userId });
    console.log("This cart", cart);

    if (cart) {
      cart.products.push({ advert, title, amount, cost });
      cart = await cart.save();
    } else {
      const newCart = await CartModel.create({
        user: userId,
        products: [{ advert, title, amount, cost }],
      });
    }
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
