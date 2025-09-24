import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import { format as formatDate, parse, startOfWeek, getDay } from "date-fns";
import emailjs from "emailjs-com";
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
import { jsPDF } from "jspdf";
import BookingFormModal from "../components/BookingFormModal";
import Header from "./Header";
import { Helmet } from "react-helmet-async";

const locales = { "fi-FI": fi };
const localizer = dateFnsLocalizer({
  format: formatDate,
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
  const [showForm, setShowForm] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch bookings
  useEffect(() => {
    async function fetchBooked() {
      const q = collection(db, "bookings");
      const snap = await getDocs(q);
      const bookings: BookingEvent[] = [];

      snap.forEach((docSnap) => {
        const data = docSnap.data();
        if (!data.date || !data.time) return;

        const [startStr, endStr] = data.time.split("-");
        const start = parse(
          `${data.date} ${startStr}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        );
        const end = parse(
          `${data.date} ${endStr}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        );

        bookings.push({
          id: docSnap.id,
          title: "Booked",
          start,
          end,
        });
      });

      setEvents(bookings);
    }
    fetchBooked();
  }, []);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const now = new Date();

    // Prevent booking past slots
    if (slotInfo.start < now) {
      setMessage("⚠️ You cannot book past time slots.");
      setSelectedRange(null);
      return;
    }

    const newStart = slotInfo.start.getTime();
    const newEnd = slotInfo.end.getTime();

    const overlapping = events.some((event) => {
      const existingStart = event.start.getTime();
      const existingEnd = event.end.getTime();
      return newStart < existingEnd && newEnd > existingStart;
    });

    if (overlapping) {
      setMessage("⚠️ Selected time overlaps with an existing booking.");
      setSelectedRange(null);
      return;
    }

    setMessage(null);
    setSelectedRange({ start: slotInfo.start, end: slotInfo.end });
    setShowForm(false);
  };

  const calculateHours = () => {
    if (!selectedRange) return 0;
    let diff = selectedRange.end.getTime() - selectedRange.start.getTime();

    const end = new Date(selectedRange.end);
    if (end.getMinutes() === 59 && end.getSeconds() === 59) {
      end.setHours(end.getHours() + 1, 0, 0, 0);
      diff = end.getTime() - selectedRange.start.getTime();
    }

    return diff / 1000 / 60 / 60;
  };

  const totalHours = calculateHours();
  const totalPrice = totalHours * 27;

  const formatTime = (date: Date) => formatDate(date, "HH:mm");

  const formats = {
    timeGutterFormat: (date: Date) => formatTime(date),
    eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${formatTime(start)} - ${formatTime(end)}`,
  };

  const handleBook = async () => {
    /*
    if (!selectedRange) return alert("Select a time range.");
    if (!firstName || !lastName || !phone || !email)
      return alert("Fill all required fields.");

    setSubmitting(true);
    setMessage(null);*/
    if (!selectedRange) {
      setMessage("⚠️ Please select a time range before booking.");
      return;
    }
    if (!firstName || !lastName || !phone || !email) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setMessage(null);

    const startStr = formatTime(selectedRange.start);
    const endStr = formatTime(selectedRange.end);
    const dateStr = formatDate(selectedRange.start, "yyyy-MM-dd");
    const bookingId = `${dateStr}_${startStr.replace(":", "-")}_${endStr.replace(
      ":",
      "-"
    )}`;
    const invoiceNumber = `INV-${Date.now()}`;

    try {
      // Check overlap
      const snap = await getDocs(collection(db, "bookings"));
      const overlapping = snap.docs.some((d) => {
        const data = d.data();
        if (data.date !== dateStr) return false;

        const [existingStartStr, existingEndStr] = data.time.split("-");
        const existingStart = parse(
          `${dateStr} ${existingStartStr}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        ).getTime();
        const existingEnd = parse(
          `${dateStr} ${existingEndStr}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        ).getTime();

        const newStart = selectedRange.start.getTime();
        const newEnd = selectedRange.end.getTime();

        return newStart < existingEnd && newEnd > existingStart;
      });

      if (overlapping) {
        throw new Error("Selected time overlaps with an existing booking.");
      }

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

      // PDF invoice
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
      pdf.text(`Rate: €27/hour`, 14, 100);
      pdf.text(`Total: €${totalPrice}`, 14, 110);
      pdf.text("Thank you for booking with Eclipse Productions Oy!", 14, 130);
      const pdfDataUri = pdf.output("datauristring");

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
      setShowForm(false);

      const newEvent: BookingEvent = {
        id: bookingId,
        title: "Booked",
        start: selectedRange.start,
        end: selectedRange.end,
      };
      setEvents((prev) => [...prev, newEvent]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Booking error:", err);
        setMessage(err.message);
      } else {
        console.error("Booking error (non-Error):", err);
        setMessage("Booking failed. Please try again.");
      }
    }
  };

  return (
    <section className="w-full pb-12 bg-gray-50">
      <Helmet>
        <title>Book a Music Studio in Helsinki | Eclipse Productions Oy</title>
        <meta
          name="description"
          content="Reserve your studio session online at Eclipse Productions Oy. Affordable hourly rates (€27/hour), professional equipment, and modern facilities in Helsinki."
        />
        <link rel="canonical" href="https://eclipseproductions.fi/booking" />
        {/* Open Graph (Facebook, LinkedIn, WhatsApp, etc.) */}
        <meta
          property="og:title"
          content="Book a Music Studio in Helsinki | Eclipse Productions Oy"
        />
        <meta
          property="og:description"
          content="Reserve your studio session online at Eclipse Productions Oy. Affordable rates, professional equipment, and modern facilities in Helsinki."
        />
        <meta
          property="og:url"
          content="https://eclipseproductions.fi/booking"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://eclipseproductions.fi/eclipse_studio.jpeg"
        />

        {/* Twitter Card (also used by Slack, Telegram, etc.) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Book a Music Studio in Helsinki | Eclipse Productions Oy"
        />
        <meta
          name="twitter:description"
          content="Reserve your studio session online at Eclipse Productions Oy. Affordable hourly rates and modern facilities in Helsinki."
        />
        <meta
          name="twitter:image"
          content="https://eclipseproductions.fi/eclipse_studio.jpeg"
        />
      </Helmet>
      <Header />
      <div className="w-full lg:w-4/5 mx-auto">
        {selectedRange && !showForm && (
          <div className="mt-6 p-4 border rounded bg-white shadow-md">
            <p>
              Selected:{" "}
              <strong>
                {formatTime(selectedRange.start)} –{" "}
                {formatTime(selectedRange.end)}
              </strong>
            </p>
            <p>
              Duration: <strong>{totalHours}h</strong> – Total:{" "}
              <strong>€{totalPrice}</strong>
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book this slot
              </button>
              <button
                onClick={() => setSelectedRange(null)}
                className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {selectedRange && showForm && (
          <BookingFormModal
            selectedRange={selectedRange}
            totalHours={totalHours}
            totalPrice={totalPrice}
            submitting={submitting}
            onSubmit={handleBook}
            onClose={() => {
              setShowForm(false);
              setSelectedRange(null);
            }}
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            notes={notes}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhone={setPhone}
            setEmail={setEmail}
            setNotes={setNotes}
            message={message}
          />
        )}
        {message && (
          <div
            className={`mt-4 p-4 rounded-lg border shadow-sm ${
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

        <Calendar
          localizer={localizer}
          events={events}
          views={["day", "week", "month", "agenda"]}
          defaultView="day"
          step={60}
          timeslots={1}
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: "90vh" }}
          formats={formats}
          eventPropGetter={() => ({
            style: {
              backgroundColor: "#f3f4f6",
              color: "#111827",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
            },
          })}
          slotPropGetter={(date: Date) => {
            const now = new Date();

            // Disable past slots visually + functionally
            if (date < now) {
              return {
                style: {
                  backgroundColor: "#f9fafb",
                  color: "#9ca3af",
                  pointerEvents: "none",
                },
              };
            }

            const isSelected =
              selectedRange &&
              date >= selectedRange.start &&
              date < selectedRange.end;

            return {
              style: {
                transition: "background-color 0.2s",
                backgroundColor: isSelected ? "#cbd5e1" : undefined,
              },
            };
          }}
        />
      </div>
    </section>
  );
}
