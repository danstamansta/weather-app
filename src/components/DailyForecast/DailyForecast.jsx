export default function DailyForecast({ data }) { 
  if (!data) {
    return <div>No daily forecast data available</div>;
  } 

    return (
    <div className="daily-list">
        <h3>Daily Forecast</h3>
      {data.time.map((date, index) => (
        <div key={date} className="day-card">
          <h3>{new Date(date).toLocaleDateString('en-US',{weekday: 'short'})}</h3>

          <p>Max: {data.temperature_2m_max[index]}°C</p>
          <p>Min: {data.temperature_2m_min[index]}°C</p>
        </div>
      ))}
    </div>
  );
}