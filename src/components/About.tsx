"use client";

import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import aboutImage from "../assets/images/aboutPicture.jpeg";

const About = () => {
  return (
    <section
      id="about"
      className="w-full pt-10 pb-20 flex flex-col gap-10 xl:gap-0 lgl:flex-row items-center border-b-[1px] font-titleFont border-b-gray-700"
    >
      <LeftBar
        subtitle="ABOUT"
        title="Reino Iuganson"
        description="Passionate mechanical engineer with a keen eye for detail and a love for product development. With many years of experience in mechanical engineering, I specialize in project management and developing timeless products."
      />
      <RightBar
        image={aboutImage}
        alt="About Us"
        //imgClassName="max-w-[400px] w-full h-auto object-cover rounded-lg shadow-md"
        //imgClassName="max-w-[400px] w-full h-auto object-cover rounded-xl border-[3px] border-designColor shadow-[0_10px_30px_-10px_rgba(225,189,143,0.6)]"
        imgClassName="max-w-[400px] w-full h-auto object-cover rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,189,143,0.5)]"

      />
    </section>
  );
};

export default About;
