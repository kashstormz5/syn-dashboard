import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        panel: {
          950: "#0a0d18",
          900: "#101525",
          850: "#151b2f",
          800: "#1b233b",
          700: "#24304e"
        },
        syn: {
          500: "#5b7cff",
          400: "#7c98ff",
          300: "#99afff",
          200: "#becaff"
        }
      },
      boxShadow: {
        panel: "0 18px 50px rgba(3, 8, 20, 0.45)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};

export default config;
