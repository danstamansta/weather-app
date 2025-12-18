import CurrentWeather  from './components/CurrentWeather/CurrentWeather';
import DailyForecast from './components/DailyForecast/DailyForecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import { useWeather } from './Hooks/useWeather';

export default function App() {
  const { weatherData, isLoading, error, refetch, cityName, setCityName } = useWeather();

  return (
    <div>
      <input 
        type="text" 
        value={cityName} 
        onChange={(e) => setCityName(e.target.value)} 
      />

      <button onClick={() => refetch()}>
        Search
      </button>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {weatherData && (
        <CurrentWeather data={weatherData.current} />
      )}
      <hr></hr>

      {weatherData && (
        <DailyForecast data={weatherData.daily} />
      )}
      <hr></hr>

      {weatherData && (
        <HourlyForecast data={weatherData.hourly} />
      )}
    </div>
  );
}