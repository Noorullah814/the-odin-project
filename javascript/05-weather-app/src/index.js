import "./style.css";
import { getWeatherData } from "./weather.js";

function convertToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

let currentUnit = "C";
let latestWeather = null;
let latestForecast = [];

function getWeatherType(conditions) {
  if (typeof conditions !== "string" || conditions.trim() === "") {
    return "default";
  }

  const lowerConditions = conditions.toLowerCase();

  if (lowerConditions.includes("rain") || lowerConditions.includes("drizzle")) {
    return "rainy";
  }

  if (lowerConditions.includes("snow")) {
    return "snowy";
  }

  if (
    lowerConditions.includes("cloud") ||
    lowerConditions.includes("overcast")
  ) {
    return "cloudy";
  }

  if (lowerConditions.includes("clear") || lowerConditions.includes("sun")) {
    return "sunny";
  }

  return "default";
}

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

  const weatherType = getWeatherType(weather.conditions);

  document.body.dataset.weather = weatherType;

  document.querySelector("#temperature").textContent =
    `${temperature.toFixed(1)}${unit}`;

  document.querySelector("#feels-like").textContent =
    `Feels like ${feelsLike.toFixed(1)}${unit}`;
  document.querySelector("#humidity").textContent = `${weather.humidity}%`;
  document.querySelector("#wind-speed").textContent =
    `${weather.windSpeed} km/h`;
}

function displayForecast(days) {
  const forecastContainer = document.querySelector("#forecast-container");

  const forecastCards = days.map((day) => {
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    const forecastDate = new Date(`${day.datetime}T12:00:00`);
    const formattedDate = forecastDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const isFahrenheit = currentUnit === "F";
    const maxTemperature = isFahrenheit
      ? convertToFahrenheit(day.tempmax)
      : day.tempmax;
    const minTemperature = isFahrenheit
      ? convertToFahrenheit(day.tempmin)
      : day.tempmin;
    const unit = isFahrenheit ? "°F" : "°C";

    const dateElement = document.createElement("p");
    dateElement.textContent = formattedDate;
    card.appendChild(dateElement);

    const conditionsElement = document.createElement("p");
    conditionsElement.textContent = day.conditions;
    card.appendChild(conditionsElement);

    const maxTemperatureElement = document.createElement("p");
    maxTemperatureElement.textContent = `Max: ${maxTemperature.toFixed(1)}${unit}`;
    card.appendChild(maxTemperatureElement);

    const minTemperatureElement = document.createElement("p");
    minTemperatureElement.textContent = `Min: ${minTemperature.toFixed(1)}${unit}`;
    card.appendChild(minTemperatureElement);

    return card;
  });

  forecastContainer.replaceChildren(...forecastCards);
}

const searchForm = document.querySelector("#search-form");
const locationInput = document.querySelector("#location-input");
const statusMessage = document.querySelector("#status-message");

const celsiusButton = document.querySelector("#celsius-btn");
const fahrenheitButton = document.querySelector("#fahrenheit-btn");

celsiusButton.setAttribute("aria-pressed", "true");
fahrenheitButton.setAttribute("aria-pressed", "false");

celsiusButton.addEventListener("click", () => {
  currentUnit = "C";

  celsiusButton.setAttribute("aria-pressed", "true");
  fahrenheitButton.setAttribute("aria-pressed", "false");

  if (latestWeather) {
    displayCurrentWeather(latestWeather);
    displayForecast(latestForecast);
  }
});

fahrenheitButton.addEventListener("click", () => {
  currentUnit = "F";

  fahrenheitButton.setAttribute("aria-pressed", "true");
  celsiusButton.setAttribute("aria-pressed", "false");

  if (latestWeather) {
    displayCurrentWeather(latestWeather);
    displayForecast(latestForecast);
  }
});

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

  try {
    const data = await getWeatherData(location);

    if (
      !data.resolvedAddress ||
      !data.currentConditions ||
      typeof data.currentConditions.temp !== "number" ||
      typeof data.currentConditions.feelslike !== "number" ||
      typeof data.currentConditions.humidity !== "number" ||
      typeof data.currentConditions.windspeed !== "number" ||
      !Array.isArray(data.days) ||
      data.days.length === 0
    ) {
      throw new Error("Weather response is missing required data.");
    }

    const isForecastValid = data.days.every(
      (day) =>
        typeof day.datetime === "string" &&
        typeof day.conditions === "string" &&
        typeof day.tempmax === "number" &&
        typeof day.tempmin === "number"
    );

    if (!isForecastValid) {
      throw new Error("One or more forecast days are missing required data.");
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
    statusMessage.textContent =
      "Unable to load weather. Check the city name or try again.";
  } finally {
    searchButton.disabled = false;
    searchButton.textContent = "Search";
  }
});
