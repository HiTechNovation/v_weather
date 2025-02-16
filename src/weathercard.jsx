import React from "react";
import { FaTemperatureHigh, FaWind, FaTint } from "react-icons/fa";

const WeatherCard = ({ weather }) => {
  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg">
      <h2 className="text-3xl font-bold text-center">{weather.name}, {weather.sys.country}</h2>
      <p className="text-xl text-center capitalize">{weather.weather[0].description}</p>
      <div className="flex justify-around mt-4">
        <div className="flex flex-col items-center">
          <FaTemperatureHigh className="text-3xl text-red-500" />
          <p className="text-xl font-bold">{weather.main.temp}°C</p>
        </div>
        <div className="flex flex-col items-center">
          <FaTint className="text-3xl text-blue-500" />
          <p className="text-xl font-bold">{weather.main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <FaWind className="text-3xl text-gray-500" />
          <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
