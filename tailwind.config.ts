import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        deck: {
          blue: "#2b4fff",
          "blue-dark": "#1a36db",
          "blue-deep": "#10239e",
          "blue-light": "#617bff",
          peach: "#fed7aa",
          blush: "#ffedd5",
          sand: "#fdf6ed",
          cream: "#fffbf7",
          dark: "#0b0f19",
          slate: "#131b2e",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Plus Jakarta Sans",
          "Noto Sans Devanagari",
          "Noto Sans",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
