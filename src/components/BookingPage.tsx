"use client";
import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fi } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import emailjs from "emailjs-com";
import { jsPDF } from "jspdf";

const locales = { "fi-FI": fi };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface BookingEvent {
  title: string;
  start: Date;
  end: Date;
  id: string;
}

export default function BookingPage() {
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch booked slots from Firestore
  useEffect(() => {
    async function fetchBooked() {
      const q = collection(db, "bookings");
      const snap = await getDocs(q);
      const bookings: BookingEvent[] = [];
      snap.forEach((doc) => {
        const data = doc.data();
        const [startStr, endStr] = data.time.split("-");
        const dateStr = data.date;
        bookings.push({
          id: doc.id,
          title: "Booked",
          start: new Date(`${dateStr}T${startStr}:00`),
          end: new Date(`${dateStr}T${endStr}:00`),
        });
      });
      setEvents(bookings);
    }
    fetchBooked();
  }, []);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedRange({ start: slotInfo.start, end: slotInfo.end });
  };

  const calculateHours = () => {
    if (!selectedRange) return 0;
    const diff = selectedRange.end.getTime() - selectedRange.start.getTime();
    return diff / 1000 / 60 / 60;
  };

  const totalHours = calculateHours();
  const totalPrice = totalHours * 20;

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" });

  const handleBook = async () => {
    if (!selectedRange) return alert("Select a time range.");
    if (!firstName || !lastName || !phone || !email)
      return alert("Fill all required fields.");

    setSubmitting(true);
    setMessage(null);

    const startStr = formatTime(selectedRange.start);
    const endStr = formatTime(selectedRange.end);
    const dateStr = selectedRange.start.toISOString().split("T")[0];
    const bookingId = `${dateStr}_${startStr.replace(":", "-")}_${endStr.replace(":", "-")}`;
    const invoiceNumber = `INV-${Date.now()}`;

    try {
      // Save booking
      await runTransaction(db, async (tx) => {
        const ref = doc(db, "bookings", bookingId);
        if ((await tx.get(ref)).exists()) throw new Error("Slot taken");
        tx.set(ref, {
          date: dateStr,
          time: `${startStr}-${endStr}`,
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

      // Generate PDF
      const pdf = new jsPDF();
      pdf.setFontSize(16);
      pdf.text("Invoice - Eclipse Productions Oy", 14, 20);
      pdf.setFontSize(11);
      pdf.text(`Invoice #: ${invoiceNumber}`, 14, 30);
      pdf.text(`Date: ${new Date().toLocaleDateString("fi-FI")}`, 14, 38);
      pdf.text(`Customer: ${firstName} ${lastName}`, 14, 48);
      pdf.text(`Phone: ${phone}`, 14, 56);
      pdf.text(`Email: ${email}`, 14, 64);
      pdf.text(`Booking: ${dateStr} ${startStr} - ${endStr}`, 14, 80);
      pdf.text(`Duration: ${totalHours} hour(s)`, 14, 90);
      pdf.text(`Rate: €20/hour`, 14, 100);
      pdf.text(`Total: €${totalPrice}`, 14, 110);
      pdf.text("Thank you for booking with Eclipse Productions Oy!", 14, 130);
      const pdfDataUri = pdf.output("datauristring");

      // Send email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID,
        {
          to_name: `${firstName} ${lastName}`,
          to_email: email,
          booking_date: dateStr,
          booking_time: `${startStr} - ${endStr}`,
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

      setMessage("Booking confirmed! Invoice sent to your email.");
      setSelectedRange(null);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setNotes("");

      // Update calendar
      const newEvent: BookingEvent = {
        id: bookingId,
        title: "Booked",
        start: selectedRange.start,
        end: selectedRange.end,
      };
      setEvents((prev) => [...prev, newEvent]);
    } catch (err: any) {
      console.error("Booking or email error:", err);
      setMessage("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-3xl mx-auto">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="month"
          views={["month", "week", "day", "agenda"]}
          step={60}
          timeslots={1}
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: 600 }}
          eventPropGetter={() => ({
            style: { backgroundColor: "#dc2626", color: "white" },
          })}
          formats={{
            timeGutterFormat: (date) =>
              date.toLocaleTimeString("fi-FI", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            eventTimeRangeFormat: ({ start, end }) =>
              `${formatTime(start)} - ${formatTime(end)}`,
          }}
        />

        {selectedRange && (
          <div className="mt-6 p-4 border rounded bg-gray-900 text-white">
            <p>
              Selected:{" "}
              <strong>
                {formatTime(selectedRange.start)} -{" "}
                {formatTime(selectedRange.end)}
              </strong>
            </p>
            <p>
              Duration: <strong>{totalHours} hour(s)</strong> – Total:{" "}
              <strong>€{totalPrice}</strong>
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="p-2 rounded bg-gray-800 col-span-1 text-white"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="p-2 rounded bg-gray-800 col-span-1 text-white"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="p-2 rounded bg-gray-800 col-span-2 text-white"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-2 rounded bg-gray-800 col-span-2 text-white"
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes (optional)"
                className="p-2 rounded bg-gray-800 col-span-2 text-white"
                rows={3}
              />
            </div>

            <button
              onClick={handleBook}
              disabled={submitting}
              className="mt-4 px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Booking…" : "Confirm Booking"}
            </button>
          </div>
        )}

        {message && <p className="mt-4 text-green-400">{message}</p>}
      </div>
    </section>
  );
}
