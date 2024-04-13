import React from "react";
function WeatherCard({ weatherData }) {
  const city = {
    fontSize: "3rem",
  };
  return (
    <div className="card">
      <div className="weatherImg">
        <img src={`./public/assets/${weatherData.weather[0].icon}.png`} />
      </div>
      <div className="weatherData">
        <h1>{(weatherData.main.temp - 273.15).toFixed(1)}°C</h1>
        <h1 style={city}>{weatherData.name}</h1>
        <h2 className="sky">{weatherData.weather[0].description}</h2>
        <div>
          <span className="x">
            <img src={"./public/assets/humidity.png"} alt="humidity" />
            <span>
              <h2>{weatherData.main.humidity}%</h2>
              <h2>Humidity</h2>
            </span>
          </span>
          <span className="x">
            <img src={"./public/assets/wind.png"} alt="wind" />
            <span>
              <h2>{weatherData.wind.speed}m/s</h2>
              <h2>Wind Speed</h2>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
