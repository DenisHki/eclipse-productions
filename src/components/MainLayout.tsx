import Home from "./Home";
import Contact from "./Contact";
import Services from "./Services";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Music from "./Music";
import { Helmet } from "react-helmet-async";

function MainLayout() {
  return (
    <main className="font-bodyFont w-full h-auto bg-bodyColor text-lightText">
      <Helmet>
        <title>Eclipse Productions Oy | Music Studio in Helsinki</title>
        <meta
          name="description"
          content="Eclipse Productions Oy offers professional recording, mixing, mastering, and studio rental in Helsinki. Affordable hourly rates and full production packages."
        />
        <link rel="canonical" href="https://eclipseproductions.fi/" />
        <meta
          name="keywords"
          content="music studio Helsinki, recording studio, mixing mastering, studio rental"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for social sharing */}
        <meta
          property="og:title"
          content="Eclipse Productions Oy | Music Studio in Helsinki"
        />
        <meta
          property="og:description"
          content="Professional recording, mixing, mastering, and studio rental in Helsinki"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eclipseproductions.fi/" />

        <html lang="en" />
      </Helmet>
      <Navbar />
      <div className="px-4 pt-24">
        <div className="max-w-screen-xl mx-auto">
          <Home />
          <Services />
          <Music />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default MainLayout;
