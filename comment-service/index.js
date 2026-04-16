const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://handicrafts:test123@cluster0.uohcfax.mongodb.net/comment-db?retryWrites=true&w=majority&appName=Cluster0");

const Comment = mongoose.model("Comment", {
  userId: String,
  postId: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

app.post("/comment", async (req, res) => {
  try {
    const data = await Comment.create(req.body);

    // Notify the Notification Service (Fire and Forget)
    axios.post("http://notification-service:4007/notify", {
      userId: req.body.userId, // Sending to whoever needs it natively (usually post owner, but we just pass what we have)
      message: `Someone commented on post ${req.body.postId}`
    }).catch(err => console.error("Notification Service Error"));

    res.json({ success: true, data, message: "Comment created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
});

app.get("/comments/:postId", async (req, res) => {
  try {
    const data = await Comment.find({ postId: req.params.postId });
    res.json({ success: true, data, message: "Comments retrieved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
});

app.listen(4005, () => console.log("Comment running"));