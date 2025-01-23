// eslint-disable-next-line no-undef
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "ieee-blue": "#006699",
        "ieee-dark": "#00101F",
        primary: colors.blue,
        secondary: colors.teal,
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      animation: {
        "circuit-flow": "circuit 3s linear infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        circuit: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/typography"),
    // eslint-disable-next-line no-undef
    require("@tailwindcss/forms"),
    // eslint-disable-next-line no-undef
    require("@tailwindcss/aspect-ratio"),
  ],
}

// eslint-disable-next-line no-undef
module.exports = config

