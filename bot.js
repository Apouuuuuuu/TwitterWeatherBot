import getSortedWeather from "./utils/weather.js";
import { postTweet } from "./utils/twitter.js";

async function tweetWeather() {
  console.log("🔄 Fetching weather data...");

  // 📌 Récupérer la météo classée par population (ordre inchangé)
  const weatherUpdate = await getSortedWeather();

  // 📌 Découper en plusieurs tweets (8 villes max par tweet)
  const chunkSize = 8;
  const tweetChunks = [];
  for (let i = 0; i < weatherUpdate.length; i += chunkSize) {
    tweetChunks.push(weatherUpdate.slice(i, i + chunkSize));
  }

  let lastTweetId = null;

  // 📌 Publier chaque tweet en réponse au précédent pour créer un thread
  for (let i = 0; i < tweetChunks.length; i++) {
    let tweetMessage = i === 0
      ? `📊 Températures en France :\n\n`
      : `📊 Suite des températures :\n\n`;

    tweetChunks[i].forEach(line => {
      tweetMessage += `${line}\n`;
    });

    console.log(`📢 Posting tweet ${i + 1}...`);
    
    // 📌 Envoyer le tweet en réponse au précédent si ce n'est pas le premier
    lastTweetId = await postTweet(tweetMessage, lastTweetId);
  }

  console.log("✅ Full weather thread posted!");
}

// 📌 Exécuter le bot
tweetWeather();
