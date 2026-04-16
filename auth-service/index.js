const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://handicrafts:test123@cluster0.uohcfax.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0");

const User = mongoose.model("User", {
  username: String,
  password: String
});

app.post("/auth/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json({ success: true, data: user });
});

app.post("/auth/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.status(401).json({ success: false });

  res.json({
    success: true,
    data: { token: "dummy-token", userId: user._id }
  });
});

app.listen(4001, () => console.log("Auth running"));