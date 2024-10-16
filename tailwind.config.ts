//#CCD0cf #9ba8ab #4a5c6a #253745 #11212d #06141b
const colors = require("tailwindcss/colors");

const config = {
  theme: {
    extend: {
      colors: {
        gold: {
          lightest: "#FFF9F5",
          light: "#FFF4EB",
          DEFAULT: "#FFD6A5",
          middle: "#FFEBCC",
          dark: "#E6B381",
          darker: "#C2945D",
        },
      },
      animation: {
        rightToLift: "rightToLift 0.6s ease forwards",
        wave: "wave 10s linear infinite",
        arrowFloating: "arrowFloating 1.5s linear infinite",
        arrowAppear: "arrowAppear 1s ease forwards",
        sideMenuAppear: "sideMenuAppear .5s ease forwards",
      },
      keyframes: {
        rightToLift: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        wave: {
          "0%": { transform: "initial" },
          "50%": { transform: "translateX(-100%)" },
          "100%": { transform: "initial" },
        },
        arrowFloating: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-10px)" },
          "100%": { transform: "translateX(0)" },
        },
        arrowAppear: {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        sideMenuAppear: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [],
};

export default config;
