const express = require("express");
const axios = require("axios");

const app = express();

app.get("/feed/:userId", async (req, res) => {
  try {
    const posts = await axios.get("http://post-service:4003/post");

    res.json({
      success: true,
      data: posts.data
    });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.listen(4004, () => console.log("Feed running"));