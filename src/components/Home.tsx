import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import { homepage } from "../assets";
import hp1 from "../assets/images/hp1.jpg";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Professional Music Studio Helsinki | Eclipse Productions</title>
        <meta
          name="description"
          content="Professional music studio in Helsinki equipped with Genelec monitors, professional microphones, and MIDI controllers. Book your recording session today."
        />
        <meta
          property="og:title"
          content="Professional Music Studio Helsinki | Eclipse Productions"
        />
        <meta
          property="og:description"
          content="Professional music studio in Helsinki equipped with Genelec monitors, professional microphones, and MIDI controllers."
        />
        <link rel="canonical" href="https://eclipseproductions.fi/" />
      </Helmet>
      <section
        id="home"
        className="w-full pt-6 pb-12 xs:pt-8 xs:pb-16 sm:pt-10 sm:pb-20 flex flex-col gap-6 xs:gap-8 sm:gap-10 xl:gap-0 lgl:flex-row items-center border-b-[1px] font-titleFont border-b-gray-700"
      >
        <LeftBar
          subtitle="WELCOME"
          title="The Home of Your Music"
          description="Discover your creativity in our premium equipped music studio. Equipped with pristine Genelec monitors and a powerful subwoofer, every nuance of your mix will come through with crystal clarity. A high performance audio interface and professional microphone setup ensure your recordings capture every detail, while our selection of MIDI controllers lets you bring your musical ideas to life."
          className="w-full lgl:w-1/2 flex flex-col gap-12 xs:gap-16 sm:gap-20"
        />
        <RightBar
          image={homepage}
          alt="Professional music studio in Helsinki with Genelec monitors and recording equipment"
          imgClassName="w-full max-w-[400px] xs:max-w-[450px] sm:max-w-[500px] h-[300px] xs:h-[400px] sm:h-[520px] object-cover rounded-xl shadow-2xl"
        />
      </section>

      <section className="w-full flex justify-center py-6 xs:py-8 sm:py-10">
        <img
          src={hp1}
          alt="Eclipse Productions music studio interior in Helsinki showing professional recording equipment"
          className="w-full max-w-7xl h-48 xs:h-64 sm:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,189,143,0.5)]"
        />
      </section>
    </>
  );
};

export default Home;
