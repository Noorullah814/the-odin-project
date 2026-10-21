import "./style.css";
import { getWeatherData } from "./weather.js";

getWeatherData("Islamabad")
  .then((data) => {
    const currentWeather = {
  location: data.resolvedAddress,
  conditions: data.currentConditions.conditions,
  temperature: data.currentConditions.temp,
  feelsLike: data.currentConditions.feelslike,
  humidity: data.currentConditions.humidity,
  windSpeed: data.currentConditions.windspeed,
};

console.log(currentWeather);

document.querySelector("#location-name").textContent =
  currentWeather.location;

document.querySelector("#conditions").textContent =
  currentWeather.conditions;

document.querySelector("#temperature").textContent =
  `${currentWeather.temperature}°C`;

document.querySelector("#feels-like").textContent =
  `Feels like ${currentWeather.feelsLike}°C`;

document.querySelector("#humidity").textContent =
  `${currentWeather.humidity}%`;

document.querySelector("#wind-speed").textContent =
  `${currentWeather.windSpeed} km/h`;
  
  })
  .catch((error) => {
    console.error(error);
  });