import { format } from "date-fns";

interface BookingFormModalProps {
  selectedRange: { start: Date; end: Date };
  totalHours: number;
  totalPrice: number;
  submitting: boolean;
  onSubmit: () => void;
  onClose: () => void;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setPhone: (val: string) => void;
  setEmail: (val: string) => void;
  setNotes: (val: string) => void;
  message: string | null;
}

export default function BookingFormModal({
  selectedRange,
  totalHours,
  totalPrice,
  submitting,
  onSubmit,
  onClose,
  firstName,
  lastName,
  phone,
  email,
  notes,
  setFirstName,
  setLastName,
  setPhone,
  setEmail,
  setNotes,
  message,
}: BookingFormModalProps) {
  const formatTime = (date: Date) => format(date, "HH:mm");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg sm:max-w-md mx-4 p-4 sm:p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">
          Booking on {format(selectedRange.start, "dd.MM.yyyy")}
        </h3>
        <p className="text-gray-700 mb-4">
          Time:{" "}
          <strong>
            {formatTime(selectedRange.start)} – {formatTime(selectedRange.end)}
          </strong>
          <br />
          Duration: <strong>{totalHours}h</strong> – Total:{" "}
          <strong>€{totalPrice}</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              className="p-2 border rounded w-full"
              rows={3}
            />
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

        <div className="flex justify-end gap-2 mt-6"></div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 font-semibold text-gray-900 rounded-full hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Booking…" : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
