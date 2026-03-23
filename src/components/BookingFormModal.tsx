import { useState } from "react";
import { format } from "date-fns";
import { PriceBreakdown } from "../utils/priceUtils";
import { useLanguage } from "../i18n/LanguageContext";
import { MdClose } from "react-icons/md";

interface BookingFormModalProps {
  selectedRange: { start: Date; end: Date };
  totalHours: number;
  totalPrice: number;
  priceBreakdown: PriceBreakdown;
  submitting: boolean;
  onSubmit: () => void;
  onClose: () => void;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
  needsEngineer: boolean;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setPhone: (val: string) => void;
  setEmail: (val: string) => void;
  setNotes: (val: string) => void;
  setNeedsEngineer: (val: boolean) => void;
  message: string | null;
}

// ─── Terms Modal ─────────────────────────────────────────────────────────────

function TermsModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const terms = t.booking.terms;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4">
      <div
        className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl border border-[#e1bd8f]/30 bg-[#111] shadow-2xl flex flex-col"
        style={{ boxShadow: "0 0 40px rgba(225,189,143,0.15)" }}
      >
        {/* Header */}
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

        {/* Scrollable content */}
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

          {/* Footer note */}
          <p className="text-[#e1bd8f]/80 text-sm italic border-t border-[#e1bd8f]/20 pt-4">
            {terms.footer}
          </p>
        </div>

        {/* Close button */}
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

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function BookingFormModal({
  selectedRange,
  totalHours,
  totalPrice,
  priceBreakdown,
  submitting,
  onSubmit,
  onClose,
  firstName,
  lastName,
  phone,
  email,
  notes,
  needsEngineer,
  setFirstName,
  setLastName,
  setPhone,
  setEmail,
  setNotes,
  setNeedsEngineer,
  message,
}: BookingFormModalProps) {
  const formatTime = (date: Date) => format(date, "HH:mm");
  const { t } = useLanguage();
  const terms = t.booking.terms;

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleSubmit = () => {
    if (!termsAccepted) {
      setShowTermsError(true);
      return;
    }
    setShowTermsError(false);
    onSubmit();
  };

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
    if (checked) setShowTermsError(false);
  };

  return (
    <>
      {/* Terms modal rendered above the booking modal */}
      {showTermsModal && (
        <TermsModal onClose={() => setShowTermsModal(false)} />
      )}

      <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg sm:max-w-md p-4 sm:p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900">
              {t.booking.form.bookingOn}{" "}
              {format(selectedRange.start, "dd.MM.yyyy")}
            </h3>

            {/* Price summary */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-2">
                {t.booking.form.time}:{" "}
                <strong>
                  {formatTime(selectedRange.start)} –{" "}
                  {formatTime(selectedRange.end)}
                </strong>
              </p>
              <p className="text-gray-700 mb-2">
                {t.booking.form.duration}: <strong>{totalHours}h</strong>
              </p>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <p className="text-gray-700 text-sm mb-1">
                  {t.booking.form.studioRental}:{" "}
                  <strong>{priceBreakdown.basePrice} €</strong>
                </p>
                {needsEngineer && (
                  <p className="text-gray-700 text-sm mb-1">
                    {t.booking.form.recordingEngineer}:{" "}
                    <strong>{priceBreakdown.engineerFee} €</strong>
                  </p>
                )}
                <p className="text-gray-900 font-semibold text-base mt-2">
                  {t.booking.form.total}:{" "}
                  <strong className="text-green-600">{totalPrice} €</strong>
                </p>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.booking.form.firstName}{" "}
                  <span className="text-red-500">
                    {t.booking.form.required}
                  </span>
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={t.booking.form.firstName}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.booking.form.lastName}{" "}
                  <span className="text-red-500">
                    {t.booking.form.required}
                  </span>
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={t.booking.form.lastName}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.booking.form.phone}{" "}
                  <span className="text-red-500">
                    {t.booking.form.required}
                  </span>
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.booking.form.phone}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.booking.form.email}{" "}
                  <span className="text-red-500">
                    {t.booking.form.required}
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.booking.form.email}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.booking.form.notes}{" "}
                  <span className="text-gray-400">
                    {t.booking.form.optional}
                  </span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.booking.form.notes}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              {/* Recording engineer */}
              <div className="col-span-2">
                <label className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={needsEngineer}
                    onChange={(e) => setNeedsEngineer(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className="block text-sm font-medium text-gray-900">
                      {t.booking.form.needsEngineer}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1">
                      {t.booking.form.engineerNote}
                    </span>
                  </div>
                </label>
              </div>

              {/* ── Terms & Conditions checkbox ── */}
              <div className="col-span-2">
                <label
                  className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    showTermsError
                      ? "border-red-400 bg-red-50"
                      : termsAccepted
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200 hover:border-[#e1bd8f]/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => handleTermsChange(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded focus:ring-2 focus:ring-[#e1bd8f] cursor-pointer accent-[#e1bd8f]"
                  />
                  <div className="flex-1 text-sm leading-relaxed">
                    <span className="text-gray-900">
                      {terms.checkboxLabel}{" "}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTermsModal(true);
                      }}
                      className="font-semibold underline underline-offset-2 text-[#b8975e] hover:text-[#e1bd8f] transition-colors duration-200"
                    >
                      {terms.linkLabel}
                    </button>
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                </label>

                {/* Inline error under checkbox */}
                {showTermsError && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium pl-1">
                    {terms.mustAccept}
                  </p>
                )}
              </div>
            </div>

            {/* Server message (booking success / overlap errors etc.) */}
            {message && (
              <div
                className={`mt-4 p-3 rounded-lg border shadow-sm text-sm ${
                  message.includes("⚠️") ||
                  message.toLowerCase().includes("overlap")
                    ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                    : message.toLowerCase().includes("failed") ||
                        message.toLowerCase().includes("error")
                      ? "bg-red-50 border-red-200 text-red-800"
                      : "bg-green-50 border-green-200 text-green-800"
                }`}
              >
                {message}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 font-semibold text-gray-900 rounded-full hover:bg-gray-400 transition-colors"
              >
                {t.booking.cancel}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting
                  ? t.booking.form.booking
                  : t.booking.form.confirmBooking}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
