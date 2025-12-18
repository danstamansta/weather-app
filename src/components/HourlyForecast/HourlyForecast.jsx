export default function HourlyForecast({ data }) { 
  if (!data) {
    return <div>No hourly forecast data available</div>;
  } 
    return (
    <div className="hourly-list">
        <h3>Hourly Forecast</h3>
      {data.time.slice(0,23).map((time, index) => (
        <div key={time} className="hour-card">
          <h3>{new Date(time).toLocaleTimeString('en-US', {hour:'2-digit'})}</h3>   
            <p>Temp: {data.temperature_2m[index]}°C</p>
        </div>
      ))}
    </div>
  );
}