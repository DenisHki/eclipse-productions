import Title from "./Title";
import Player from "./Player";

import { FadeIn } from "./FadeIn";

const Music = () => {
  return (
    <section
      id="music"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title title="Music" des="Our Projects" />
        </div>
        <Player />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14"></div>
      </FadeIn>
    </section>
  );
};

export default Music;
