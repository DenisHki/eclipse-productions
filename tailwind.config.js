/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bodyFont: ["Libra", "serif-modern"],
        titleFont: ["Libra", "serif-modern"],
      },
      fontSize: {
        "font-xs": "12px",
        "font-sm": "14px",
        "font-base": "16px",
        "font-lg": "22px",
      },
      screens: {
        xs: "320px", // Very small phones
        sm: "375px", // Small phones
        sml: "414px", // Medium phones
        md: "667px", // Large phones
        mdl: "768px", // Tablets
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      colors: {
        bodyColor: "#000000",
        lightText: "#c4cfde",
        formInputText: "#000000",
        boxBg: "linear-gradient(145deg, #1e2024, #23272b)",
        designColor: "#e1bd8f",
      },
      boxShadow: {
        shadowOne:
          "10px 10px 19px rgba(0, 0, 0, 0.7), -10px -10px 19px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(225, 189, 143, 0.6)",
      },
    },
  },
  plugins: [],
};
