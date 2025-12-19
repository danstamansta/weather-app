import CurrentWeather  from './components/CurrentWeather/CurrentWeather';
import DailyForecast from './components/DailyForecast/DailyForecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import { useWeather } from './Hooks/useWeather';
import { Button } from './UI/Button/Button';
import {Input} from './UI/Input/Input';

export default function App() {
  const { weatherData, isLoading, error, refetch, cityName, setCityName } = useWeather();

  return (
    <div>
      <Input 
        type="text" 
        value={cityName} 
        onChange={(e) => setCityName(e.target.value)} 
      />

      <Button onClick={() => refetch()}>
        Search
      </Button>

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