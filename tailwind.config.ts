import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ported 1:1 from legacy styles.css :root tokens
        paper: "#f6f7f4",
        ink: "#1c2924",
        muted: "#68736d",
        line: "#dce2dc",
        green: {
          DEFAULT: "#176b4b",
          deep: "#10573c",
        },
        lime: {
          DEFAULT: "#d6ef9d",
          soft: "#e2f5b5",
        },
        panel: "#edf1eb",
        // Dark panel tones used by the hero card and contact section
        forest: {
          900: "#1e352a",
          800: "#20362c",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Arial", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      fontSize: {
        // micro label size used across eyebrows, section labels, kickers
        micro: ["10px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      letterSpacing: {
        tightest: "-0.065em",
        tighter2: "-0.055em",
      },
      boxShadow: {
        // hero card hard offset shadow
        card: "18px 18px 0 #e7ebdf",
        dot: "0 0 0 4px #e2efdf",
      },
      borderRadius: {
        xs: "2px",
        sm2: "3px",
      },
      maxWidth: {
        container: "1100px",
      },
      keyframes: {
        reveal: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        reveal: "reveal 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
