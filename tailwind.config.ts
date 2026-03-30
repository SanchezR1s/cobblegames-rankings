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
          DEFAULT: "#06060b",
          card: "#0d0d18",
          elevated: "#12121f",
          border: "#1e1e35",
          hover: "#16162a",
        },
        accent: {
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          pink: "#ec4899",
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
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.15), transparent)",
        "card-glow": "radial-gradient(ellipse at top, rgba(139,92,246,0.05), transparent 60%)",
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
          "0%, 100%": { boxShadow: "0 0 20px rgba(139,92,246,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(139,92,246,0.4)" },
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
