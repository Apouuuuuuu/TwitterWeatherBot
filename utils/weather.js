import fetch from "node-fetch";

const apiKey = "b7c12a6c33cc45b39b2104806252801"; // Remplace par ta vraie clé API

// Cities
const cities = [
  "Paris",
  "Marseille",
  "Lyon",
  "Toulouse",
  "Nice",
  "Nantes",
  "Strasbourg",
  "Montpellier",
  "Bordeaux",
  "Lille",
  "Rennes",
  "Reims",
  "Le Havre",
  "Saint-Étienne",
  "Toulon",
  "Grenoble",
  "Dijon",
  "Angers",
  "Nîmes",
  "Villeurbanne",
  "Clermont-Ferrand",
  "Saint-Denis",
  "Le Mans",
  "Aix-en-Provence",
  "Brest",
  "Tours",
  "Amiens",
  "Limoges",
  "Annecy",
  "Perpignan",
  "Boulogne-Billancourt",
  "Metz",
  "Besançon",
  "Orléans",
  "Saint-Denis (Réunion)",
  "Rouen",
  "Argenteuil",
  "Mulhouse",
  "Montreuil",
  "Caen",
  "Nancy",
];

// Get weather data for a city
async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      name: city,
      temperature: data.current.temp_c, // Temperature in °C
      emoji: getWeatherEmoji(data.current.condition.text), // Weather emoji
    };
  } catch (error) {
    console.error(`❌ Error fetching weather for ${city}:`, error);
    return null;
  }
}

// Function to get the weather emoji based on the condition
function getWeatherEmoji(condition) {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("clear") || conditionLower.includes("sunny"))
    return "☀️";
  if (conditionLower.includes("cloud")) return "⛅";
  if (conditionLower.includes("fog") || conditionLower.includes("mist"))
    return "🌫️";
  if (conditionLower.includes("rain") || conditionLower.includes("drizzle"))
    return "🌧️";
  if (conditionLower.includes("snow")) return "❄️";
  if (conditionLower.includes("thunderstorm")) return "⛈️";

  return "❓"; // Unknown weather
}

// Function to get the weather for all cities
async function getSortedWeather() {
  const weatherData = await Promise.all(cities.map(getWeather));

  return weatherData
    .filter((data) => data !== null) // Delete null values
    .map((city) => `${city.name}: ${city.temperature}°C ${city.emoji}`); // Format the data
}

export default getSortedWeather;
