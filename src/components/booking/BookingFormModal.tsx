import { useState, useEffect } from "react";
import { format } from "date-fns";
import { PriceBreakdown } from "../../utils/priceUtils";
import { useLanguage } from "../../i18n/LanguageContext";
import { BookingFormData } from "../../types/booking";
import StatusMessage from "../shared/StatusMessage";
import TermsModal from "./TermsModal";

interface BookingFormModalProps {
  selectedRange: { start: Date; end: Date };
  totalHours: number;
  totalPrice: number;
  priceBreakdown: PriceBreakdown;
  submitting: boolean;
  formData: BookingFormData;
  setFormData: (data: BookingFormData) => void;
  onSubmit: (termsAccepted: boolean) => void;
  onClose: () => void;
  message: string | null;
}

export default function BookingFormModal({
  selectedRange,
  totalHours,
  totalPrice,
  priceBreakdown,
  submitting,
  formData,
  setFormData,
  onSubmit,
  onClose,
  message,
}: BookingFormModalProps) {
  const formatTime = (date: Date) => format(date, "HH:mm");
  const { t } = useLanguage();
  const terms = t.booking.terms;

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const updateField = <K extends keyof BookingFormData>(
    key: K,
    value: BookingFormData[K],
  ) => setFormData({ ...formData, [key]: value });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setShowTermsError(true);
      return;
    }
    setShowTermsError(false);
    onSubmit(termsAccepted);
  };

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
    if (checked) setShowTermsError(false);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30";
  const labelClass = "block text-sm text-gray-400 mb-1";

  return (
    <>
      {showTermsModal && (
        <TermsModal onClose={() => setShowTermsModal(false)} />
      )}

      <div
        className="fixed inset-0 z-50 bg-black/70 overflow-y-auto"
        onClick={onClose}
      >
        <div className="min-h-full flex items-start sm:items-center justify-center p-4 py-8 sm:p-6">
          <div
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg sm:max-w-md p-4 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2 text-white">
              {t.booking.form.bookingOn}{" "}
              {format(selectedRange.start, "dd.MM.yyyy")}
            </h3>

            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-gray-300 mb-2">
                {t.booking.form.time}:{" "}
                <strong className="text-white">
                  {formatTime(selectedRange.start)} –{" "}
                  {formatTime(selectedRange.end)}
                </strong>
              </p>
              <p className="text-gray-300 mb-2">
                {t.booking.form.duration}:{" "}
                <strong className="text-white">{totalHours}h</strong>
              </p>
              <div className="border-t border-white/10 pt-2 mt-2">
                <p className="text-gray-400 text-sm mb-1">
                  {t.booking.form.studioRental}:{" "}
                  <strong className="text-gray-200">
                    {priceBreakdown.basePrice} €
                  </strong>
                </p>
                {formData.needsEngineer && (
                  <p className="text-gray-400 text-sm mb-1">
                    {t.booking.form.recordingEngineer}:{" "}
                    <strong className="text-gray-200">
                      {priceBreakdown.engineerFee} €
                    </strong>
                  </p>
                )}
                <p className="text-white font-semibold text-base mt-2">
                  {t.booking.form.total}:{" "}
                  <strong className="text-[#e1bd8f]">{totalPrice} €</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="col-span-1">
                  <label className={labelClass}>
                    {t.booking.form.firstName}{" "}
                    <span className="text-red-400">
                      {t.booking.form.required}
                    </span>
                  </label>
                  <input
                    required
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder={t.booking.form.firstName}
                    className={inputClass}
                  />
                </div>

                <div className="col-span-1">
                  <label className={labelClass}>
                    {t.booking.form.lastName}{" "}
                    <span className="text-red-400">
                      {t.booking.form.required}
                    </span>
                  </label>
                  <input
                    required
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder={t.booking.form.lastName}
                    className={inputClass}
                  />
                </div>

                <div className="col-span-2">
                  <label className={labelClass}>
                    {t.booking.form.phone}{" "}
                    <span className="text-red-400">
                      {t.booking.form.required}
                    </span>
                  </label>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder={t.booking.form.phone}
                    className={inputClass}
                  />
                </div>

                <div className="col-span-2">
                  <label className={labelClass}>
                    {t.booking.form.notes}{" "}
                    <span className="text-gray-500">
                      {t.booking.form.optional}
                    </span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder={t.booking.form.notes}
                    className={inputClass}
                    rows={3}
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-start gap-3 p-3 border-2 border-white/10 rounded-lg cursor-pointer hover:border-white/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.needsEngineer}
                      onChange={(e) =>
                        updateField("needsEngineer", e.target.checked)
                      }
                      className="mt-1 w-5 h-5 cursor-pointer accent-white"
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-medium text-white">
                        {t.booking.form.needsEngineer}
                      </span>
                      <span className="block text-xs text-gray-500 mt-1">
                        {t.booking.form.engineerNote}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="col-span-2">
                  <label
                    className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      showTermsError
                        ? "border-red-500 bg-red-500/10"
                        : termsAccepted
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-white/10 hover:border-[#e1bd8f]/60"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => handleTermsChange(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded cursor-pointer accent-[#e1bd8f]"
                    />
                    <div className="flex-1 text-sm leading-relaxed">
                      <span className="text-gray-300">
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
                      <span className="text-red-400 ml-1">*</span>
                    </div>
                  </label>

                  {showTermsError && (
                    <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">
                      {terms.mustAccept}
                    </p>
                  )}
                </div>
              </div>

              {message && <StatusMessage message={message} />}

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-white/20 text-gray-300 text-sm font-semibold rounded-lg hover:bg-white/10 transition"
                >
                  {t.booking.cancel}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? t.booking.form.booking
                    : t.booking.form.confirmBooking}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
