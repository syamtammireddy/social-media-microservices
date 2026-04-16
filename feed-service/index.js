const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 4004;

// Internal Docker URLs (using service names from your docker-compose.yml)
const POST_SERVICE_URL = "http://post-service:4003";
const FRIEND_SERVICE_URL = "http://friend-service:4006";

app.get("/feed/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(`Generating feed for User: ${userId}`);

    /**
     * STEP 1: Get the list of friends (Optional logic)
     * In a full app, you'd fetch friends first:
     * const friends = await axios.get(`${FRIEND_SERVICE_URL}/friends/${userId}`);
     */

    /** * STEP 2: Fetch posts from the post-service
     * We use the service name 'post-service' because Docker's internal DNS 
     * resolves this to the correct container IP.
     */
    const postsResponse = await axios.get(`${POST_SERVICE_URL}/post`, {
      timeout: 3000 // 3-second timeout to prevent hanging
    });

    res.json({
      success: true,
      service: "Feed Service",
      userId: userId,
      count: postsResponse.data.length,
      feed: postsResponse.data
    });

  } catch (error) {
    console.error("Feed Service Error:", error.message);
    
    // Check if the error is a connection issue with other services
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        message: "Post Service is currently unavailable."
      });
    }

    res.status(500).json({ 
      success: false, 
      message: "An error occurred while generating your feed." 
    });
  }
});

// Basic health check
app.get("/", (req, res) => {
  res.send("Feed Service is up and running!");
});

app.listen(PORT, () => {
  console.log(`✅ Feed Service active on port ${PORT}`);
});