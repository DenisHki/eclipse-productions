import LeftBar from "./LeftBar";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";

const Home = () => {
  const { t, language } = useLanguage();

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
      <section className="w-full pt-6 pb-12 xs:pt-8 xs:pb-16 sm:pt-10 sm:pb-20 flex flex-col gap-6 xs:gap-8 sm:gap-10 xl:gap-0 lgl:flex-row items-center border-b-[1px] font-titleFont border-b-gray-700">
        <LeftBar
          subtitle={t.home.subtitle}
          title={t.home.title}
          description={t.home.description}
          className="w-full lgl:w-1/2 flex flex-col gap-12 xs:gap-16 sm:gap-20"
        />
      </section>
    </>
  );
};

export default Home;
