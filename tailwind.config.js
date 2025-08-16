/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}" // keep if you might move code under src/
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Horizon", "ui-sans-serif", "system-ui", "sans-serif"],
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
          "0%, 100%": { opacity: 1, textShadow: "0 0 12px #00f0ff, 0 0 20px #ff00ff" },
          "50%": { opacity: 0.75, textShadow: "0 0 8px #00f0ff, 0 0 14px #ff00ff" }
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