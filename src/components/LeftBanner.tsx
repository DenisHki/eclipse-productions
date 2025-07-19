import { FadeIn } from "./FadeIn";

const LeftBanner = () => {
  return (
    <FadeIn className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h4 className=" text-lg font-normal">WELCOME</h4>
        <h1 className="text-6xl font-bold text-designColor">
          We are Eclipse Productions
        </h1>
        <p className="text-xl font-bodyFont leading-10 tracking-wider">
          Discover your creativity in our premium equipped music studio, now
          available for rent. Equipped with pristine Genelec monitors and a
          powerful subwoofer, every nuance of your mix will come through with
          crystal clarity. A high performance audio interface and professional
          microphone setup ensure your recordings capture every detail, while
          our selection of MIDI controllers lets you bring your musical ideas to
          life with ease.
        </p>
      </div>
    </FadeIn>
  );
};

export default LeftBanner;