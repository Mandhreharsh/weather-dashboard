<template>
  <div class="absolute">
    <form 
      @submit.prevent="onSubmit" 
      class="relative left-[80px] top-[-60px] flex gap-[30px] flex-row items-center w-[350px]"
    >
      <input
        v-model="q"
        type="text"
        placeholder="Enter city name (e.g. London)"
        class="flex-1 h-[35px] px-3 py-2 rounded-[5px] bg-[#f3f4f6] opacity-40 border focus:outline-none"
      />

      <button 
        type="submit" 
        class="px-4 py-2 h-[38px] w-[90px] bg-[#54899B] rounded-[5px] text-white"
      >
        Search
      </button>

      <!-- Uncomment if you want to enable geolocation button -->
      <!-- 
      <button 
        type="button" 
        @click="onGeo" 
        class="px-3 py-2 rounded border"
      >
        My location
      </button> 
      -->
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchBar",
  emits: ["search", "geolocate"],

  setup(_, { emit }) {
    const q = ref("");

    function onSubmit() {
      const trimmed = q.value.trim();
      if (!trimmed) return;
      emit("search", trimmed);
      q.value = "";
    }

    function onGeo() {
      emit("geolocate");
    }

    return { q, onSubmit, onGeo };
  },
});
</script>

<style scoped>
/* Add scoped styles if required */
</style>
