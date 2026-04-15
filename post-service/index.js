const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo-post:27017/post-db");

const Post = mongoose.model("Post", {
  userId: String,
  content: String,
  imageUrl: String,
  likes: [String],
  isRepost: Boolean,
  originalPostId: String,
  createdAt: { type: Date, default: Date.now }
});

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// serve images
app.use("/uploads", express.static("uploads"));

// create post
app.post("/post", upload.single("image"), async (req, res) => {
  const post = await Post.create({
    userId: req.body.userId,
    content: req.body.content,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null
  });

  res.json({ success: true, data: post });
});

// like
app.post("/post/like", async (req, res) => {
  const { userId, postId } = req.body;

  const post = await Post.findById(postId);
  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
    await post.save();
  }

  res.json({ success: true });
});

// repost
app.post("/post/repost", async (req, res) => {
  const { userId, postId } = req.body;

  const repost = await Post.create({
    userId,
    isRepost: true,
    originalPostId: postId
  });

  res.json({ success: true, data: repost });
});

app.listen(4003, () => console.log("Post running"));