interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-8 py-3 rounded-full border-2 border-designColor bg-black text-designColor font-bold text-xl shadow-md hover:shadow-lg hover:bg-designColor hover:text-black transition-all duration-300 transform hover:scale-105 ring-2 ring-designColor ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
