import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo, View } from "react-big-calendar";
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
import BookingFormModal from "../components/BookingFormModal";
import Header from "./Header";
import { Helmet } from "react-helmet-async";
import BookingInstructions from "./BookingInstructions";
import { calculateTotalPrice, getPriceBreakdown } from "../utils/priceUtils";
import { useLanguage } from "../i18n/LanguageContext";

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
  isBlocked?: boolean;
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
  const [needsEngineer, setNeedsEngineer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>("day");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [calendarKey, setCalendarKey] = useState(0);
  const topRef = useRef<HTMLDivElement | null>(null);
  const { t, language } = useLanguage();

  const totalHours = useMemo(() => {
    if (!selectedRange) return 0;
    let diff = selectedRange.end.getTime() - selectedRange.start.getTime();
    const end = new Date(selectedRange.end);
    if (end.getMinutes() === 59 && end.getSeconds() === 59) {
      end.setHours(end.getHours() + 1, 0, 0, 0);
      diff = end.getTime() - selectedRange.start.getTime();
    }
    return diff / 1000 / 60 / 60;
  }, [selectedRange]);

  const priceBreakdown = useMemo(
    () => getPriceBreakdown(totalHours, needsEngineer),
    [totalHours, needsEngineer],
  );

  const totalPrice = useMemo(
    () => calculateTotalPrice(totalHours, needsEngineer),
    [totalHours, needsEngineer],
  );

  const formats = useMemo(
    () => ({
      timeGutterFormat: (date: Date) => formatDate(date, "HH:mm"),
      eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
        `${formatDate(start, "HH:mm")} - ${formatDate(end, "HH:mm")}`,
    }),
    [],
  );

  const eventPropGetter = useMemo(
    () => (event: BookingEvent) => ({
      style: {
        backgroundColor: event.isBlocked ? "#ef4444" : "#f3f4f6",
        color: event.isBlocked ? "#ffffff" : "#111827",
        borderRadius: "0.375rem",
        border: event.isBlocked ? "1px solid #dc2626" : "1px solid #d1d5db",
      },
    }),
    [],
  );

  const slotPropGetter = useCallback(
    (date: Date) => {
      const now = new Date();

      if (date < now) {
        return {
          style: {
            backgroundColor: "#f9fafb",
            color: "#9ca3af",
            pointerEvents: "none" as const,
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
          backgroundColor: isSelected ? "#cbd5e1" : "#ecfdf5",
        },
      };
    },
    [selectedRange],
  );

  const resetUserForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setNeedsEngineer(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setCalendarKey((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (message || selectedRange) {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message, selectedRange]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchBooked = async () => {
      try {
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
            new Date(),
          );
          const end = parse(
            `${data.date} ${endStr}`,
            "yyyy-MM-dd HH:mm",
            new Date(),
          );

          bookings.push({
            id: docSnap.id,
            title: "Booked",
            start,
            end,
          });
        });

        setEvents(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setMessage(t.booking.messages.loadError);
      }
    };

    fetchBooked();
  }, [t]);

  useEffect(() => {
    if (showForm) {
      resetUserForm();
    }
  }, [showForm]);

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      if (currentView === "month") {
        setCurrentView("day");
        setCurrentDate(slotInfo.start);
        return;
      }

      const now = new Date();

      if (slotInfo.start < now) {
        setMessage(t.booking.messages.pastSlot);
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
        setMessage(t.booking.messages.overlap);
        setSelectedRange(null);
        return;
      }

      setNeedsEngineer(false);

      setMessage(null);
      setSelectedRange({ start: slotInfo.start, end: slotInfo.end });
      setShowForm(false);
    },
    [events, currentView, t],
  );

  const handleBook = useCallback(async () => {
    if (!selectedRange) {
      setMessage(t.booking.messages.selectRange);
      return;
    }

    if (!firstName || !lastName || !phone || !email) {
      setMessage(t.booking.messages.fillRequired);
      return;
    }

    setSubmitting(true);
    setMessage(null);

    const startStr = formatDate(selectedRange.start, "HH:mm");
    const endStr = formatDate(selectedRange.end, "HH:mm");
    const dateStr = formatDate(selectedRange.start, "yyyy-MM-dd");
    const bookingId = `${dateStr}_${startStr.replace(":", "-")}_${endStr.replace(
      ":",
      "-",
    )}`;

    try {
      const snap = await getDocs(collection(db, "bookings"));
      const overlapping = snap.docs.some((d) => {
        const data = d.data();
        if (data.date !== dateStr) return false;

        const [existingStartStr, existingEndStr] = data.time.split("-");
        const existingStart = parse(
          `${dateStr} ${existingStartStr}`,
          "yyyy-MM-dd HH:mm",
          new Date(),
        ).getTime();
        const existingEnd = parse(
          `${dateStr} ${existingEndStr}`,
          "yyyy-MM-dd HH:mm",
          new Date(),
        ).getTime();

        const newStart = selectedRange.start.getTime();
        const newEnd = selectedRange.end.getTime();

        return newStart < existingEnd && newEnd > existingStart;
      });

      if (overlapping) {
        throw new Error(t.booking.messages.overlap);
      }

      await runTransaction(db, async (tx) => {
        const ref = doc(db, "bookings", bookingId);
        const docSnapshot = await tx.get(ref);

        if (docSnapshot.exists()) {
          throw new Error(t.booking.messages.overlap);
        }

        tx.set(ref, {
          date: dateStr,
          time: `${startStr}-${endStr}`,
          hours: totalHours,
          price: totalPrice,
          needsEngineer,
          engineerFee: needsEngineer ? priceBreakdown.engineerFee : 0,
          basePrice: priceBreakdown.basePrice,
          firstName,
          lastName,
          phone,
          email,
          notes,
          createdAt: serverTimestamp(),
        });
      });

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
          base_price: priceBreakdown.basePrice,
          engineer_fee: needsEngineer ? priceBreakdown.engineerFee : 0,
          needs_engineer: needsEngineer ? "Yes" : "No",
          phone,
          notes,
          current_year: new Date().getFullYear(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setMessage(t.booking.messages.confirmed);

      const currentSelectedRange = selectedRange;

      setSelectedRange(null);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setNotes("");
      setNeedsEngineer(false);
      setShowForm(false);

      const newEvent: BookingEvent = {
        id: bookingId,
        title: "Booked",
        start: currentSelectedRange.start,
        end: currentSelectedRange.end,
      };
      setEvents((prev) => [...prev, newEvent]);
    } catch (err: unknown) {
      console.error("Booking error:", err);

      if (err instanceof Error) {
        setMessage(`❌ ${err.message}`);
      } else {
        setMessage(t.booking.messages.failed);
      }
    } finally {
      setSubmitting(false);
    }
  }, [
    selectedRange,
    firstName,
    lastName,
    phone,
    email,
    notes,
    totalHours,
    totalPrice,
    needsEngineer,
    priceBreakdown,
    t,
  ]);

  return (
    <section className="w-full pb-12 bg-gray-50">
      <div ref={topRef}></div>
      <Helmet>
        <title>{t.seo.booking.title}</title>
        <meta name="description" content={t.seo.booking.description} />
        <link
          rel="canonical"
          href={`https://eclipseproductions.fi/${language === "fi" ? "fi/" : ""}booking`}
        />
        <meta property="og:title" content={t.seo.booking.ogTitle} />
        <meta property="og:description" content={t.seo.booking.ogDescription} />
        <meta
          property="og:url"
          ref={`https://eclipseproductions.fi/${language === "fi" ? "fi/" : ""}booking`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://eclipseproductions.fi/eclipse_studio.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.seo.booking.ogTitle} />
        <meta
          name="twitter:description"
          content={t.seo.booking.ogDescription}
        />
        <meta
          name="twitter:image"
          content="https://eclipseproductions.fi/eclipse_studio.jpeg"
        />
        <html lang={language} />
      </Helmet>
      <Header />
      <div className="w-full md:w-11/12 lg:w-4/5 mx-auto">
        {selectedRange && !showForm && (
          <div className="mt-6 mx-auto max-w-md lg:max-w-2xl p-6 border border-gray-200 rounded-2xl bg-white shadow-lg">
            <div className="text-center lg:text-left space-y-2 sm:space-y-2 lg:space-y-4">
              <div>
                <p className="text-base text-gray-500">
                  {t.booking.selectedDate}
                </p>
                <p className="text-base lg:text-xl font-semibold text-gray-900">
                  {formatDate(selectedRange.start, "dd.MM.yyyy")}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-500">
                  {t.booking.selectedTime}
                </p>
                <p className="text-base lg:text-xl font-semibold text-gray-900">
                  {formatDate(selectedRange.start, "HH:mm")} –{" "}
                  {formatDate(selectedRange.end, "HH:mm")}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-500">{t.booking.duration}</p>
                <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                  {totalHours}h<span className="mx-1 text-gray-400">·</span>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">
                    {totalPrice} €
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-base font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                {t.booking.bookSlot}
              </button>
              <button
                onClick={() => setSelectedRange(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors text-base font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                {t.booking.cancel}
              </button>
            </div>
          </div>
        )}

        {selectedRange && showForm && (
          <BookingFormModal
            selectedRange={selectedRange}
            totalHours={totalHours}
            totalPrice={totalPrice}
            priceBreakdown={priceBreakdown}
            submitting={submitting}
            onSubmit={handleBook}
            onClose={() => {
              setShowForm(false);
              setSelectedRange(null);
              setNeedsEngineer(false);
            }}
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            notes={notes}
            needsEngineer={needsEngineer}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhone={setPhone}
            setEmail={setEmail}
            setNotes={setNotes}
            setNeedsEngineer={setNeedsEngineer}
            message={message}
          />
        )}

        {message && (
          <div
            className={`mt-6 mx-auto max-w-md lg:max-w-none p-6 rounded-2xl border shadow-md text-center lg:text-left text-base lg:text-xl font-semibold ${
              message.includes("⚠️") ||
              message.toLowerCase().includes("overlap")
                ? "bg-yellow-100 border-yellow-300 text-yellow-900"
                : message.toLowerCase().includes("failed") ||
                    message.toLowerCase().includes("error") ||
                    message.includes("❌")
                  ? "bg-red-100 border-red-300 text-red-900"
                  : "bg-green-100 border-green-300 text-green-900"
            }`}
          >
            {message}
          </div>
        )}

        <Calendar
          key={calendarKey}
          localizer={localizer}
          events={events}
          views={["day", "week", "month"]}
          defaultView="day"
          view={currentView}
          date={currentDate}
          onView={setCurrentView}
          onNavigate={setCurrentDate}
          step={60}
          timeslots={1}
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: "auto", minHeight: "90vh" }}
          formats={formats}
          eventPropGetter={eventPropGetter}
          slotPropGetter={slotPropGetter}
        />
      </div>
      <BookingInstructions />
    </section>
  );
}
