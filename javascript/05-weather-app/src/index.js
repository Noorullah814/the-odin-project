import "./style.css";
import { getWeatherData } from "./weather.js";

getWeatherData("Islamabad")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });