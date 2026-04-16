const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 4006;
// Use environment variable for the Mongo URI, or fallback to your string
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://handicrafts:test123@cluster0.uohcfax.mongodb.net/friend-db?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB with error handling
mongoose.connect(MONGO_URI)
  .then(() => console.log("📦 Connected to MongoDB (Friend Service)"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err.message));

const Follow = mongoose.model("Follow", {
  userId: String,
  targetUserId: String
});

// GET: Root Health Check (To verify the service is up in the browser)
app.get("/", (req, res) => {
  res.send("Friend Service is up and running!");
});

// POST: Follow a user
app.post("/friend/follow", async (req, res) => {
  try {
    const data = await Follow.create(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST: Unfollow a user
app.post("/friend/unfollow", async (req, res) => {
  try {
    await Follow.deleteOne(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET: List of people a user is following
app.get("/friend/following/:id", async (req, res) => {
  try {
    const data = await Follow.find({ userId: req.params.id });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Friend Service running on port ${PORT}`));