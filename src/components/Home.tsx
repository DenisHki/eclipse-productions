import LeftBanner from "./LeftBanner";
import RightBanner from "./RightBanner";
import hp1 from "../assets/images/hp1.jpeg";

const Home = () => {
  return (
    <>
      <section
        id="home"
        className="w-full pt-10 pb-20 flex flex-col gap-10 xl:gap-0 lgl:flex-row items-center border-b-[1px] font-titleFont border-b-gray-700"
      >
        <LeftBanner />
        <RightBanner />
      </section>

      {/* New Studio Image Section */}
      <section className="w-full flex justify-center py-10">
        <img
          src={hp1}
          alt="Our Studio"
          className="w-full max-w-7xl h-80 object-cover rounded-lg shadow-lg"
          /* or w-full max-w-7xl h-[500px] object-cover rounded-lg shadow-lg */
        />
      </section>
    </>
  );
};

export default Home;
