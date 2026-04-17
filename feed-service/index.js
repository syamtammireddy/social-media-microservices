const express = require("express");
const axios = require("axios");

const app = express();

app.get("/feed/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1. Get following users
    const followingRes = await axios.get(
      `http://friend-service:4006/friend/following/${userId}`
    );

    const following = followingRes.data.data.map(f => f.targetUserId);

    // include self posts
    following.push(userId);

    // 2. Get all posts
    const postsRes = await axios.get(
      "http://post-service:4003/posts"
    );

    // 3. Filter posts
    const filteredPosts = postsRes.data.filter(post =>
      following.includes(post.userId)
    );

    // 4. Sort latest first
    filteredPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json({
      success: true,
      data: filteredPosts
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

app.listen(4004, () => console.log("Feed service running"));