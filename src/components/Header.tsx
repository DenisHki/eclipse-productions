import { logo } from "../assets";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full h-24 flex items-center justify-start px-8 bg-black mb-8">
      <img
        onClick={() => navigate("/")}
        title="Return to home page"
        src={logo}
        alt="Eclipse Productions Oy"
        className="h-24 w-auto"
      />
    </header>
  );
}
