const express = require("express");
const router = express.Router();
const Message = require("../models/Message.model");
const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// Getting Messages to the Inbox

router.get("/messages", isLoggedIn, async (req, res) => {
  const userId = req.session.currentUser.__id;
  try {
    const userMessages = await Message.find({ recipient: userId }).populate(
      "sender"
    );
    //console.log(userMessages);
    res.render("messages/messages.hbs", { messages: userMessages });
  } catch (err) {
    console.log(err);
  }
});

// Create a new message

router.get("/sendMessage", isLoggedIn, async (req, res) => {
  res.render("messages/send-messages.hbs");
});

router.post("/sendMessage", isLoggedIn, async (req, res) => {
  try {
    //console.log(req.body);
    const { recipient, message, subject } = req.body;
    const getUser = await User.findOne({ username: recipient });
    //console.log("This:", getUser);

    const newMessage = new Message({
      sender: req.session.currentUser._id,
      recipient: getUser._id,
      message: message,
      subject: subject,
    });
    const saveMessageDb = await newMessage.save();
    res.status(201);
    res.redirect("/userProfile");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to save message" });
  }
});

//Display Message Details

router.get("/:messageId", isLoggedIn, async (req, res) => {
  try {
    const { messageId } = req.params;
    const findedMessage = await Message.findById(messageId).populate("sender");
    res.render("messages/message-detail.hbs", { findedMessage });
  } catch (err) {
    console.log(err);
  }
});
//Reply Message
router.get("/:messageId/reply", isLoggedIn, async (req, res) => {
  try {
    const { messageId } = req.params;
    const findedMessage = await Message.findById(messageId).populate("sender");
    res.render("messages/message-reply.hbs", { findedMessage });
  } catch (err) {
    console.log(err);
  }
});

router.post("/:messageId/reply", async (req, res) => {
  try {
    //const { messageId } = req.params;
    const { recipient, message, subject } = req.body;
    const getUser = await User.findOne({ username: recipient });
    //console.log("This:", getUser);

    const newMessage = new Message({
      sender: req.session.currentUser._id,
      recipient: getUser._id,
      message: message,
      subject: subject,
    });
    const saveMessageDb = await newMessage.save();
    res.redirect("/userProfile");
  } catch (err) {
    console.log(err);
  }
});

//Delete Messages

router.post("/:messageId/delete", isLoggedIn, async (req, res) => {
  try {
    const { messageId } = req.params;
    const deleteMessege = await Message.findByIdAndDelete(messageId);
    res.redirect("/messages");
  } catch (error) {
    console.log(error);
  }
});

// Get all messages for a user
// router.get("/messages/:username", async (req, res) => {
//   try {
//     const messages = await Message.find({
//       recipient: req.params.username,
//     })
//       .populate("sender", "username")
//       .populate("recipient", "username")
//       .sort({ timestamp: -1 })
//       .exec();
//     res.json({ messages });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Unable to retrieve messages" });
//   }
// });

module.exports = router;
