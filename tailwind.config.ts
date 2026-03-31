import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0a",
          card: "#111111",
          elevated: "#161616",
          border: "#1e1e1e",
          hover: "#1a1a1a",
        },
        accent: {
          purple: "#00d4e8",
          cyan: "#00d4e8",
          pink: "#00d4e8",
        },
        tier: {
          unranked: "#6b7280",
          bronze: "#cd7f32",
          silver: "#94a3b8",
          gold: "#f59e0b",
          platinum: "#2dd4bf",
          diamond: "#818cf8",
          champion: "#f43f5e",
          mythic: "#a855f7",
        },
        rank: {
          first: "#f59e0b",
          second: "#94a3b8",
          third: "#cd7f32",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,212,232,0.10), transparent)",
        "card-glow": "radial-gradient(ellipse at top, rgba(0,212,232,0.04), transparent 60%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "shimmer": "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,232,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0,212,232,0.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
