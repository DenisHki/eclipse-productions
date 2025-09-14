import Card from "./Card";
import Title from "./Title";
import Slideshow from "./Slider";
import { FadeIn } from "./FadeIn";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

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
            des="Transform your ideas into fully produced tracks with our professional music production services"
            price="300 € per track (full production: composing, recording, mixing, mastering)"
          />
          <Card
            title="Track Production"
            des="Composing instrumental track with artist without recording, mixing and mastering"
            price="100 € per track"
          />
          <Card
            title="Recording"
            des="Capture your sound with high-quality recording services in a professional studio environment. Recording of the vocals and podcasts"
            price="30 € per hour. Minimum 3 hours"
          />
          <Card
            title="Mixing"
            des="Elevate your tracks with professional mixing services designed to bring your music to life"
            price="100 € per track"
          />
          <Card
            title="Mastering"
            des="Our professional mastering services ensure your music sounds polished, balanced, and ready for any platform, from streaming to radio"
            price="40 € per track"
          />
          <Card
            title="Studio rent"
            des="Modern and stylish music studio that features high-quality equipment, soundproofing, and a comfortable, creative atmosphere"
            price="27 € per hour"
          />
        </div>

        <div className="flex justify-center mt-28 mb-28">
          <PrimaryButton onClick={() => navigate("/booking")}>
            Book a Studio
          </PrimaryButton>
        </div>
        <div className="mt-20">
          <Slideshow />
        </div>
      </FadeIn>
    </section>
  );
};

export default Services;
