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
        <h1 className="whitespace-nowrap text-[clamp(1.5rem,5.2vw,3.75rem)] font-bold leading-tight text-white lgl:text-[clamp(1.5rem,3.4vw,3.75rem)]">
          {title}
        </h1>
        <p className="description-text text-xl font-bodyFont leading-relaxed tracking-wider text-gray-300">
          {description}
        </p>
      </div>
    </FadeIn>
  );
};

export default LeftBar;
