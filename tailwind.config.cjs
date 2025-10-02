// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        fleur: ["Fleur De Leah", "cursive"], // 👈 Custom Google Font
        sans: ["Inter", "sans-serif"],       // Example: fallback for normal text
        serif: ["Merriweather", "serif"],    // Example: optional serif
         poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#1d4ed8",   // blue
        secondary: "#9333ea", // purple
        accent: "#f59e0b",    // amber
        dark: "#111827",      // dark gray
        light: "#f3f4f6",     // light gray
      },
    },
  },
  plugins: [],
};
