import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { logo } from "../assets";
import { navLinksdata } from "../constants";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      setShowMenu(true);
    }
  }, [isMobile]);
  return (
    <div className="w-full h-24 sticky top-0 z-50 backdrop-blur-2xl transition-colors bg-bodyColor/70 mx-auto flex justify-between items-center font-titleFont border-b-[1px] border-b-gray-600 px-4">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
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
                offset={-70}
                duration={500}
                className="relative group-hover:text-designColor"
              >
                {title}
                <span className="w-full h-[1px] bg-designColor absolute left-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>
        <span
          onClick={() => setShowMenu(!showMenu)}
          className="text-3xl mdl:hidden bg-black w-14 h-14 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer"
        >
          <FiMenu />
        </span>
        {showMenu && (
          <div className="w-full h-screen mdl:hidden overflow-scroll fixed top-0 left-0 bg-bodyColor p-4 scrollbar-hide z-50">
            <div className="flex flex-col gap-8 py-2 relative">
              <div className="flex flex-col items-center text-center">
                <img className="w-32" src={logo} alt="logo" />
              </div>
              <ul className="flex flex-col gap-6 text-center">
                {navLinksdata.map((item) => (
                  <li
                    key={item._id}
                    className="text-xl mdl:text-base font-semibold text-gray-400 tracking-wide uppercase cursor-pointer hover:text-designColor duration-300"
                  >
                    <Link
                      onClick={() => setShowMenu(false)}
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
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/booking");
                  }}
                >
                  Book Now
                </li>
              </ul>
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
                onClick={() => setShowMenu(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-designColor duration-300 text-4xl cursor-pointer"
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
