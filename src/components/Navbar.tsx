import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { logo } from "../assets";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navLinksdata = [
    { _id: 1001, title: t.nav.home, link: "home" },
    { _id: 1002, title: t.nav.services, link: "services" },
    { _id: 1003, title: t.nav.music, link: "music" },
    { _id: 1004, title: t.nav.contact, link: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        setShowNavbar(true);
        return;
      }

      if (currentScrollY < 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  useEffect(() => {
    const preventScroll = (e: TouchEvent | WheelEvent) => {
      e.preventDefault();
    };

    if (showMenu) {
      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("wheel", preventScroll, { passive: false });
    }

    return () => {
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("wheel", preventScroll);
    };
  }, [showMenu]);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  const handleBookNowClick = () => {
    setShowMenu(false);
    navigate("/booking");
  };

  return (
    <div
      className={`w-full h-24 fixed top-0 z-50 backdrop-blur-2xl transition-all duration-300 bg-bodyColor/70 mx-auto flex justify-between items-center font-titleFont border-b-[1px] border-b-gray-600 px-4 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className="flex items-center gap-6">
        {/* Desktop Navigation */}
        <ul className="hidden mdl:inline-flex items-center gap-6 lg:gap-10">
          {navLinksdata.map(({ _id, title, link }) => (
            <li
              className="text-font-lg font-normal text-text-designColor tracking-wide cursor-pointer group"
              key={_id}
            >
              <Link
                activeClass="active"
                to={link}
                spy={true}
                smooth={true}
                offset={-96}
                duration={500}
                className="relative group-hover:text-designColor"
              >
                {title}
                <span className="w-full h-[1px] bg-designColor absolute left-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Language Switcher - positioned on the right */}
        <div className="hidden mdl:block">
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <span
          onClick={handleMenuToggle}
          className="text-3xl mdl:hidden bg-black w-14 h-14 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer"
        >
          <FiMenu />
        </span>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="w-full h-[100dvh] mdl:hidden fixed inset-0 bg-bodyColor p-4 scrollbar-hide z-50 overflow-hidden">
            <div className="flex flex-col items-center justify-center gap-8 h-full text-center relative">
              <div className="flex flex-col items-center text-center">
                <img className="w-32" src={logo} alt="logo" />
              </div>

              {/* Mobile Language Switcher */}
              <LanguageSwitcher mobile={true} />

              <div className="flex flex-col gap-6 text-center max-h-[60vh] overflow-y-auto">
                <ul className="flex flex-col gap-6 text-center">
                  {navLinksdata.map((item) => (
                    <li
                      key={item._id}
                      className="text-xl mdl:text-base font-semibold text-gray-400 tracking-wide uppercase cursor-pointer hover:text-designColor duration-300"
                    >
                      <Link
                        onClick={handleMenuClose}
                        activeClass="active"
                        to={item.link}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  <li
                    className="text-xl mdl:text-base font-semibold text-gray-400 tracking-wide uppercase cursor-pointer hover:text-designColor duration-300"
                    onClick={handleBookNowClick}
                  >
                    {t.nav.bookNow}
                  </li>
                </ul>
              </div>
              <div className="flex justify-center gap-6 mt-6">
                <a
                  href="https://www.tiktok.com/@eclipse_productions_oy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-400 hover:text-designColor transition duration-300"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://www.instagram.com/eclipse_productions_oy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-400 hover:text-designColor transition duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.youtube.com/@EclipseProductionsOy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-400 hover:text-designColor transition duration-300"
                >
                  <FaYoutube />
                </a>
              </div>
              <span
                onClick={handleMenuClose}
                className="absolute top-4 right-4 text-designColor duration-300 text-4xl cursor-pointer"
              >
                <MdClose />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
