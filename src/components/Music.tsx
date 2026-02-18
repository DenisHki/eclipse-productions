import Title from "./Title";
import Player from "./Player";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "../i18n/LanguageContext";

const Music = () => {
  const { t } = useLanguage();

  return (
    <section
      id="music"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title title={t.music.title} des={t.music.subtitle} />
        </div>
        <Player />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14"></div>
      </FadeIn>
    </section>
  );
};

export default Music;
