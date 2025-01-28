import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// 📌 Fonction pour vérifier la limite de tweets restants
async function getTweetLimit() {
  try {
    const response = await client.v2.get("tweets");
    const rateLimit = response.rateLimit;

    if (rateLimit && rateLimit.day) {
      return rateLimit.day.remaining; // ✅ Nombre de tweets restants
    } else {
      console.log("⚠️ Impossible de récupérer la limite de tweets.");
      return 0;
    }
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de la limite Twitter :", error);
    return 0;
  }
}

// 📌 Fonction pour poster un tweet (et vérifier la limite avant)
async function postTweet(message, replyTo = null) {
  try {
    const remainingTweets = await getTweetLimit();

    if (remainingTweets <= 0) {
      console.log("❌ Limite de tweets atteinte. Arrêt du bot.");
      return null;
    }

    const rwClient = client.readWrite;
    const tweet = await rwClient.v2.tweet(message, replyTo ? { reply: { in_reply_to_tweet_id: replyTo } } : {});
    
    console.log("✅ Tweet posté avec succès !");
    return tweet.data.id; // Retourne l'ID du tweet pour lier les réponses
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du tweet :", error);
    return null;
  }
}

export { postTweet, getTweetLimit };
