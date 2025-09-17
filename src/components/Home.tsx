"use client";

import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import { homepage } from "../assets";
import hp1 from "../assets/images/hp1.jpeg";

const Home = () => {
  return (
    <>
      <section
        id="home"
        className="w-full pt-10 pb-20 flex flex-col gap-10 xl:gap-0 lgl:flex-row items-center border-b-[1px] font-titleFont border-b-gray-700"
      >
        <LeftBar
          subtitle="WELCOME"
          title="We are Eclipse Productions"
          description="Discover your creativity in our premium equipped music studio. Equipped with pristine Genelec monitors and a powerful subwoofer, every nuance of your mix will come through with crystal clarity. A high performance audio interface and professional microphone setup ensure your recordings capture every detail, while our selection of MIDI controllers lets you bring your musical ideas to life."
        />
        <RightBar
          image={homepage}
          alt="Studio Hero"
          imgClassName="w-[500px] h-[520px] object-cover rounded-xl shadow-2xl"
        />
      </section>

      <section className="w-full flex justify-center py-10">
        <img
          src={hp1}
          alt="Our Studio"
          className="w-full max-w-7xl h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,189,143,0.5)]"
        />
      </section>
    </>
  );
};

export default Home;
