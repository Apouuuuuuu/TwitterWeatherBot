import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config(); 

const apiKey = process.env.WEATHER_API_KEY; // Use API key from .env

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
  if (!apiKey) {
    console.error("❌ WEATHER_API_KEY is missing in .env file!");
    return null;
  }

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

function getWeatherEmoji(condition) {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("clear") || conditionLower.includes("sunny")) return "☀️";
  if (conditionLower.includes("cloudy")) return "☁️";
  if (conditionLower.includes("partly cloudy")) return "⛅";
  if (conditionLower.includes("overcast")) return "🌥️";
  if (conditionLower.includes("fog") || conditionLower.includes("mist") || conditionLower.includes("haze")) return "🌫️";
  if (conditionLower.includes("rain") || conditionLower.includes("drizzle") || conditionLower.includes("showers")) return "🌧️";
  if (conditionLower.includes("light rain")) return "🌦️";
  if (conditionLower.includes("heavy rain") || conditionLower.includes("torrential rain")) return "🌊";
  if (conditionLower.includes("snow")) return "❄️";
  if (conditionLower.includes("light snow")) return "🌨️";
  if (conditionLower.includes("heavy snow") || conditionLower.includes("blizzard")) return "🌬️❄️";
  if (conditionLower.includes("thunderstorm") || conditionLower.includes("storm")) return "⛈️";
  if (conditionLower.includes("hail")) return "🌨️⚪";
  if (conditionLower.includes("sleet")) return "🌧️❄️";
  if (conditionLower.includes("wind") || conditionLower.includes("breezy")) return "💨";
  if (conditionLower.includes("hot") || conditionLower.includes("heatwave")) return "🔥";
  if (conditionLower.includes("cold") || conditionLower.includes("freezing")) return "🧊";
  if (conditionLower.includes("tornado")) return "🌪️";
  if (conditionLower.includes("hurricane") || conditionLower.includes("cyclone")) return "🌀";
  if (conditionLower.includes("smoke")) return "🔥🌫️";
  if (conditionLower.includes("dust") || conditionLower.includes("sandstorm")) return "🏜️";

  return "❓"; // unknow condition
}


// Function to get the weather for all cities
async function getSortedWeather() {
  const weatherData = await Promise.all(cities.map(getWeather));

  return weatherData
    .filter((data) => data !== null) // Delete null values
    .map((city) => `${city.name} : ${city.temperature}°C ${city.emoji}`); // Format the data
}

export default getSortedWeather;
