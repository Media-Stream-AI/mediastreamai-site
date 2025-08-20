/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    'bg-[radial-gradient(80%_60%_at_50%_10%,rgba(120,180,255,0.12),transparent_60%)]'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Glacial Indifference", "ui-sans-serif", "system-ui", "sans-serif"],
        glacial: ["Glacial Indifference", "ui-sans-serif", "system-ui", "sans-serif"],
        horizon: ["Horizon", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        background: "#000000",
        neonCyan: "#00f0ff",
        neonPink: "#ff00ff",
        muted: "#cfd6e6",
        line: "rgba(255,255,255,0.08)",
        card: "rgba(255,255,255,0.03)"
      },
      boxShadow: {
        neon: "0 0 8px rgba(0,240,255,0.6), 0 0 16px rgba(255,0,255,0.45)"
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", textShadow: "0 0 12px #00f0ff, 0 0 20px #ff00ff" },
          "50%": { opacity: "0.75", textShadow: "0 0 8px #00f0ff, 0 0 14px #ff00ff" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
        float: "float 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};