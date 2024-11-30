import { FadeIn } from "./FadeIn";

const LeftBanner = () => {
  return (
    <FadeIn className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h4 className=" text-lg font-normal">WELCOME</h4>
        <h1 className="text-6xl font-bold text-designColor">
          Hi, We are Eclipse Productions
        </h1>
        <p className="text-base font-bodyFont leading-6 tracking-wider">
          We offer a range of expert services to help you create high-quality
          music and audio productions.
        </p>
      </div>
     
    </FadeIn>
  );
};

export default LeftBanner;
