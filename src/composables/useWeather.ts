// src/composables/useWeather.ts
import { ref } from "vue";
import weatherApi from "../services/weatherApi";
import type { CurrentWeatherResponse } from "../types/weather";
import type { Units } from "../services/weatherApi";

const defaultCity = "New Delhi";

export function useWeather() {
  const weather = ref<CurrentWeatherResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const units = ref<Units>("metric"); // metric: Celsius, imperial: Fahrenheit
  const lastQuery = ref<string | null>(null);

  async function searchCity(city: string) {
    error.value = null;
    loading.value = true;
    lastQuery.value = city;
    try {
      const res = await weatherApi.fetchCurrentWeatherByCity(city, units.value);
      weather.value = res;
    } catch (err: any) {
      weather.value = null;
      error.value = err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  }

  async function fetchByCoords(lat: number, lon: number) {
    error.value = null;
    loading.value = true;
    try {
      const res = await weatherApi.fetchCurrentWeatherByCoords(lat, lon, units.value);
      weather.value = res;
      lastQuery.value = `${res.name}`;
    } catch (err: any) {
      weather.value = null;
      error.value = err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  }

  function toggleUnits() {
    units.value = units.value === "metric" ? "imperial" : "metric";
    // Refetch if we already have a last query (apply unit change immediately)
    if (lastQuery.value) {
      // Fire and forget; errors handled inside searchCity
      searchCity(lastQuery.value);
    }
  }

  async function useGeolocation() {
    error.value = null;
    if (!navigator.geolocation) {
      error.value = "Geolocation is not supported in your browser.";
      return;
    }
    loading.value = true;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchByCoords(latitude, longitude);
        loading.value = false;
      },
      (err) => {
        error.value = "Permission denied or unable to fetch location.";
        loading.value = false;
      }
    );
  }

  return {
    weather,
    loading,
    error,
    units,
    searchCity,
    toggleUnits,
    useGeolocation,
    fetchByCoords,
  };
}
