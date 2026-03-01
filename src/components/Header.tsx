import { logo } from "../assets";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../i18n/LanguageContext";
import { HiArrowLeft } from "react-icons/hi";

export default function Header() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <header className="w-full h-26 flex items-center justify-between px-4 bg-black mb-8">
      <img
        onClick={() => navigate("/")}
        title="Return to home page"
        src={logo}
        alt="Eclipse Productions Oy"
        className="h-26 w-auto cursor-pointer"
      />
      <div className="flex items-center gap-6 lg:gap-10">
        <ul className="hidden mdl:inline-flex items-center gap-6 lg:gap-10 list-none">
          <li className="text-font-lg font-normal tracking-wide cursor-pointer group font-titleFont">
            <button
              onClick={() => navigate("/")}
              className="relative group-hover:text-designColor text-lightText flex items-center gap-2"
            >
              <HiArrowLeft className="text-lightText text-lg transition-colors duration-300 group-hover:text-designColor group-hover:-translate-x-1" />{" "}
              {t.nav.backHome}
              <span className="w-full h-[1px] bg-designColor absolute left-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </button>
          </li>
        </ul>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
