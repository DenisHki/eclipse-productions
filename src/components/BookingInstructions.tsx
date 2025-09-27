import { step1, step2, step3 } from "../assets/index.ts";

interface Step {
  img?: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    img: step1,
    title: "Pick Your Time",
    description:
      "Choose available time slot in the calendar by dragging over the time you want to book.",
  },
  {
    img: step2,
    title: "Preview & Book",
    description:
      'A pop-up window will show your selected time range — click "Book this slot" to continue.',
  },
  {
    img: step3,
    title: "Enter Details",
    description:
      'Fill in your name, contact info, and add notes if you have any wishes, then click "Confirm Booking".',
  },
  {
    title: "Confirmation & Access",
    description:
      "You’ll receive a confirmation email along with your invoice. Once payment is completed, we’ll open the studio with a mobile key for you.",
  },
];

export default function BookingInstructions() {
  return (
    <section className="mt-12 w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-10 tracking-tight">
          How to Book Your Studio
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
