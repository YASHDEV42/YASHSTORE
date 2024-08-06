const config = {
  theme: {
    extend: {
      animation: {
        rightToLift: "rightToLift 0.6s ease forwards",
      },
      keyframes: {
        rightToLift: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
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
