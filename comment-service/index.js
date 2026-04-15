const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo-comment:27017/comment-db");

const Comment = mongoose.model("Comment", {
  userId: String,
  postId: String,
  text: String
});

app.post("/comment", async (req, res) => {
  const data = await Comment.create(req.body);
  res.json({ success: true, data });
});

app.get("/comment/:postId", async (req, res) => {
  const data = await Comment.find({ postId: req.params.postId });
  res.json({ success: true, data });
});

app.listen(4005, () => console.log("Comment running"));