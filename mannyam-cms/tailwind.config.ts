import type { Config } from "tailwindcss";

// Custom colour configuration matching the design system
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: "#3a4430",
        gold: "#b1832f",
        ivory: "#fcfcfa",
        cream: "#f4f3ec",
        paper: "#fffdf9",
        ink: "#22271d",
        sand: "#c39657",
      },
      fontFamily: {
        display: ["var(--font-cormorant-garamond)", "serif"],
        sans: ["var(--font-jost)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
