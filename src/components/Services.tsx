import Card from "./Card";
import Title from "./Title";
import Slider from "./Slider";
import { FadeIn } from "./FadeIn";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import {
  FaMusic,
  FaHeadphones,
  FaMicrophone,
  FaSlidersH,
  FaCompactDisc,
  FaBuilding,
} from "react-icons/fa";

const Services = () => {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <Title title="Services" des="What Do We Offer" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-20">
          <Card
            title="Composition"
            des="Transform your ideas into fully produced tracks with our expert music production services — including composing, recording, mixing, and mastering."
            price="€300 / track"
            icon={FaMusic}
          />
          <Card
            title="Track Production"
            des="Compose instrumental tracks collaboratively — excluding recording, mixing, and mastering."
            price="€100 / track"
            icon={FaHeadphones}
          />
          <Card
            title="Recording"
            des="Capture your sound with high-quality recording services in a professional studio environment. Recording of the vocals and podcasts."
            price="€30 / hour (min. 3 hrs)"
            icon={FaMicrophone}
          />
          <Card
            title="Mixing"
            des="Elevate your tracks with professional mixing services designed to bring your music to life."
            price="€100 / track"
            icon={FaSlidersH}
          />
          <Card
            title="Mastering"
            des="Our professional mastering services ensure your music sounds polished, balanced, and ready for any platform, from streaming to radio."
            price="€100 / track"
            icon={FaCompactDisc}
          />
          <Card
            title="Studio rent"
            des="Modern and stylish music studio that features high-quality equipment, soundproofing, and a comfortable, creative atmosphere."
            price="€27 / hour"
            icon={FaBuilding}
          />
        </div>
        <div className="flex justify-center mt-28 mb-28">
          <PrimaryButton onClick={() => navigate("/booking")}>
            Book a Studio
          </PrimaryButton>
        </div>

        <div className="mt-20">
          <h3 className="text-font-lg font-titleFont font-semibold text-lightText text-center mb-6">
            Studio Equipment Showcase
          </h3>
          <div className="w-16 h-[1px] bg-lightText opacity-30 mx-auto mb-6" />

          <Slider />
        </div>
      </FadeIn>
    </section>
  );
};

export default Services;
