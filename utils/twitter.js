import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function postTweet(message) {
  try {
    // Check if we use client with user access
    const rwClient = client.readWrite; // assure that we have read-write access
    await rwClient.v2.tweet(message);
    console.log("✅ Tweet sent successfully!");
  } catch (error) {
    console.error("❌ Error posting tweet:", error);
  }
}

export { postTweet };
