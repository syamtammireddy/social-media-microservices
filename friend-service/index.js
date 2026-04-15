const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo-friend:27017/friend-db");

const Follow = mongoose.model("Follow", {
  userId: String,
  targetUserId: String
});

app.post("/friend/follow", async (req, res) => {
  const data = await Follow.create(req.body);
  res.json({ success: true, data });
});

app.post("/friend/unfollow", async (req, res) => {
  await Follow.deleteOne(req.body);
  res.json({ success: true });
});

app.get("/friend/following/:id", async (req, res) => {
  const data = await Follow.find({ userId: req.params.id });
  res.json({ success: true, data });
});

app.listen(4006, () => console.log("Friend running"));