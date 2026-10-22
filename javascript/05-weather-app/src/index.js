import "./style.css";
import { getWeatherData } from "./weather.js";

const searchForm = document.querySelector("#search-form");
const locationInput = document.querySelector("#location-input");
const statusMessage = document.querySelector("#status-message");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = locationInput.value.trim();

  if (!location) {
    return;
  }

  // Update status message while waiting for the API
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

      document.querySelector("#location-name").textContent = currentWeather.location;
      document.querySelector("#conditions").textContent = currentWeather.conditions;
      document.querySelector("#temperature").textContent = `${currentWeather.temperature}°C`;
      document.querySelector("#feels-like").textContent = `Feels like ${currentWeather.feelsLike}°C`;
      document.querySelector("#humidity").textContent = `${currentWeather.humidity}%`;
      document.querySelector("#wind-speed").textContent = `${currentWeather.windSpeed} km/h`;

      // Clear the loading message on success
      statusMessage.textContent = `Weather loaded for ${currentWeather.location}.`;
    })
    .catch((error) => {
      console.error(error);
      // Display a user-friendly error if the city isn't found
      statusMessage.textContent = "Unable to load weather. Check the city name or try again.";
    });
});