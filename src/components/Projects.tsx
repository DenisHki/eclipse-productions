import Title from "./Title";

import { FadeIn } from "./FadeIn";

const Music = () => {
  return (
    <section
      id="projects"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title
            title="Our Projects"
            des="Our Projects"
          />
        </div>
        <p>The music player is comming here</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
        </div>
      </FadeIn>
    </section>
  );
};

export default Music;
