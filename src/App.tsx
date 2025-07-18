import Home from "./components/Home";
import Contact from "./components/Contact";
import Feature from "./components/Services";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Music from "./components/Music";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);

      if (window.location.hash) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="font-bodyFont w-full h-auto bg-bodyColor text-lightText">
      <Navbar />
      <div className="px-4">
        <div className="max-w-screen-xl mx-auto">
          <Home />
          <Feature />
          <Music />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default App;
