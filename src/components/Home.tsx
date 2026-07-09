import LeftBar from "./LeftBar";
import hp1 from "../assets/images/hp1.jpg";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";
import {
  MdGraphicEq,
  MdSupportAgent,
  MdEventAvailable,
  MdAllInclusive,
} from "react-icons/md";

const Home = () => {
  const { t, language } = useLanguage();

  const highlightCards = [
    { icon: MdGraphicEq, data: t.home.highlights.room },
    { icon: MdSupportAgent, data: t.home.highlights.guidance },
    { icon: MdEventAvailable, data: t.home.highlights.scheduling },
    { icon: MdAllInclusive, data: t.home.highlights.allInOne },
  ];

  return (
    <>
      <Helmet>
        <title>{t.seo.home.title}</title>
        <meta name="description" content={t.seo.home.description} />
        <meta property="og:title" content={t.seo.home.ogTitle} />
        <meta property="og:description" content={t.seo.home.ogDescription} />
        <link
          rel="canonical"
          href={`https://eclipseproductions.fi/${language === "fi" ? "fi/" : ""}`}
        />
        <html lang={language} />
      </Helmet>
      <section className="w-full pt-6 pb-12 xs:pt-8 xs:pb-16 sm:pt-10 sm:pb-20 flex flex-col items-center border-b-[1px] font-titleFont border-b-gray-700">
        <LeftBar
          subtitle={t.home.subtitle}
          title={t.home.title}
          description={t.home.description}
          className="w-full max-w-2xl flex flex-col gap-8 xs:gap-10 items-center text-center"
        />

        <div className="w-full max-w-5xl mt-12 xs:mt-16 flex flex-col mdl:flex-row">
          {highlightCards.map(({ icon: Icon, data }, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center text-center gap-2.5 xs:gap-3 py-5 xs:py-6 mdl:py-0 px-4 mdl:px-6"
            >
              <Icon className="text-[#e1bd8f] text-2xl xs:text-3xl" />
              <h3 className="text-base xs:text-lg font-semibold text-gray-100">
                {data.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[15rem] mdl:max-w-none">
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full flex justify-center py-6 xs:py-8 sm:py-10">
        <img
          src={hp1}
          alt="Eclipse Productions music studio interior in Helsinki showing professional recording equipment"
          className="w-full max-w-7xl h-48 xs:h-64 sm:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,189,143,0.5)]"
        />
      </section>
    </>
  );
};

export default Home;
