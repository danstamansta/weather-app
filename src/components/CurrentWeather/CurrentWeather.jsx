export default function CurrentWeather({ data }) { 
  if (!data) {
    return <div>No weather data available</div>;
  }
  
  return (
    <div>
      <h1>{data.temperature_2m}C</h1>

      <p>Feels Like: {data.apparent_temperature}°</p>

      <p>Humidity: {data.relative_humidity_2m}%</p>

      <p>Wind: {data.wind_speed_10m} km/h</p>

      <p>Precipitation: {data.precipitation} mm</p>
    </div>
  );
}