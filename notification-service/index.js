const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo-notify:27017/notify-db");

const Notification = mongoose.model("Notification", {
  userId: String,
  message: String
});

app.post("/notify", async (req, res) => {
  const data = await Notification.create(req.body);
  res.json({ success: true, data });
});

app.get("/notify/:userId", async (req, res) => {
  const data = await Notification.find({ userId: req.params.userId });
  res.json({ success: true, data });
});

app.listen(4007, () => console.log("Notification running"));