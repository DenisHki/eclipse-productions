import { IconType } from "react-icons";

interface Props {
  title: string;
  des: string;
  price: string;
  icon: IconType;
}

const Card = ({ title, des, price, icon: Icon }: Props) => {
  return (
    <div className="w-full min-h-[320px] px-8 py-10 rounded-lg shadow-shadowOne flex items-start bg-gradient-to-r from-bodyColor to-[#202327] group hover:bg-gradient-to-b hover:from-black hover:to-[#1e2024] transition-colors duration-300">
      <div className="flex flex-col items-center gap-6 transform transition-transform duration-500 group-hover:-translate-y-2">
        <Icon className="text-designColor text-5xl" />
        <h2 className="text-xl uppercase md:text-2xl font-titleFont font-bold text-gray-300 text-center">
          {title}
        </h2>
        <span className="text-xl font-semibold text-designColor">{price}</span>
        <div className="w-10 h-[1px] bg-designColor opacity-40" />
        <p className="text-gray-400 text-lg leading-relaxed text-center">
          {des}
        </p>
      </div>
    </div>
  );
};

export default Card;
