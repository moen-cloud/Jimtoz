/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mustard: {
          50: "#FDF8E9",
          100: "#FAEEC8",
          200: "#F4DC8F",
          300: "#EDC756",
          400: "#E3B22E",
          500: "#D4A017", // primary mustard
          600: "#B3830F",
          700: "#8C650E",
          800: "#6B4D10",
          900: "#4F3A10",
        },
        cocoa: {
          50: "#F6EFE9",
          100: "#E9D8C9",
          200: "#D1B296",
          300: "#B08A66",
          400: "#8A6644",
          500: "#6B4423", // secondary brown
          600: "#54331A",
          700: "#3E2723", // deep chocolate — primary dark
          800: "#2B1B12",
          900: "#1C110B",
        },
        cream: {
          DEFAULT: "#FFF8ED",
          dark: "#F7EEDD",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      borderRadius: {
        blob: "63% 37% 54% 46% / 55% 48% 52% 45%",
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(43, 27, 18, 0.25)",
        card: "0 8px 24px -8px rgba(107, 68, 35, 0.22)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
