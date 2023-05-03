const express = require("express");
const router = express.Router();

// import models
const CartModel = require('../models/Cart.model')
const UserModel=require('../models/User.model')

// GET
router.get("/cart/:userId", async (req,res,next)=>{

 // Get the user Id from the session
 const userId = req.session.currentUser._id;
try{
 const userCart = await CartModel.findById(userId);
 if(!userCart){
  res.send('You Cart is empty')
 } else {
  res.send('here is your cart')
 }
 
}catch (err){
 console.log(err)
}

})

// Post

module.exports = router;