import { step1, step2, step3 } from "../assets/index.ts";
import { useLanguage } from "../i18n/LanguageContext";

interface Step {
  img?: string;
  title: string;
  description: string;
}

export default function BookingInstructions() {
  const { t } = useLanguage();

  const steps: Step[] = [
    {
      img: step1,
      title: t.booking.instructions.steps[0].title,
      description: t.booking.instructions.steps[0].description,
    },
    {
      img: step2,
      title: t.booking.instructions.steps[1].title,
      description: t.booking.instructions.steps[1].description,
    },
    {
      img: step3,
      title: t.booking.instructions.steps[2].title,
      description: t.booking.instructions.steps[2].description,
    },
    {
      title: t.booking.instructions.steps[3].title,
      description: t.booking.instructions.steps[3].description,
    },
  ];

  return (
    <section className="mt-12 w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-10 tracking-tight">
          {t.booking.instructions.title}
        </h2>
        <div className="grid grid-cols-1 sml:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="text-5xl font-extrabold text-black opacity-80 mb-4 group-hover:opacity-100 transition">
                {index + 1}
              </div>
              <h3 className="uppercase tracking-wide text-xl font-bold text-black mb-3">
                {step.title}
              </h3>
              {step.img && (
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full max-w-xs object-contain mb-4 grayscale hover:grayscale-0 transition duration-300 rounded-lg"
                />
              )}
              <p className="text-gray-800 text-base leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
