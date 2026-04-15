const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// AUTH
app.post("/auth/login", async (req, res) => {
  const r = await axios.post("http://auth-service:4001/auth/login", req.body);
  res.json(r.data);
});

// REGISTER
app.post("/auth/register", async (req, res) => {
  const r = await axios.post("http://auth-service:4001/auth/register", req.body);
  res.json(r.data);
});

// POST
app.post("/post", async (req, res) => {
  const r = await axios.post("http://post-service:4003/post", req.body);
  res.json(r.data);
});

// FEED
app.get("/feed/:userId", async (req, res) => {
  const r = await axios.get(`http://feed-service:4004/feed/${req.params.userId}`);
  res.json(r.data);
});

app.listen(4008, () => console.log("Gateway running"));