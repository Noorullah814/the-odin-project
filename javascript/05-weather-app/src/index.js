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
  })
  .catch((error) => {
    console.error(error);
  });