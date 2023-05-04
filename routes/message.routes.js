const express = require("express");
const router = express.Router();
const Message = require("../models/message");

//To merge
// Create a new message
router.post("/messages", async (req, res) => {
  try {
    const message = new Message({
      sender: req.body.sender,
      recipient: req.body.recipient,
      body: req.body.body,
    });
    await message.save();
    res.status(201).json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to save message" });
  }
});

// Get all messages for a user
router.get("/messages/:username", async (req, res) => {
  try {
    const messages = await Message.find({
      recipient: req.params.username,
    })
      .populate("sender", "username")
      .populate("recipient", "username")
      .sort({ timestamp: -1 })
      .exec();
    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to retrieve messages" });
  }
});

module.exports = router;
