import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FF6F3C",
          dark: "#2B2A4C",
          light: "#F4EDE2"
        }
      }
    }
  },
  plugins: []
};

export default config;
