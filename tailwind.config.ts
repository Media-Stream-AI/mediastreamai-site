// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── MOTHER EXO "dark cinematic" system ──
        // Near-black canvas + a cyan→iris→violet→magenta gradient spectrum,
        // with an ember accent reserved for MSAI Infrastructure / Defence.
        night: {
          DEFAULT: '#05060A', // page canvas
          900: '#070810',
          800: '#0B0E16', // raised panels
          700: '#0D1017',
          600: '#12151F', // cards
          500: '#1A1E2B', // hover / borders
        },
        cyan: {
          DEFAULT: '#22D3EE',
          bright: '#5EEAFF',
          deep: '#0EA5C4',
        },
        iris: '#6366F1',
        violet: '#A855F7',
        magenta: '#EC4899',
        ember: {
          DEFAULT: '#F59E0B', // MSAI infra / defence accent
          bright: '#FB923C',
          deep: '#EA580C',
        },
        mist: '#E7ECF3',   // primary text on night
        muted: '#94A3B8',  // secondary text
        hair: 'rgba(255,255,255,0.08)', // hairline borders

        // ── Legacy "Built Different" tokens kept intact so any page not yet
        //    re-skinned still compiles and renders its lime/ink billboard. ──
        brand: {
          DEFAULT: '#C6F833',
          bright: '#D8FF5E',
          deep: '#9BD600',
        },
        ink: '#0A0A0A',
        paper: '#F6F6F1',
        'deep-space': '#05060A',
        'neon-blue': '#22D3EE',
        'electric-blue': '#6366F1',
        'cyber-purple': '#A855F7',
        'success-green': '#34D399',
        'warning-orange': '#F59E0B',
        'warning-amber': '#F59E0B',
        'error-red': '#F43F5E',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        orbitron: ['var(--font-anton)', 'Impact', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'space-mono': ['var(--font-space-mono)', 'monospace'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // MOTHER EXO signature spectrum.
        'exo-spectrum': 'linear-gradient(100deg, #5EEAFF 0%, #22D3EE 22%, #6366F1 52%, #A855F7 78%, #EC4899 100%)',
        'exo-aurora': 'radial-gradient(60% 120% at 20% 0%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(60% 120% at 90% 10%, rgba(168,85,247,0.18), transparent 60%), radial-gradient(80% 120% at 50% 100%, rgba(236,72,153,0.12), transparent 60%)',
        'ember-spectrum': 'linear-gradient(100deg, #FB923C 0%, #F59E0B 50%, #EA580C 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        'sheen': 'sheen 3.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%)' },
          '60%, 100%': { transform: 'translateX(220%)' },
        },
      },
      boxShadow: {
        // Legacy chunky billboard shadows (kept for un-reskinned pages).
        'glow-blue': '6px 6px 0 0 #0A0A0A',
        'glow-purple': '6px 6px 0 0 #0A0A0A',
        'glow-green': '6px 6px 0 0 #9BD600',
        chunk: '6px 6px 0 0 #0A0A0A',
        // New soft neon glows for the dark system.
        'glow-cyan': '0 0 0 1px rgba(34,211,238,0.30), 0 8px 40px -8px rgba(34,211,238,0.45)',
        'glow-violet': '0 0 0 1px rgba(168,85,247,0.30), 0 8px 40px -8px rgba(168,85,247,0.45)',
        'glow-ember': '0 0 0 1px rgba(245,158,11,0.30), 0 8px 40px -8px rgba(245,158,11,0.45)',
        panel: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 60px -24px rgba(0,0,0,0.8)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
