import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
import "slick-carousel/slick/slick.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HelmetProvider } from "react-helmet-async";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
