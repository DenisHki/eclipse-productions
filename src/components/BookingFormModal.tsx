import { format } from "date-fns";
import { PriceBreakdown } from "../utils/priceUtils";
import { useLanguage } from "../i18n/LanguageContext";

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg sm:max-w-md mx-4 my-8 p-4 sm:p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">
          {t.booking.form.bookingOn} {format(selectedRange.start, "dd.MM.yyyy")}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.booking.form.firstName}{" "}
              <span className="text-red-500">{t.booking.form.required}</span>
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
              <span className="text-red-500">{t.booking.form.required}</span>
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
              <span className="text-red-500">{t.booking.form.required}</span>
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
              <span className="text-red-500">{t.booking.form.required}</span>
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
              <span className="text-gray-400">{t.booking.form.optional}</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.booking.form.notes}
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

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
        </div>

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

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 font-semibold text-gray-900 rounded-full hover:bg-gray-400 transition-colors"
          >
            {t.booking.cancel}
          </button>
          <button
            onClick={onSubmit}
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
  );
}
