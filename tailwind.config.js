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
        'nav-sm': '14px',  
        'nav-base': '18px',
        "nav-lg": "26px", 
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
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
        shadowOne: "10px 10px 19px rgba(0, 0, 0, 0.7), -10px -10px 19px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(225, 189, 143, 0.6)",
      }
      
    },
  },
  plugins: [],
};
