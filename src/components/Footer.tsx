import { logo } from "../assets";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "../i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <FadeIn className="w-full py-20 h-auto border-b-[1px] border-b-black flex flex-col items-center text-center gap-12 md:grid md:grid-cols-2 lgl:grid-cols-4 md:text-left md:items-start md:gap-8">
      {" "}
      <div className="w-full h-full flex flex-col items-center md:items-start text-center md:text-left gap-8">
        <img className="w-32" src={logo} alt="Company Logo" />
      </div>
      <div className="w-full h-full">
        <h3 className="text-xl uppercase text-designColor tracking-wider">
          {t.footer.contacts}
        </h3>
        <ul className="flex flex-col gap-4 font-titleFont font-medium py-6 overflow-hidden">
          <li>
            <a
              href="mailto:info@eclipseproductions.fi"
              className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer"
            >
              info@eclipseproductions.fi
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 opacity-0 group-hover:opacity-100 translate-x-0 transition-all duration-300"></span>
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full h-full">
        <h3 className="text-xl uppercase text-designColor tracking-wider">
          {t.footer.media}
        </h3>
        <ul className="flex flex-col gap-4 font-titleFont font-medium py-6 overflow-hidden">
          <li>
            <a
              href="https://www.instagram.com/eclipse_productions_oy/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer"
            >
              Instagram
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 opacity-0 group-hover:opacity-100 translate-x-0 transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@eclipse_productions_oy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer"
            >
              TikTok
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 opacity-0 group-hover:opacity-100 translate-x-0 transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@EclipseProductionsOy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-lg relative hover:text-designColor duration-300 group cursor-pointer"
            >
              Youtube
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 opacity-0 group-hover:opacity-100 translate-x-0 transition-all duration-300"></span>
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full h-full">
        <h3 className="text-xl uppercase text-designColor tracking-wider">
          {t.footer.location}
        </h3>
        <ul className="flex flex-col gap-4 font-titleFont font-medium overflow-hidden py-6">
          <li>
            <span className="w-full text-lg relative">
              {t.footer.address.street} <br /> {t.footer.address.postal} <br />{" "}
              {t.footer.address.city}
              <span className="w-full h-[1px] bg-designColor inline-flex absolute left-0 -bottom-1 opacity-0 group-hover:opacity-100 translate-x-0 transition-all duration-300"></span>
            </span>
          </li>
        </ul>
      </div>
    </FadeIn>
  );
};

export default Footer;
