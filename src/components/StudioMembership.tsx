import { FaCalendarAlt, FaCalendarCheck, FaKey, FaUsers } from "react-icons/fa";
import Title from "./Title";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "../i18n/LanguageContext";

const StudioMembership = () => {
  const { t } = useLanguage();
  const m = t.services.membership;

  return (
    <section
      id="membership"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <Title title={m.subtitle} des={m.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 mt-10">
          {[
            { icon: FaCalendarAlt, plan: m.plans.twoDays },
            { icon: FaCalendarCheck, plan: m.plans.threeDays },
          ].map(({ icon: Icon, plan }) => (
            <div
              key={plan.label}
              className="w-full px-8 py-10 rounded-lg shadow-shadowOne flex flex-col items-center gap-4 bg-gradient-to-r from-bodyColor to-[#202327] group hover:bg-gradient-to-b hover:from-black hover:to-[#1e2024] transition-colors duration-300"
            >
              <Icon className="text-designColor text-5xl" />
              <h3 className="text-xl uppercase md:text-2xl font-titleFont font-bold text-gray-300 text-center">
                {plan.label}
              </h3>
              <span className="text-2xl font-semibold text-designColor">
                {plan.price}{" "}
                <span className="text-base font-normal text-gray-400">
                  {plan.period}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-10 max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <FaKey className="text-designColor text-xl mt-1 shrink-0" />
            <p className="text-gray-400 text-lg leading-relaxed">
              {m.features[0]}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <FaUsers className="text-designColor text-xl mt-1 shrink-0" />
            <p className="text-gray-400 text-lg leading-relaxed">
              {m.features[1]}
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default StudioMembership;
