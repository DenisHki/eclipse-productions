import Home from "./components/Home";
import Contact from "./components/Contact";
import Feature from "./components/Services";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Music from "./components/Music"



function App() {
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
