import React, { useState } from "react";
import axios from "axios";

const API_KEY = "9f152cdce6574361a99154652251602"; // Correct API key

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      console.error("Error Response:", err.response); // Debugging
      if (err.response && err.response.status === 401) {
        setError("Invalid API key. Please check your API key.");
      } else if (err.response && err.response.status === 404) {
        setError("City not found. Please try again.");
      } else {
        setError("Something went wrong. Try again later.");
      }
      setWeather(null);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-700 p-6">
      <div className="w-full max-w-2xl min-h-[500px] md:min-h-[600px] bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-8 text-center border border-white/20">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">🌦️ v_weather App</h1>

        <div className="flex mt-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 rounded-l-md bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-r-md transition duration-300"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        {weather && (
          <div className="mt-8 text-white">
            <h2 className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-lg opacity-90">{weather.weather[0].description}</p>
            <div className="flex justify-center items-center mt-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
                className="w-20 h-20 drop-shadow-lg"
              />
              <p className="text-5xl font-bold ml-4">{weather.main.temp}°C</p>
            </div>
            <div className="flex justify-around mt-5 text-lg opacity-90">
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
