import Card from "./Card";
import Title from "./Title";
import Slider from "./Slider";
import { FadeIn } from "./FadeIn";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import {
  FaMusic,
  FaHeadphones,
  FaMicrophone,
  FaSlidersH,
  FaCompactDisc,
  FaBuilding,
} from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";

const Services = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <Title title={t.services.title} des={t.services.subtitle} />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 xl:gap-20">
          <Card
            title={t.services.cards.composition.title}
            des={t.services.cards.composition.description}
            price={t.services.cards.composition.price}
            icon={FaMusic}
          />
          <Card
            title={t.services.cards.trackProduction.title}
            des={t.services.cards.trackProduction.description}
            price={t.services.cards.trackProduction.price}
            icon={FaHeadphones}
          />
          <Card
            title={t.services.cards.recording.title}
            des={t.services.cards.recording.description}
            price={t.services.cards.recording.price}
            icon={FaMicrophone}
          />
          <Card
            title={t.services.cards.mixing.title}
            des={t.services.cards.mixing.description}
            price={t.services.cards.mixing.price}
            icon={FaSlidersH}
          />
          <Card
            title={t.services.cards.mastering.title}
            des={t.services.cards.mastering.description}
            price={t.services.cards.mastering.price}
            icon={FaCompactDisc}
          />
          <Card
            title={t.services.cards.studioRent.title}
            des={
              <>
                {t.services.cards.studioRent.description}{" "}
                <span className="text-designColor font-semibold">
                  {t.services.cards.studioRent.memberships}
                </span>{" "}
                {t.services.cards.studioRent.descriptionEnd}
              </>
            }
            price={t.services.cards.studioRent.price}
            icon={FaBuilding}
          />
        </div>
        <div className="flex justify-center mt-28 mb-28">
          <PrimaryButton onClick={() => navigate("/booking")}>
            {t.services.bookButton}
          </PrimaryButton>
        </div>

        <div className="mt-20">
          <h3 className="text-font-lg font-titleFont font-semibold text-lightText text-center mb-6">
            {t.services.equipmentTitle}
          </h3>
          <div className="w-16 h-[1px] bg-lightText opacity-30 mx-auto mb-6" />

          <Slider />
        </div>
      </FadeIn>
    </section>
  );
};

export default Services;
