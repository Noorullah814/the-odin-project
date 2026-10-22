import "./style.css";
import { getWeatherData } from "./weather.js";

function displayCurrentWeather(weather) {
  document.querySelector("#location-name").textContent = weather.location;
  document.querySelector("#conditions").textContent = weather.conditions;
  document.querySelector("#temperature").textContent = `${weather.temperature}°C`;
  document.querySelector("#feels-like").textContent = `Feels like ${weather.feelsLike}°C`;
  document.querySelector("#humidity").textContent = `${weather.humidity}%`;
  document.querySelector("#wind-speed").textContent = `${weather.windSpeed} km/h`;
}

// 1. Create the forecast display function
function displayForecast(days) {
  const forecastContainer = document.querySelector("#forecast-container");

  forecastContainer.textContent = "";

  console.log("Forecast array in displayForecast:", days);
}

const searchForm = document.querySelector("#search-form");
const locationInput = document.querySelector("#location-input");
const statusMessage = document.querySelector("#status-message");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = locationInput.value.trim();

  if (!location) {
    return;
  }

  statusMessage.textContent = `Loading weather for ${location}...`;

  getWeatherData(location)
    .then((data) => {
      const currentWeather = {
        location: data.resolvedAddress,
        conditions: data.currentConditions.conditions,
        temperature: data.currentConditions.temp,
        feelsLike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        windSpeed: data.currentConditions.windspeed,
      };

      displayCurrentWeather(currentWeather);
      
      // 2. Pass the array of days to your new function
      displayForecast(data.days);

      statusMessage.textContent = `Weather loaded for ${currentWeather.location}.`;
    })
    .catch((error) => {
      console.error(error);
      statusMessage.textContent = "Unable to load weather. Check the city name or try again.";
    });
});