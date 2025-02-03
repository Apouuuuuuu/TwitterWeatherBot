import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Function to post a tweet
async function postTweet(message, replyTo = null) {
  try {
    const rwClient = client.readWrite;
    const tweet = await rwClient.v2.tweet(message, replyTo ? { reply: { in_reply_to_tweet_id: replyTo } } : {});

    console.log("✅ Tweet posté avec succès !");
    return tweet.data.id; // Return the tweet ID for link responses
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du tweet :", error);
    return null;
  }
}

export { postTweet };
