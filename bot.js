import { getSortedWeather } from "./utils/weather.js";
import { postTweet } from "./utils/twitter.js";

async function tweetWeather() {
  console.log("🔄 Fetching weather data...");

  // 📌 Récupérer la météo triée
  const weatherUpdate = await getSortedWeather();

  // 📌 Construire le tweet
  let tweetMessage = `📊 Températures en France :\n\n`;
  weatherUpdate.forEach(line => {
    tweetMessage += `${line}\n`;
  });

  // 📌 Vérifier que le tweet est bien sous 280 caractères
  if (tweetMessage.length > 280) {
    tweetMessage = tweetMessage.slice(0, 277) + "...";
  }

  console.log("📢 Tweeting:", tweetMessage);
  await postTweet(tweetMessage);
  console.log("✅ Tweet sent successfully!");
}

// 📌 Exécuter le bot
tweetWeather();
