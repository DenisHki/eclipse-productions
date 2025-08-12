import { useState } from "react";

const Slider: React.FC = () => {
  const imagesModules = import.meta.glob<{ default: string }>(
    "../assets/images/slider/*.{jpg,jpeg,png}",
    { eager: true }
  );

  const images = Object.values(imagesModules).map((img) => {
    const src = img.default;
    const name = src.split("/").pop()?.split(".")[0] || "Untitled";
    return { src, name };
  });

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
            alt={image.name}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out rounded-lg ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 
             bg-black bg-opacity-50 text-white p-4 rounded-full text-3xl"
        >
          &#10094;
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 
             bg-black bg-opacity-50 text-white p-4 rounded-full text-3xl"
        >
          &#10095;
        </button>
      </div>
      <p className="mt-4 text-lg font-semibold">{images[currentIndex].name}</p>
    </div>
  );
};

export default Slider;
