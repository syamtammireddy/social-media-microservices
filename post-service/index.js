// const express = require("express");
// const mongoose = require("mongoose");
// const multer = require("multer");

// const app = express();
// app.use(express.json());

// mongoose.connect("mongodb://mongo-post:27017/post-db");

// const Post = mongoose.model("Post", {
//   userId: String,
//   content: String,
//   imageUrl: String,
//   likes: [String],
//   isRepost: Boolean,
//   originalPostId: String,
//   createdAt: { type: Date, default: Date.now }
// });

// // multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + "-" + file.originalname)
// });

// const upload = multer({ storage });

// // serve images
// app.use("/uploads", express.static("uploads"));

// // create post
// app.post("/post", upload.single("image"), async (req, res) => {
//   const post = await Post.create({
//     userId: req.body.userId,
//     content: req.body.content,
//     imageUrl: req.file ? `/uploads/${req.file.filename}` : null
//   });

//   res.json({ success: true, data: post });
// });

// // like
// app.post("/post/like", async (req, res) => {
//   const { userId, postId } = req.body;

//   const post = await Post.findById(postId);
//   if (!post.likes.includes(userId)) {
//     post.likes.push(userId);
//     await post.save();
//   }

//   res.json({ success: true });
// });

// // repost
// app.post("/post/repost", async (req, res) => {
//   const { userId, postId } = req.body;

//   const repost = await Post.create({
//     userId,
//     isRepost: true,
//     originalPostId: postId
//   });

//   res.json({ success: true, data: repost });
// });

// app.listen(4003, () => console.log("Post running"));


// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());

// mongoose.connect("mongodb://mongo-post:27017/post-db")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// app.get("/", (req, res) => {
//   res.send("Post Service Running");
// });

// app.listen(4003, () => console.log("Post service running on 4003"));


const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();
app.use(express.json());

// DB connection
mongoose.connect("mongodb://mongo-post:27017/post-db")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const Post = mongoose.model("Post", {
  userId: String,
  content: String,
  imageUrl: String,
  likes: [String],
  isRepost: Boolean,
  originalPostId: String,
  createdAt: { type: Date, default: Date.now }
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Serve images
app.use("/uploads", express.static("uploads"));

// Create Post API
app.post("/post", upload.single("image"), async (req, res) => {
  try {
    const post = await Post.create({
      userId: req.body.userId,
      content: req.body.content,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      likes: [],
      isRepost: false
    });

    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/post/repost", async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const originalPost = await Post.findById(postId);

    if (!originalPost) {
      return res.status(404).json({ success: false, message: "Original post not found" });
    }

    const repost = await Post.create({
      userId,
      content: originalPost.content,
      imageUrl: originalPost.imageUrl,
      isRepost: true,
      originalPostId: postId,
      likes: []
    });

    res.json({ success: true, data: repost });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/post/like", async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    if (!req.body.userId || !req.body.content) {
     return res.status(400).json({
       success: false,
       message: "userId and content are required"
      });
  }
    // prevent duplicate likes
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.json({ success: true, data: post });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Post Service Running");
});
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.listen(4003, () => console.log("Post service running on 4003"));