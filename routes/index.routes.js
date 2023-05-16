const express = require("express");
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

let date = new Date();
let year = date.getFullYear();
/* GET home page */
router.get("/", (req, res) => {
  // if (req.session) {
  //   res.redirect("/adverts");
  // } else {
  res.render("index.hbs", { currentYear: year });
});

module.exports = router;
