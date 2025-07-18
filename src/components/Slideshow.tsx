import { useState, useEffect } from "react";

const Slideshow: React.FC = () => {
  const imagesModules = import.meta.glob<{ default: string }>(
    "../assets/images/slideshow/*.{jpg,jpeg,png}",
    { eager: true }
  );

  const images: string[] = Object.values(imagesModules).map(
    (img) => img.default
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <div>No images found</div>;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg h-64 sm:h-80 md:h-[28rem] lg:h-[36rem] xl:h-[40rem]">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out rounded-lg ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: "center 50%" }}
        />
      ))}
    </div>
  );
};

export default Slideshow;
