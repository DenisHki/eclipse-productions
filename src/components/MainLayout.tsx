import Home from "./Home";
import Contact from "./Contact";
import Services from "./Services";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Music from "./Music";

function MainLayout() {
  return (
    <main className="font-bodyFont w-full h-auto bg-bodyColor text-lightText">
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
