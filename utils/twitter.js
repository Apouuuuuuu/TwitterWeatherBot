import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// 📌 Fonction pour poster un tweet (réponse au tweet précédent si `replyTo` est défini)
async function postTweet(message, replyTo = null) {
  try {
    const rwClient = client.readWrite;
    
    const tweet = await rwClient.v2.tweet(message, replyTo ? { reply: { in_reply_to_tweet_id: replyTo } } : {});
    
    console.log("✅ Tweet posted successfully!");
    return tweet.data.id; // Retourne l'ID du tweet pour lier les réponses
  } catch (error) {
    console.error("❌ Error posting tweet:", error);
    return null;
  }
}

export { postTweet };
