import step1 from "../assets/images/booking_instruction/step1.png";
import step2 from "../assets/images/booking_instruction/step2.png";
import step3 from "../assets/images/booking_instruction/step3.png";

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
    title: "Enter Your Details",
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
        <h2 className="text-center text-black text-3xl font-titleFont font-bold mb-12">
          How to Book Your Studio
        </h2>
        <div className="grid grid-cols-1 sml:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-black text-black font-bold mb-3 text-lg">
                {index + 1}
              </div>
              <h3 className="text-black text-font-lg font-titleFont font-semibold mb-4">
                {step.title}
              </h3>
              {step.img && (
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain mb-4 rounded-lg shadow-md mx-auto transition-transform duration-300 hover:scale-105"
                />
              )}
              <p className="text-gray-700 text-font-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
