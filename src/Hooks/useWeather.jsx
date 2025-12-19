import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


async function fetchWeather(city) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
  const geoResponse = await fetch(geoUrl);
  if (!geoResponse.ok) 
    throw new Error("Geo fetch failed");

  const geoData = await geoResponse.json();
  console.log(geoData)
  
  

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found");
  }

  const { latitude, longitude, country } = geoData.results[0];
  

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  const weatherResponse = await fetch(weatherUrl);
  if (!weatherResponse.ok) throw new Error("Weather fetch failed");
  const rawData = await weatherResponse.json();
  console.log(rawData);
 
  
  return {current: rawData.current,
          hourly: rawData.hourly,
          daily: rawData.daily,
          country: country};

}
export function useWeather(){
 const [cityName, setCityName] = useState('Tel Aviv');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', cityName],
    
    queryFn: () => fetchWeather(cityName),
    
    enabled: false, 
  });

 

return { weatherData: data, isLoading, error, refetch, cityName, setCityName };
}