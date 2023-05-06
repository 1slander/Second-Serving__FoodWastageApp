const express = require("express");
const router = express.Router();
const AdvertModel = require("../models/Advert.model");
const UserModel = require("../models/User.model");

//auth middleware
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// Create a new advert
router.post("/adverts", isLoggedIn, async (req, res) => {
  const { title, amount, description, cost } = req.body;
  const sender = req.session.currentUser._id;
  try {
    const newAdvert = await AdvertModel.create({
      title,
      amount,
      sender: sender,
      description,
      cost,
    });
    res.redirect("/userProfile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Create a new advert page
router.get("/new", isLoggedIn, (req, res) => {
  res.render("adverts/create-advert");
});

// Get all adverts
router.get("/", async (req, res) => {
  try {
    const adverts = await AdvertModel.find().populate("sender", "username");
    res.render("adverts/adverts", { adverts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Update view

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const advert = await AdvertModel.findById(id);
    if (!advert) return res.status(404).send("Advert not found");
    res.render("adverts/update-advert", { advert: advert });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Update advert
router.post("/:id", async (req, res) => {
  const { title, picture, amount, description, cost } = req.body;
  const { id } = req.params;
  const sender = req.session.currentUser._id;

  try {
    const advert = await AdvertModel.findById(id);
    if (!advert) return res.status(404).send("Advert not found");
    if (advert.sender.toString() !== sender) {
      return res.status(401).send("You are not authorized to edit this advert");
    }
    advert.title = title;
    advert.picture = picture;
    advert.amount = amount;
    advert.description = description;
    advert.cost = cost;
    advert.updatedAt = Date.now();
    const updatedAdvert = await advert.save();
    res.redirect("/adverts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Delete an advert
router.post("/:id/delete", async (req, res) => {
  const { id } = req.params;
  const sender = req.session.currentUser._id;

  try {
    const advert = await AdvertModel.findById(id);
    if (!advert) return res.status(404).send("Advert not found");
    if (advert.sender.toString() !== sender) {
      return res
        .status(401)
        .send("You are not authorized to delete this advert");
    }
    await AdvertModel.findByIdAndDelete(id);
    res.redirect("/adverts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
