<template>
  <div 
    class="absolute m-[-10px] min-h-screen fullContainer w-full flex flex-col items-center justify-center bg-[#1f1f1f]"
  >
    <div class="mt-[90px]">

      <!-- Search Bar -->
      <div class="flex justify-center">
        <SearchBar 
          @search="onSearch" 
          @geolocate="onGeolocate" 
        />
      </div>

      <!-- Weather Card -->
      <div class="mt-[-10px] text-white flex justify-center">
        <WeatherCard 
          :weather="weather" 
          :units="units" 
        />
      </div>

      <!-- Error + Loading States -->
      <div class="mt-6 text-center">
        <div v-if="loading" class="text-gray-400 text-sm">
          Loading...
        </div>
        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import SearchBar from "../components/SearchBar.vue";
import WeatherCard from "../components/WeatherCard.vue";
import { useWeather } from "../composables/useWeather";

export default defineComponent({
  name: "DashboardView",

  components: { 
    SearchBar, 
    WeatherCard 
  },

  setup() {
    const { 
      weather, 
      loading, 
      error, 
      units, 
      searchCity, 
      toggleUnits, 
      useGeolocation 
    } = useWeather();

    // Default city on load
    onMounted(() => {
      searchCity("New Delhi");
    });

    function onSearch(city: string) {
      searchCity(city);
    }

    function onGeolocate() {
      useGeolocation();
    }

    const unitsLabel = computed(() =>
      units.value === "metric" ? "°C" : 
      units.value === "imperial" ? "°F" : "K"
    );

    return {
      weather,
      loading,
      error,
      units,
      onSearch,
      toggleUnits,
      onGeolocate,
      unitsLabel,
    };
  },
});
</script>

<style scoped>
/* Minimal custom styles; Tailwind handles responsiveness */
</style>
