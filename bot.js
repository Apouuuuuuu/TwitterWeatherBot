import getSortedWeather from "./utils/weather.js";
import { postTweet, getTweetLimit } from "./utils/twitter.js";

async function tweetWeather() {
  console.log("🔄 Fetching weather data...");

  // Get the weather data for all cities
  const weatherUpdate = await getSortedWeather();

  // Cut in chunks of 8 cities
  const chunkSize = 8;
  const tweetChunks = [];
  for (let i = 0; i < weatherUpdate.length; i += chunkSize) {
    tweetChunks.push(weatherUpdate.slice(i, i + chunkSize));
  }

  let lastTweetId = null;
  
  // Get the remaining tweets for today
  let remainingTweets = await getTweetLimit();

  console.log(`ℹ️ Il reste ${remainingTweets} tweets disponibles pour aujourd’hui.`);

  for (let i = 0; i < tweetChunks.length && remainingTweets > 0; i++) {
    let tweetMessage = i === 0
      ? `📊 Températures en France :\n\n`
      : `📊 Suite des températures :\n\n`;

    tweetChunks[i].forEach(line => {
      tweetMessage += `${line}\n`;
    });

    console.log(`📢 Envoi du tweet ${i + 1}...`);

    if (remainingTweets <= 0) {
      console.log("❌ Limite de tweets atteinte. Arrêt de l’envoi.");
      break;
    }

    lastTweetId = await postTweet(tweetMessage, lastTweetId);

    remainingTweets--; // Decrement the remaining tweets

    // Wait 5sc between each tweet to avoid blocking by API
    await new Promise(resolve => setTimeout(resolve, 5000)); 
  }

  console.log("✅ Tous les tweets ont été envoyés !");
}

// 📌 Exécuter le bot
tweetWeather();
