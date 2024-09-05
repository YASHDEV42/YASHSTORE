//#CCD0cf #9ba8ab #4a5c6a #253745 #11212d #06141b
const colors = require("tailwindcss/colors");

const config = {
  theme: {
    // colors: {
    //   "1": "#CCD0cf",
    //   "2": "#9ba8ab",
    //   "3": "#4a5c6a",
    //   "4": "#253745",
    //   "5": "#11212d",
    //   "6": "#06141b",
    // },
    extend: {
      animation: {
        rightToLift: "rightToLift 0.6s ease forwards",
        wave: "wave 10s linear infinite",
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
