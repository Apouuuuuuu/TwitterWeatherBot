import fetch from "node-fetch";

async function getWeather(city) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return `🌡️ ${city}: ${data.current_weather.temperature}°C, ${data.current_weather.windspeed} km/h`;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return "❌ Unable to get weather data";
  }
}

export { getWeather };
