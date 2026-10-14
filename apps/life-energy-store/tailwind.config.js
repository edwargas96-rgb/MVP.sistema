/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#FACC15", dark: "#EAB308", soft: "#1c1a0b" },
        ink: "#0b0b0c",
        plate: "#151517",
        steel: "#26262a",
        bone: "#f4f4f0",
        alert: "#ff3b30",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Barlow Condensed", "Impact", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      keyframes: { fill: { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } } },
      animation: { fill: "fill 6s linear forwards" },
    },
  },
};
