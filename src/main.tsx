import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
import "slick-carousel/slick/slick.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./i18n/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
