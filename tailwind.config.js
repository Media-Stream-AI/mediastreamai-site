/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        horizon: ["var(--font-horizon)", "ui-sans-serif", "system-ui"],
        glacial: ["var(--font-glacial)", "Inter", "ui-sans-serif", "system-ui"],
      }
    },
  },
  plugins: [],
}
