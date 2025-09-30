import { useState } from "react";
import {
  apollo,
  behringer,
  genc,
  genelec,
  headphones,
  macMini,
  akg,
  rode,
  midi,
  traktor,
} from "../assets/index.ts";


const images = [
  { src: apollo, title: "Apollo Twin X Duo Gen2 Audio Interface" },
  { src: behringer, title: "Behringer model D Analog Synthesizer" },
  { src: genc, title: "Genelec Speakers 8351B" },
  { src: genelec, title: "Genelec Subwoofer 7360A" },
  { src: headphones, title: "Headphones Beyerdynamic DT 770 PRO 80 ohm" },
  {
    src: macMini,
    title: "Mac mini M4 24 GB RAM 512 Gt + Magic Keyboard and Mouse",
  },
  { src: akg, title: "Microphone Akg c414 CLII" },
  { src: rode, title: "Microphone Rode NT1" },
  {
    src: midi,
    title: "MIDI Controllers Maschine MK3 + Komplete Kontrol S61 MK2",
  },
  { src: traktor, title: "Traktor Kontrol S2 MK2 DJ Controller" },
];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (images.length === 0) {
    return <div>No images found</div>;
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg h-64 sm:h-80 md:h-[28rem] lg:h-[36rem] xl:h-[40rem] flex flex-col items-center">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.title}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100 blur-0 z-10 pointer-events-auto"
                : "opacity-0 scale-105 blur-sm z-0 pointer-events-none"
            }`}
          />
        ))}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full text-2xl z-20 transition duration-300"
        >
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full text-2xl z-20 transition duration-300"
        >
          &#10095;
        </button>
      </div>
      <p className="mt-4 text-font-base font-bodyFont text-lightText text-center">
        {images[currentIndex].title}
      </p>
    </div>
  );
};

export default Slider;
