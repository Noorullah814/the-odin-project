async function getWeatherData(location) {
  const apiKey = process.env.WEATHER_API_KEY;

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=current&key=${apiKey}&contentType=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not fetch weather data.");
  }

  const weatherData = await response.json();

  return weatherData;
}

export { getWeatherData };