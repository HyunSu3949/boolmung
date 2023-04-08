const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Room",
  },
  user: {
    type: String,
    required: true,
  },
  chat: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
