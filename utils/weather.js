import fetch from "node-fetch";

const apiKey = "b7c12a6c33cc45b39b2104806252801"; // Remplace par ta vraie clé API

// 📌 Liste limitée aux plus grandes villes françaises
const cities = [
  "Paris", "Marseille", "Lyon", "Toulouse", "Nice",
  "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"
];

// 📌 Fonction pour récupérer la météo d'une ville
async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      name: city,
      temperature: data.current.temp_c, // Température en °C
      emoji: getWeatherEmoji(data.current.condition.text), // Emoji météo
    };
  } catch (error) {
    console.error(`❌ Error fetching weather for ${city}:`, error);
    return null;
  }
}

// 📌 Fonction pour attribuer un emoji météo
function getWeatherEmoji(condition) {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("clear") || conditionLower.includes("sunny")) return "☀️";
  if (conditionLower.includes("cloud")) return "⛅";
  if (conditionLower.includes("fog") || conditionLower.includes("mist")) return "🌫️";
  if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) return "🌧️";
  if (conditionLower.includes("snow")) return "❄️";
  if (conditionLower.includes("thunderstorm")) return "⛈️";

  return "❓"; // Si aucune correspondance trouvée
}

// 📌 Fonction pour récupérer et trier la météo des villes
async function getSortedWeather() {
  const weatherData = await Promise.all(cities.map(getWeather));

  return weatherData
    .filter((data) => data !== null) // Supprimer les erreurs
    .sort((a, b) => b.temperature - a.temperature) // Trier du plus chaud au plus froid
    .map(city => `${city.name}: ${city.temperature}°C ${city.emoji}`);
}

export { getSortedWeather };
