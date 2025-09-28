import { FadeIn } from "./FadeIn";

interface LeftBarProps {
  subtitle: string;
  title: string;
  description: string;
  className?: string;
}

const LeftBar = ({
  subtitle,
  title,
  description,
  className = "w-full lgl:w-1/2 flex flex-col gap-20",
}: LeftBarProps) => {
  return (
    <FadeIn className={className}>
      <div className="flex flex-col gap-5">
        <h4 className="text-lg font-normal text-designColor">{subtitle}</h4>
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">{title}</h1>
        <p className="text-xl font-bodyFont leading-relaxed tracking-wider text-gray-300">
          {description}
        </p>
      </div>
    </FadeIn>
  );
};

export default LeftBar;
