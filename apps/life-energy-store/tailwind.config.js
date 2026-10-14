/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#facc15", dark: "#a16207", soft: "#fefce8" },
        ink: "#111827",
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"], display: ["Manrope", "Inter", "sans-serif"] },
    },
  },
};
