import { logo } from "../assets";

export default function Header() {
  return (
    <header className="w-full h-24 flex items-center justify-start px-8 bg-black mb-8">
      <img src={logo} alt="Eclipse Productions Oy" className="h-24 w-auto" />
    </header>
  );
}