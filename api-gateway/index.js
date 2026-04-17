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
const multer = require("multer");
const FormData = require("form-data");

const upload = multer();

app.post("/post", upload.single("image"), async (req, res) => {
  const formData = new FormData();

  formData.append("userId", req.body.userId);
  formData.append("content", req.body.content);

  if (req.file) {
    formData.append("image", req.file.buffer, req.file.originalname);
  }

  try {
    const response = await axios.post(
      "http://post-service:4003/post",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/post/like", async (req, res) => {
  try {
    const response = await axios.post(
      "http://post-service:4003/post/like",
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/post/repost", async (req, res) => {
  try {
    const response = await axios.post(
      "http://post-service:4003/post/repost",
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/friend/follow", async (req, res) => {
  try {
    const response = await axios.post(
      "http://friend-service:4006/friend/follow",
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/friend/unfollow", async (req, res) => {
  try {
    const response = await axios.post(
      "http://friend-service:4006/friend/unfollow",
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/friend/following/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `http://friend-service:4006/friend/following/${req.params.id}`
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FEED

app.get("/feed/:userId", async (req, res) => {
  try {
    const response = await axios.get(
      `http://feed-service:4004/feed/${req.params.userId}`
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4008, () => console.log("Gateway running"));