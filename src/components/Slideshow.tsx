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
    }, 3000); 

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <div>No images found</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-64 sm:h-80 md:h-[28rem] lg:h-[36rem] xl:h-[40rem] object-cover object-center transition-opacity duration-1000 ease-in-out rounded-lg"
        style={{ objectPosition: "center 50%" }}
      />
    </div>
  );
};

export default Slideshow;
