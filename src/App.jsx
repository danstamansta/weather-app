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
  const finalWeatherResponse = await weatherResponse.json();
  console.log(finalWeatherResponse);
 
  
  return {weather:finalWeatherResponse, 
          country:country};
}


export default function App() {
  const [cityName, setCityName] = useState('London');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', cityName],
    
    queryFn: () => fetchWeather(cityName),
    
    enabled: false, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <input 
        type="text" 
        value={cityName} 
        onChange={(e) => setCityName(e.target.value)} 
      />

      <button onClick={() => refetch()}>
        Fetch Data
      </button>

      {data && (
        <div>
          <h2>Weather in {cityName}, {data.country}</h2>
          <p>Temperature: {data.weather.current.temperature_2m}C</p>
          <p>Wind: {data.weather.current.windspeed_2m} km/h</p>
          <p>Humidity: {data.weather.current.relative_humidity_2m}%</p>
          <p>Precipitation: {data.weather.current.precipitation} mm</p>
          <p>Feels Like : {data.weather.current.apparent_temperature}</p>
        </div>
      )}
    </div>
  );
}