# 🌤️ X / Twitter Weather Bot  

This bot automatically **fetches weather data for multiple French cities** and posts it on **Twitter** twice a day at **8 AM and 2 PM**.  
It uses **WeatherAPI** to get real-time weather data and tweets the temperatures with appropriate weather emojis. 

**🔗 Follow the Bot on Twitter (X) : [WeatherBot](https://x.com/BotMeteoFrance)**


---

## ✨ Features  

✅ **Fetches real-time weather data** for major French cities  
✅ **Posts temperatures with weather emojis** ☀️⛅🌧️❄️  
✅ **Distinguishes between morning and afternoon (before and after 12 PM UTC)**  

---

## **📦 Local Setup**  

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Apouuuuuuu/TwitterWeatherBot.git
cd TwitterWeatherBot
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a .env file at the root of the project and add your API keys:

```ini
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_SECRET=your_twitter_access_secret
WEATHER_API_KEY=your_weather_api_key
```

### 4️⃣Delete .github/workflows directory

Delete the `.github/` directory and what it contains.

It is used for the Github Action deployment.

### 5️⃣ Run the Bot Locally
```sh
node bot.js
```


## 🚀 **Deploy using GitHub Actions**

### 1️⃣ Set Up Environment Variables

 Go to your repository → Settings → Secrets and variables → Actions

### 2️⃣ Add the required API keys as secrets:

```ini
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_SECRET=your_twitter_access_secret
WEATHER_API_KEY=your_weather_api_key
```

### 3️⃣ GitHub Actions will automatically execute the bot at 8 AM and 2 PM UTC.

## 🛠 Built With
```
Node.js – JavaScript runtime
Twitter API v2 – Posting tweets
WeatherAPI – Fetching weather data
GitHub Actions
```


## 🔑 How to get API Keys ?
🔓To obtain your Twitter API keys, sign in and create an app in the [X Developer Portal](https://developer.x.com/).


🔓To obtain your Weather API key, sign in and generate a new API key on the [WeatherAPI website](https://www.weatherapi.com/).

### **📩 Contact**  
If you have any questions or issues, feel free to reach out! 🚀  

📌 **GitHub:** [Apouuuuuuu](https://github.com/Apouuuuuuu)  
💬 **Discord:** Apou  
---
