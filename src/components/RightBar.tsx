import { FadeIn } from "./FadeIn";

interface RightBarProps {
  image: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
}

const RightBar = ({
  image,
  alt = "Banner Image",
  className = "w-full lgl:w-1/2 flex justify-center items-center",
  imgClassName = "w-full h-auto object-cover rounded-lg shadow-lg",
}: RightBarProps) => {
  return (
    <FadeIn className={className}>
      <img src={image} alt={alt} className={imgClassName} />
    </FadeIn>
  );
};

export default RightBar;
