import getSortedWeather from "./utils/weather.js";
import { postTweet } from "./utils/twitter.js";

async function tweetWeather() {
  console.log("🔄 Fetching weather data...");

  // Détermine s'il s'agit du matin ou de l'après-midi
  const currentHour = new Date().getHours();
  const isMorning = currentHour < 12;

  // Titre du tweet en fonction de l'heure
  const tweetTitle = isMorning
    ? "🌅 Météo France du matin :\n\n"
    : "🌇 Météo France de l'après-midi :\n\n";

  // Récupération des données météo
  const weatherUpdate = await getSortedWeather();

  // Découpe en morceaux de 8 villes
  const chunkSize = 8;
  const tweetChunks = [];
  for (let i = 0; i < weatherUpdate.length; i += chunkSize) {
    tweetChunks.push(weatherUpdate.slice(i, i + chunkSize));
  }

  let lastTweetId = null;

  for (let i = 0; i < tweetChunks.length; i++) {
    let tweetMessage = i === 0 ? tweetTitle : "📊 Suite de la météo :\n\n";

    tweetChunks[i].forEach(line => {
      tweetMessage += `${line}\n`;
    });

    console.log(`📢 Envoi du tweet ${i + 1}...`);

    lastTweetId = await postTweet(tweetMessage, lastTweetId);

    // Pause de 5s entre chaque tweet pour éviter le blocage par l'API
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  console.log("✅ Tous les tweets ont été envoyés !");
}

// 📌 Exécuter le bot
tweetWeather();
