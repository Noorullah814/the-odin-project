export async function getWeatherData(location) {
  const apiKey = process.env.WEATHER_API_KEY; 
  
  // 1. Safely encode the user input
  const encodedLocation = encodeURIComponent(location);
  
  // 2. Inject the encoded variable into the URL
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=metric&include=current&key=${apiKey}&contentType=json`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}