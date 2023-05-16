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

//delete

router.post("/:productId/delete", async (req, res) => {
  const { productId } = req.params;

  try {
    // const deleteProduct = await CartModel.findOneAndDelete({
    //   "products._id": productId,
    // });
    const deleteProduct = await CartModel.updateOne(
      {},
      { $pull: { products: { _id: productId } } }
    );

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
});

// CHECKOUT

router.post("/checkout", async (req, res) => {
  const userId = req.session.currentUser._id;
  const products = req.body;

  try {
    if (products.length > 1) {
      for (const product of products) {
        let deleteProduct = await AdvertModel.findOne({ item: product });
        console.log("This Product", deleteProduct);
      }
      const userCart = await CartModel.findOne({ user: userId });
    } else if (products.length === 1) {
      const deleteProduct = await AdvertModel.findOne({ item: products[0] });
      console.log("1 product delete", deleteProduct);
      const userCart = await CartModel.findOne({ user: userId });
      console.log("cart delete");
    }
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// try {
//   if (products.length > 1) {
//     products.forEach(async (product) => {
//       let deleteProducts = await AdvertModel.findByIdAndDelete(product);
//       console.log(product);
//     });
//     const userCart = await CartModel.findByIdAndDelete(userId);
//     console.log("cart delete");
//   } else if (products === 1) {
//     const deleteProducts = await AdvertModel.findByIdAndDelete(products);
//     console.log("1 product delete");
//     const userCart = await CartModel.findByIdAndDelete(userId);
//     console.log("cart delete");
//   }
//   res.redirect("/adverts");
// } catch (error) {
//   console.log(error);
// }
