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

  const handleSubmit = () => {
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

  return (
    <>
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
                {formData.needsEngineer && (
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.booking.form.firstName}{" "}
                  <span className="text-red-500">
                    {t.booking.form.required}
                  </span>
                </label>
                <input
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
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
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
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
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
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
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder={t.booking.form.notes}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.needsEngineer}
                    onChange={(e) =>
                      updateField("needsEngineer", e.target.checked)
                    }
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

                {showTermsError && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium pl-1">
                    {terms.mustAccept}
                  </p>
                )}
              </div>
            </div>

            {message && <StatusMessage message={message} />}

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
