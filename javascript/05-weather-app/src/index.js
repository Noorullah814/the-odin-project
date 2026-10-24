import "./style.css";
import { getWeatherData } from "./weather.js";

function convertToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

let currentUnit = "C";
let latestWeather = null;
let latestForecast = [];

function displayCurrentWeather(weather) {
  const temperatureCelsius = weather.temperature;
  const feelsLikeCelsius = weather.feelsLike;

  const isFahrenheit = currentUnit === "F";

  const temperature = isFahrenheit
    ? convertToFahrenheit(temperatureCelsius)
    : temperatureCelsius;

  const feelsLike = isFahrenheit
    ? convertToFahrenheit(feelsLikeCelsius)
    : feelsLikeCelsius;

  const unit = isFahrenheit ? "°F" : "°C";

  document.querySelector("#location-name").textContent = weather.location;
  document.querySelector("#conditions").textContent = weather.conditions;
  document.querySelector("#temperature").textContent =
    `${temperature.toFixed(1)}${unit}`;

  document.querySelector("#feels-like").textContent =
    `Feels like ${feelsLike.toFixed(1)}${unit}`;
  document.querySelector("#humidity").textContent = `${weather.humidity}%`;
  document.querySelector("#wind-speed").textContent =
    `${weather.windSpeed} km/h`;
}

// 1. Create the forecast display function
function displayForecast(days) {
  const forecastContainer = document.querySelector("#forecast-container");

  forecastContainer.textContent = "";

  const forecastCards = days.map((day) => {
    const forecastDate = new Date(`${day.datetime}T12:00:00`);
    const formattedDate = forecastDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    // 1. Check state and convert if necessary
    const isFahrenheit = currentUnit === "F";

    const maxTemperature = isFahrenheit
      ? convertToFahrenheit(day.tempmax)
      : day.tempmax;

    const minTemperature = isFahrenheit
      ? convertToFahrenheit(day.tempmin)
      : day.tempmin;

    const unit = isFahrenheit ? "°F" : "°C";

    // 2. Update the template to use the new variables and format them to 1 decimal place
    return `
      <div class="forecast-card">
        <p>${formattedDate}</p>
        <p>${day.conditions}</p>
        <p>Max: ${maxTemperature.toFixed(1)}${unit}</p>
        <p>Min: ${minTemperature.toFixed(1)}${unit}</p>
      </div>
    `;
  });

  forecastContainer.innerHTML = forecastCards.join("");
}
const searchForm = document.querySelector("#search-form");
const locationInput = document.querySelector("#location-input");
const statusMessage = document.querySelector("#status-message");

const celsiusButton = document.querySelector("#celsius-btn");
const fahrenheitButton = document.querySelector("#fahrenheit-btn");

celsiusButton.addEventListener("click", () => {
  currentUnit = "C";

  if (latestWeather) {
    displayCurrentWeather(latestWeather);
    displayForecast(latestForecast);
  }
});

fahrenheitButton.addEventListener("click", () => {
  currentUnit = "F";

  if (latestWeather) {
    displayCurrentWeather(latestWeather);
    displayForecast(latestForecast);
  }
});

// 1. Make the callback async
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = locationInput.value.trim();

  if (!location) {
    return;
  }

  const searchButton = searchForm.querySelector('button[type="submit"]');

  statusMessage.textContent = `Loading weather for ${location}...`;
  searchButton.disabled = true;
  searchButton.textContent = "Loading...";

  // 2. Replace .then/.catch with try/catch/finally
  try {
    const data = await getWeatherData(location);

    // Enhanced validation to ensure all required fields exist and are the correct type
    if (
      !data.resolvedAddress ||
      !data.currentConditions ||
      typeof data.currentConditions.temp !== "number" ||
      typeof data.currentConditions.feelslike !== "number" ||
      typeof data.currentConditions.humidity !== "number" ||
      typeof data.currentConditions.windspeed !== "number" ||
      !Array.isArray(data.days)
    ) {
      throw new Error("Weather response is missing required data.");
    }

    const currentWeather = {
      location: data.resolvedAddress,
      conditions: data.currentConditions.conditions,
      temperature: data.currentConditions.temp,
      feelsLike: data.currentConditions.feelslike,
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed,
    };

    latestWeather = currentWeather;
    latestForecast = data.days;

    displayCurrentWeather(latestWeather);
    displayForecast(latestForecast);

    statusMessage.textContent = `Weather loaded for ${currentWeather.location}.`;
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Unable to load weather. Check the city name or try again.";
  } finally {
    // 3. This runs no matter what, cleanly resetting your UI!
    searchButton.disabled = false;
    searchButton.textContent = "Search";
  }
});
