import Card from "./Card";
import Title from "./Title";
import { FadeIn } from "./FadeIn";

const Services = () => {
  return (
    <section
      id="services"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <Title title="Services" des="What Do We Offer" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-20">
          <Card
            title="Music Production"
            des="Here is description"
          />
          <Card
            title="Recording"
            des="Here is description"
          />
          <Card
            title="Mixing"
            des="Here is description"
          />
          <Card
            title="Mastering"
            des="Here is description"
          />
          <Card
            title="Studio rent"
            des="Here is description"
          />
        </div>
      </FadeIn>
    </section>
  );
};

export default Services;
