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
}: BookingFormModalProps) {
  const formatTime = (date: Date) => format(date, "HH:mm");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">
          Booking for {formatTime(selectedRange.start)} –{" "}
          {formatTime(selectedRange.end)}
        </h3>

        <p className="text-gray-700 mb-4">
          Duration: <strong>{totalHours}h</strong> – Total:{" "}
          <strong>€{totalPrice}</strong>
        </p>

        <div className="grid grid-cols-2 gap-3">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="p-2 border rounded col-span-1"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="p-2 border rounded col-span-1"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="p-2 border rounded col-span-2"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border rounded col-span-2"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="p-2 border rounded col-span-2"
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Booking…" : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
