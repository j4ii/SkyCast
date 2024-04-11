import "./App.css";
import React, { useState, useEffect } from "react";
import WeatherForm from "./components/WeatherForm.jsx";
import CitySuggestions from "./components/CitySuggestions.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import ErrorDisplay from "./components/ErrorDisplay.jsx";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Function to get weather data based on user's location
  const getWeatherByLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const weatherData = await getWeatherDataByCoords(
        position.coords.latitude,
        position.coords.longitude
      );
      setWeatherData(weatherData);
    } catch (error) {
      setError("Unable to fetch weather data for your location");
    }
  };

  // Function to get user's current position
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    getWeatherByLocation();
  }, []); // Run once on component mount

  // Function to fetch weather data based on latitude and longitude
  async function getWeatherDataByCoords(latitude, longitude) {
    const apiKey = "aaa932ef4ea95017a674c82497470181";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }
    return await response.json();
  }

  // Function to fetch city suggestions based on user input
  async function getCitySuggestions(userInput) {
    const apiKey = "aaa932ef4ea95017a674c82497470181";
    const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${userInput}&type=like&sort=population&cnt=5&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch city suggestions");
    }
    const data = await response.json();
    return data.list;
  }

  const handleCityInputChange = async (event) => {
    const userInput = event.target.value;
    setCityInput(userInput);
    if (userInput.length >= 3) {
      try {
        const suggestions = await getCitySuggestions(userInput);
        setSuggestions(suggestions);
      } catch (error) {
        setError("Unable to fetch city suggestions");
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cityInput) {
      try {
        const weatherData = await getWeatherData(cityInput);
        setWeatherData(weatherData);
        setCityInput("");
        setSuggestions([]);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Please enter a city name");
    }
  };

  const handleSuggestionClick = (cityName) => {
    setCityInput(cityName); // Update input field with clicked city suggestion
    setSuggestions([]); // Clear suggestions
    setWeatherData(null); // Clear weather data
    setError(null); // Clear error
  };

  // Function to get weather data based on city name
  async function getWeatherData(city) {
    const apiKey = "aaa932ef4ea95017a674c82497470181";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }
    return await response.json();
  }

  useEffect(() => {
    if (weatherData) {
      changeBackgroundColor(weatherData.weather[0].id);
    }
  }, [weatherData]); // Run whenever weatherData changes

  // Function to change background color based on weather conditions
  function changeBackgroundColor(weatherId) {
    const body = document.querySelector("body");
    let gradient;
    let color;
    switch (true) {
      case weatherId >= 200 && weatherId < 300:
        gradient = "linear-gradient(#666666, #000000)";
        color = "#ffffff";
        break;
      case weatherId >= 300 && weatherId < 600:
        gradient = "linear-gradient(#6c7a89, #29465b)";
        color = "#ffffff";
        break;
      case weatherId >= 600 && weatherId < 700:
        gradient = "linear-gradient(#ffffff, #d9d9d9)";
        color = "#000000";
        break;
      case weatherId >= 700 && weatherId < 800:
        gradient = "linear-gradient(#bdbdbd, #808080)";
        color = "#000000";
        break;
      case weatherId === 800:
        gradient = "linear-gradient(#2196F3, #963200)";
        color = "#ffffff";
        break;
      case weatherId > 800:
        gradient = "linear-gradient(#f0f0f0, #c0c0c0)";
        color = "#000000";
        break;
      default:
        gradient = "linear-gradient(#ffffff, #d3d3d3)";
        color = "#000000";
    }
    body.style.backgroundImage = gradient;
    body.style.color = color;
  }

  return (
    <>
      <h1 className="title">SkyCast</h1>
      <>
        <WeatherForm
          cityInput={cityInput}
          handleCityInputChange={handleCityInputChange}
          handleSubmit={handleSubmit}
        >
          {suggestions.length > 0 && (
            <CitySuggestions
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          )}
        </WeatherForm>
      </>
      {error && <ErrorDisplay error={error} />}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </>
  );
}

export default App;
