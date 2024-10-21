/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        "google-fonts": ["google-fonts", "sans-serif"], // Define your custom font family
      },

      colors: {
        dark: "#171420",
        lightBackground: "#F9FAFB",
        background: "#EDF2F7",
        activeBackground: "#E5E5E6",
        muted: "#6c737f",
        mutedLight: "#A5A5A9",
        primary: "#21C55D",
        darkLight: "#1F1D29",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};