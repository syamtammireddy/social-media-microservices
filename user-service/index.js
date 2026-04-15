const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo-user:27017/user-db");

const User = mongoose.model("User", {
  username: String
});

app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ success: true, data: user });
});

app.listen(4002, () => console.log("User running"));