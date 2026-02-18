import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { Language } from "../i18n/translations";
import { FaChevronDown } from "react-icons/fa";

interface LanguageSwitcherProps {
  className?: string;
  mobile?: boolean;
}

export default function LanguageSwitcher({
  className = "",
  mobile = false,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const languages = [
    { code: "en" as Language, label: "English" },
    { code: "fi" as Language, label: "Suomi" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  // Mobile version - simple buttons
  if (mobile) {
    return (
      <div className={`flex gap-3 ${className}`}>
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            language === "en"
              ? "bg-designColor text-black"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("fi")}
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
            language === "fi"
              ? "bg-designColor text-black"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          FI
        </button>
      </div>
    );
  }

  // Desktop version - dropdown
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/30 hover:bg-black/50 transition-all duration-300 border border-gray-600 hover:border-designColor group"
        aria-label="Select language"
      >
        <span className="text-sm font-bold text-gray-300 group-hover:text-designColor transition-colors">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <FaChevronDown
          className={`text-xs text-gray-400 group-hover:text-designColor transition-all duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-black border border-gray-600 rounded-lg shadow-xl overflow-hidden z-50 animate-fadeIn">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 ${
                language === lang.code
                  ? "bg-designColor/20 text-designColor"
                  : "text-gray-300 hover:bg-gray-800 hover:text-designColor"
              }`}
            >
              <span className="text-sm font-medium">{lang.label}</span>
              {language === lang.code && (
                <span className="text-designColor text-sm font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
