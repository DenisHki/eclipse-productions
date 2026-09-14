import { MdClose } from "react-icons/md";
import { useLanguage } from "../../i18n/LanguageContext";

interface TermsModalProps {
  onClose: () => void;
}

export default function TermsModal({ onClose }: TermsModalProps) {
  const { t } = useLanguage();
  const terms = t.booking.terms;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4">
      <div
        className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl border border-[#e1bd8f]/30 bg-[#111] shadow-2xl flex flex-col"
        style={{ boxShadow: "0 0 40px rgba(225,189,143,0.15)" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e1bd8f]/20 shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-[#e1bd8f] uppercase tracking-wider font-titleFont">
            {terms.modalTitle}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close terms"
            className="text-gray-400 hover:text-[#e1bd8f] transition-colors duration-200 text-2xl"
          >
            <MdClose />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-6 scrollbar-hide">
          {terms.sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-[#e1bd8f] font-semibold text-base uppercase tracking-wide mb-2 font-titleFont">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {section.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e1bd8f]/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="text-[#e1bd8f]/80 text-sm italic border-t border-[#e1bd8f]/20 pt-4">
            {terms.footer}
          </p>
        </div>

        <div className="px-6 py-4 border-t border-[#e1bd8f]/20 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#e1bd8f] text-black font-bold text-sm uppercase tracking-wider hover:bg-[#d4aa7a] transition-colors duration-200"
          >
            {terms.close}
          </button>
        </div>
      </div>
    </div>
  );
}
