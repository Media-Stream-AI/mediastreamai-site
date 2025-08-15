/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0ea5e9", // optional accent
          900: "#0b1220",
        },
      },
      boxShadow: {
        "card": "0 8px 30px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};