import { useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = `${import.meta.env.VITE_WEATHER_API}`

  const fetchWeather = () => {
    if (!city) {
      alert("Please enter a city");
      return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="weather-container">
      {!weatherData && (
        <div className="search-container">
          <input
            type="text"
            placeholder="City, country"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="weather-input"
          />
          <button onClick={fetchWeather} className="weather-button">
            Search
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}

      {weatherData && (
        <div className="weather-info">
          <h1>
            {weatherData.location.name}, {weatherData.location.country}
          </h1>
          <p>{weatherData.current.condition.text}</p>
          <div className="current-weather">
            <img
              src={weatherData.current.condition.icon}
              alt="Weather Icon"
              className="weather-icon"
            />
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <button
            onClick={() => setWeatherData(null)}
            className="weather-button"
          >
            New Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Weather;
