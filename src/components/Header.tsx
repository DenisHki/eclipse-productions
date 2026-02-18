import { logo } from "../assets";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full h-26 flex items-center justify-between px-4 bg-black mb-8">
      <img
        onClick={() => navigate("/")}
        title="Return to home page"
        src={logo}
        alt="Eclipse Productions Oy"
        className="h-26 w-auto cursor-pointer"
      />
      <LanguageSwitcher />
    </header>
  );
}
