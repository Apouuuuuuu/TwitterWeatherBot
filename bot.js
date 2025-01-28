import getSortedWeather from "./utils/weather.js";
import { postTweet, getTweetLimit } from "./utils/twitter.js";

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
  
  // 📌 Récupérer la limite de tweets disponible
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

    remainingTweets--; // Diminue le compteur après chaque tweet

    // 📌 Attendre 30 secondes entre chaque tweet pour éviter un blocage immédiat
    await new Promise(resolve => setTimeout(resolve, 30000)); 
  }

  console.log("✅ Tous les tweets ont été envoyés !");
}

// 📌 Exécuter le bot
tweetWeather();
