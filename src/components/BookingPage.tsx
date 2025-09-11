"use client";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import emailjs from "emailjs-com";
import { jsPDF } from "jspdf";

const AVAILABLE_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function formatDisplayTime(t: string) {
  const [hh, mm] = t.split(":").map(Number);
  const suffix = hh >= 12 ? "PM" : "AM";
  const hour12 = ((hh + 11) % 12) + 1;
  return `${hour12}:${String(mm).padStart(2, "0")} ${suffix}`;
}

export default function BookingPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [booked, setBooked] = useState<string[]>([]);
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooked() {
      setLoadingSlots(true);
      const q = query(collection(db, "bookings"), where("date", "==", date));
      const snap = await getDocs(q);
      const times: string[] = [];
      snap.forEach((d) => times.push(d.data().time));
      setBooked(times);
      setLoadingSlots(false);
    }
    fetchBooked();
  }, [date]);

  const handleSlotClick = (slot: string) => {
    if (!selectedStart) {
      setSelectedStart(slot);
      setSelectedEnd(null);
    } else {
      const startIndex = AVAILABLE_SLOTS.indexOf(selectedStart);
      const endIndex = AVAILABLE_SLOTS.indexOf(slot);
      if (endIndex > startIndex) {
        setSelectedEnd(slot);
      } else {
        setSelectedStart(slot);
        setSelectedEnd(null);
      }
    }
  };

  const calculateHours = () => {
    if (!selectedStart || !selectedEnd) return 0;
    const startIndex = AVAILABLE_SLOTS.indexOf(selectedStart);
    const endIndex = AVAILABLE_SLOTS.indexOf(selectedEnd);
    return endIndex - startIndex;
  };

  const totalHours = calculateHours();
  const totalPrice = totalHours * 20;

  const handleBook = async () => {
  if (!selectedStart || !selectedEnd) return alert("Select a time range.");
  if (!firstName || !lastName || !phone || !email)
    return alert("Fill all required fields.");

  setSubmitting(true);
  setMessage(null);

  const bookingId = `${date}_${selectedStart.replace(":", "-")}_${selectedEnd.replace(":", "-")}`;
  const invoiceNumber = `INV-${Date.now()}`;

  try {
    // Save booking to Firestore
    await runTransaction(db, async (tx) => {
      const ref = doc(db, "bookings", bookingId);
      if ((await tx.get(ref)).exists()) throw new Error("Slot taken");
      tx.set(ref, {
        date,
        time: `${selectedStart}-${selectedEnd}`,
        hours: totalHours,
        price: totalPrice,
        firstName,
        lastName,
        phone,
        email,
        notes,
        createdAt: serverTimestamp(),
      });
    });

    // Generate PDF invoice
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("Invoice - Eclipse Productions Oy", 14, 20);
    pdf.setFontSize(11);
    pdf.text(`Invoice #: ${invoiceNumber}`, 14, 30);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);
    pdf.text(`Customer: ${firstName} ${lastName}`, 14, 48);
    pdf.text(`Phone: ${phone}`, 14, 56);
    pdf.text(`Email: ${email}`, 14, 64);
    pdf.text(`Booking: ${date} ${selectedStart} - ${selectedEnd}`, 14, 80);
    pdf.text(`Duration: ${totalHours} hour(s)`, 14, 90);
    pdf.text(`Rate: €20/hour`, 14, 100);
    pdf.text(`Total: €${totalPrice}`, 14, 110);
    pdf.text("Thank you for booking with Eclipse Productions Oy!", 14, 130);
    const pdfDataUri = pdf.output("datauristring");

    console.log("PDF generated. Length:", pdfDataUri.length);

    // Send email via EmailJS
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID,
      {
        to_name: `${firstName} ${lastName}`,
        to_email: email,
        booking_date: date,
        booking_time: `${selectedStart} - ${selectedEnd}`,
        hours: totalHours,
        price: totalPrice,
        phone,
        notes,
        invoice: pdfDataUri,
        invoice_number: invoiceNumber,
        current_year: new Date().getFullYear(),
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    console.log("EmailJS response:", response);

    setMessage("Booking confirmed! Invoice sent to your email.");
    setSelectedStart(null);
    setSelectedEnd(null);
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setNotes("");
  } catch (err: any) {
    console.error("Booking or email error:", err);
    setMessage("Booking failed. Please try again.");
  } finally {
    setSubmitting(false);
  }
};
  return (
    <section className="w-full py-24">
      <div className="max-w-3xl mx-auto bg-black p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Book a Session</h1>

        <label className="block mb-6">
          <span className="text-sm text-gray-300">Choose date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-900"
          />
        </label>

        <h3 className="text-lg mb-2">Select time range</h3>
        {loadingSlots ? (
          <p>Loading slots…</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 mb-6">
            {AVAILABLE_SLOTS.map((t) => {
              const isBooked = booked.includes(t);
              const isSelected =
                selectedStart === t ||
                selectedEnd === t ||
                (selectedStart &&
                  selectedEnd &&
                  AVAILABLE_SLOTS.indexOf(t) >
                    AVAILABLE_SLOTS.indexOf(selectedStart) &&
                  AVAILABLE_SLOTS.indexOf(t) <
                    AVAILABLE_SLOTS.indexOf(selectedEnd));
              return (
                <button
                  key={t}
                  disabled={isBooked}
                  onClick={() => handleSlotClick(t)}
                  className={`p-2 rounded border text-sm ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-gray-800 text-gray-200"
                  } ${isBooked ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {formatDisplayTime(t)}
                </button>
              );
            })}
          </div>
        )}

        {totalHours > 0 && (
          <p className="mb-6 text-lg text-white">
            Duration: <strong>{totalHours} hour(s)</strong> – Total:{" "}
            <strong>€{totalPrice}</strong>
          </p>
        )}

        <h3 className="text-lg mb-2">Your details</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="p-2 rounded bg-gray-900 col-span-1"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="p-2 rounded bg-gray-900 col-span-1"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="p-2 rounded bg-gray-900 col-span-2"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 rounded bg-gray-900 col-span-2"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="p-2 rounded bg-gray-900 col-span-2"
            rows={3}
          ></textarea>
        </div>

        <button
          onClick={handleBook}
          disabled={submitting}
          className="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Booking…" : "Confirm Booking"}
        </button>

        {message && <p className="mt-4 text-green-400">{message}</p>}
      </div>
    </section>
  );
}
