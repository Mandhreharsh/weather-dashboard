// src/types/weather.ts
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg?: number;
}

export interface Sys {
  country: string;
  sunrise?: number;
  sunset?: number;
}

export interface CurrentWeatherResponse {
  coord: { lon: number; lat: number };
  weather: Weather[];
  base?: string;
  main: MainInfo;
  visibility?: number;
  wind: Wind;
  clouds?: { all: number };
  dt: number;
  sys: Sys;
  timezone?: number;
  id?: number;
  name: string;
}
