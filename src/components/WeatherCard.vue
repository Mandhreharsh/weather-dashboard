<template>
  <div 
    v-if="weather" 
    class="flex flex-row justify-between mainContainer bg-cover" 
    style="background-image: url('/image.png');"
  >
    <!-- First -->
    <div class="container1 h-[600px] w-[750px] flex items-center justify-between">
      <div class="flex flex-col gap-[10px]">

        <!-- Temperature -->
        <div class="flex flex-row gap-[5px] ml-[80px] mt-[50px]">
          <div class="text-[80px] text-[#f3f4f6]">
            {{ Math.round(weather.main.temp) }}
          </div>
          <div class="text-[30px] text-[#f3f4f6] mt-[10px]">
            °{{ unitSymbol }}
          </div>
        </div>

        <!-- Weather Description -->
        <div class="ml-[80px]">
          <div class="text-[50px] text-[#f3f4f6]">
            {{ weather.weather[0].description }}
          </div>
        </div>

        <!-- Location -->
        <div class="flex flex-row gap-[15px] ml-[80px]">
          <img 
            src="/location.png" 
            alt="location" 
            class="w-[25px] h-[25px] mt-[20px]" 
          />
          <h2 class="text-xl text-[#f3f4f6]">
            {{ weather.name }}, {{ weather.sys.country }}
          </h2>
        </div>

        <!-- Info Text -->
        <div class="text-[#f3f4f6] ml-[80px] flex text-wrap">
          <h1 
            class="font-light text-[25px]" 
            style="font-weight: 100; font-family: var(--font-sans);"
          >
            Our weather dashboard provides live weather data from trusted 
            sources, helping you plan your day with confidence.
          </h1>
        </div>

      </div>
    </div>

    <!-- Second -->
    <div class="container2 bg-[#010101] opacity-50 h-[600px] w-[450px] flex flex-col items-center justify-center">
      <div class="w-[200px] h-[250px] border-[1px] border-[#f3f4f6] rounded-[10px] flex flex-col p-[30px] gap-[30px]">

        <!-- Local Time -->
        <div class="text-[18px] text-[#f3f4f6]">
          {{ localTime }}
        </div>

        <!-- Feels Like -->
        <div class="text-[18px] text-[#f3f4f6] flex flex-row justify-between">
          <div>Feels like:</div>
          <strong>{{ Math.round(weather.main.feels_like) }}°{{ unitSymbol }}</strong>
        </div>

        <!-- Humidity -->
        <div class="text-[18px] text-[#f3f4f6] flex flex-row justify-between">
          <div>Humidity:</div>
          <strong>{{ weather.main.humidity }}%</strong>
        </div>

        <!-- Wind -->
        <div class="text-[18px] text-[#f3f4f6] flex flex-row justify-between">
          <div>Wind:</div>
          <strong>{{ weather.wind.speed }} {{ windUnit }}</strong>
        </div>

        <!-- Pressure -->
        <div class="text-[18px] text-[#f3f4f6] flex flex-row justify-between">
          <div>Pressure:</div>
          <strong>{{ weather.main.pressure }} hPa</strong>
        </div>

      </div>
    </div>
  </div>

  <!-- No Data -->
  <div 
    v-else 
    class="text-[18px] text-[#f3f4f6] p-6 rounded-xl shadow-md bg-white max-w-md w-full text-center text-gray-500"
  >
    No data to show.
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import type { CurrentWeatherResponse } from "../types/weather";

export default defineComponent({
  name: "WeatherCard",

  props: {
    weather: { 
      type: Object as () => CurrentWeatherResponse | null, 
      required: false 
    },
    units: { 
      type: String as () => "metric" | "imperial" | "standard", 
      required: true 
    },
  },

  setup(props) {
    const iconUrl = computed(() => {
      const icon = props.weather?.weather?.[0]?.icon;
      return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "";
    });

    const unitSymbol = computed(() =>
      props.units === "metric" ? "C" : props.units === "imperial" ? "F" : "K"
    );

    const windUnit = computed(() =>
      props.units === "metric" ? "m/s" : "mph"
    );

    const localTime = computed(() => {
      if (!props.weather) return "";
      // convert dt (UTC) + timezone to local time string
      const utc = props.weather.dt * 1000;
      const tz = (props.weather.timezone ?? 0) * 1000;
      const local = new Date(utc + tz);
      return local.toLocaleString();
    });

    return { iconUrl, unitSymbol, windUnit, localTime };
  },
});
</script>

<style scoped>
/* card styling handled with tailwind */
</style>
