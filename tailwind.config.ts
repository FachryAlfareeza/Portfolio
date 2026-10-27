import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — from the Eja logo kit:
        // off-white #FDFDFD, sky blue #89CFF0, sandy orange #F4A261, black.
        // Light mode = blue on white; dark mode = orange on near-black.

        // --- Light mode roles ---
        paper: "#FDFDFD", // brand off-white, page background
        ink: "#0F1C2E", // deep navy text
        muted: "#5A6B7F", // muted slate-blue
        line: "#DCE6EF", // pale blue border
        panel: "#EDF3F9", // tag/card tint

        // Brand blue, used as the light-mode signature accent
        blue: {
          DEFAULT: "#89CFF0", // raw brand blue (fills, dots, highlights)
          strong: "#2176AE", // darkened for links/buttons/focus (contrast-safe)
          deep: "#18567F", // pressed/hover
        },

        // Brand orange, the dark-mode signature accent
        orange: {
          DEFAULT: "#F4A261", // raw brand orange
          strong: "#E07B39", // hover/pressed
        },

        // --- Dark mode surfaces (warm near-black) ---
        night: {
          900: "#0A0A0B", // page background
          800: "#161618", // raised panels/cards
          700: "#201E1C", // hero card / contact panel
          line: "#2A2724", // warm dark border
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
        // hero card hard offset shadow (pale blue in light mode)
        card: "18px 18px 0 #D6E6F2",
        dot: "0 0 0 4px #D6E9F5",
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
