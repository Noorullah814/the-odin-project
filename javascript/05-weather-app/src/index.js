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

  const forecastCards = days.map((day) => {
    // 1. Create a safe date object set to noon
    const forecastDate = new Date(`${day.datetime}T12:00:00`);
    
    // 2. Format the date into a readable string
    const formattedDate = forecastDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    // 3. Inject the formattedDate instead of day.datetime
    return `
      <div class="forecast-card">
        <p>${formattedDate}</p>
        <p>${day.conditions}</p>
        <p>Max: ${day.tempmax}°C</p>
        <p>Min: ${day.tempmin}°C</p>
      </div>
    `;
  });

  forecastContainer.innerHTML = forecastCards.join("");
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