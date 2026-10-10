import { logo } from "../assets";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../i18n/LanguageContext";
import { HiArrowLeft} from "react-icons/hi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "./auth/AuthModal";

export default function Header() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };
  const openRegister = () => {
    setAuthMode("register");
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="w-full h-26 flex items-center justify-between px-4 bg-black mb-8">
        <div className="flex items-center gap-4">
          <img
            onClick={() => navigate("/")}
            title="Return to home page"
            src={logo}
            alt="Eclipse Productions Oy"
            className="h-26 w-auto cursor-pointer"
          />

          {/* Auth buttons after logo */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="hidden md:block text-sm mdl:text-base text-gray-400 truncate max-w-[150px] mdl:max-w-xs">
                  {user.email}
                </span>
                <button
                  onClick={() => logout()}
                  className="text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-white/40 px-4 py-2 rounded-lg transition whitespace-nowrap"
                >
                  {t.auth.logOut}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openLogin}
                  className="text-xs sm:text-sm mdl:text-base text-gray-300 hover:text-white border border-white/20 hover:border-white/40 px-2 sm:px-3 mdl:px-4 py-1 mdl:py-2 rounded-lg transition"
                >
                  <span className="hidden md:inline">{t.auth.logIn}</span>
                  <span className="md:hidden">{t.auth.logInShort}</span>
                </button>
                <button
                  onClick={openRegister}
                  className="text-xs sm:text-sm mdl:text-base text-black bg-white hover:bg-gray-200 px-2 sm:px-3 mdl:px-4 py-1 mdl:py-2 rounded-lg transition font-medium"
                >
                  <span className="hidden md:inline">{t.auth.register}</span>
                  <span className="md:hidden">{t.auth.registerShort}</span>
                </button>
              </>
            )}
          </div>
        </div>

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

      {showAuthModal && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}
