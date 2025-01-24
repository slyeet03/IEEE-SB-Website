
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "ieee-blue": {
          DEFAULT: "#006699",
          light: "#3399CC", 
          dark: "#004466", 
        },
        "ieee-light": "#F3F4F6", 
        "ieee-dark": "#00101F", 
        primary: colors.blue,
        secondary: colors.teal,
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-glow":
          "linear-gradient(90deg, rgba(51,153,204,1) 0%, rgba(0,102,153,1) 100%)",
      },
      boxShadow: {
        glow: "0 4px 20px rgba(51,153,204,0.5)", 
      },
      transitionProperty: {
        theme: "background-color, color, border-color, text-decoration-color, fill, stroke",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

module.exports = config;
