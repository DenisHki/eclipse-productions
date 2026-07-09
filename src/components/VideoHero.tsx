import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import hp1 from "../assets/images/hp1.jpg";
import { homepage } from "../assets";
import { useLanguage } from "../i18n/LanguageContext";

const VIDEO_SRC =
  "https://denishki.github.io/eclipse-audio-host/studio_video.mp4";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-[100vh] max-h-[900px] min-h-[500px] overflow-hidden bg-black"
      aria-label="Eclipse Productions studio"
    >
      {!reduceMotion && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_SRC}
          poster={hp1}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {reduceMotion && (
        <img
          src={hp1}
          alt="Eclipse Productions music studio interior in Helsinki"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 font-titleFont">
        <span className="text-[#e1bd8f] text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-6">
          {t.home.heroTagline}
        </span>

        <img
          src={homepage}
          alt="Eclipse Productions"
          className="w-32 sm:w-48 lg:w-[28rem] mb-6 sm:mb-8"
        />

        <button
          onClick={() => navigate("/booking")}
          className="px-8 py-3 bg-[#e1bd8f] text-black rounded-full font-semibold text-sm sm:text-base uppercase tracking-wider hover:bg-[#d4aa7a] transition-colors shadow-lg"
        >
          {t.nav.bookNow}
        </button>
      </div>
    </section>
  );
}
