// src/services/weatherApi.ts
import axios from "axios";
import type { CurrentWeatherResponse } from "../types/weather";


const API_KEY = import.meta.env.VITE_OWM_API_KEY;
if (!API_KEY) {
  console.warn("VITE_OWM_API_KEY not set in .env. Set it before running the app.");
}

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export type Units = "metric" | "imperial" | "standard";

async function fetchCurrentWeatherByCity(city: string, units: Units = "metric"): Promise<CurrentWeatherResponse> {
  try {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;
    const res = await axios.get<CurrentWeatherResponse>(url);
    return res.data;
  } catch (err: any) {
    // Normalize error messages
    if (err.response?.data?.message) throw new Error(err.response.data.message);
    throw new Error(err.message || "Failed to fetch weather");
  }
}

async function fetchCurrentWeatherByCoords(lat: number, lon: number, units: Units = "metric"): Promise<CurrentWeatherResponse> {
  try {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
    const res = await axios.get<CurrentWeatherResponse>(url);
    return res.data;
  } catch (err: any) {
    if (err.response?.data?.message) throw new Error(err.response.data.message);
    throw new Error(err.message || "Failed to fetch weather");
  }
}

export default {
  fetchCurrentWeatherByCity,
  fetchCurrentWeatherByCoords,
};
