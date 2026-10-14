/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#f97316", dark: "#c2410c", soft: "#fff7ed" },
        ink: "#111827",
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"], display: ["Manrope", "Inter", "sans-serif"] },
    },
  },
};
