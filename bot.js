import { getWeather } from "./utils/weather.js";
import { postTweet } from "./utils/twitter.js";

async function tweetWeather() {
  console.log("🔄 Fetching weather data...");
  const weatherUpdate = await getWeather("Paris");
  await postTweet(weatherUpdate);
}

tweetWeather();
