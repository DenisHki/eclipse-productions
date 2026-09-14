import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo, View } from "react-big-calendar";
import { format as formatDate, parse, startOfWeek, getDay } from "date-fns";
import { fi } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingFormModal from "../components/BookingFormModal";
import Header from "./Header";
import { Helmet } from "react-helmet-async";
import BookingInstructions from "./BookingInstructions";
import { useLanguage } from "../i18n/LanguageContext";
import StatusMessage from "./shared/StatusMessage";
import { useBookings } from "../hooks/useBookings";
import { BookingEvent } from "../types/booking";

const locales = { "fi-FI": fi };
const localizer = dateFnsLocalizer({
  format: formatDate,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function BookingPage() {
  const { t, language } = useLanguage();

  const {
    events,
    selectedRange,
    setSelectedRange,
    showForm,
    setShowForm,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    notes,
    setNotes,
    needsEngineer,
    setNeedsEngineer,
    submitting,
    message,
    totalHours,
    priceBreakdown,
    totalPrice,
    handleSelectSlot,
    handleBook,
  } = useBookings();

  // Calendar display state — this is purely about how the <Calendar> widget
  // looks and navigates, not about booking data, so it stays in this
  // component rather than the hook.
  const [currentView, setCurrentView] = useState<View>("day");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [calendarKey, setCalendarKey] = useState(0);
  const topRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const handleResize = () => {
      setCalendarKey((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (message || selectedRange) {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message, selectedRange]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onSelectSlot = (slotInfo: SlotInfo) =>
    handleSelectSlot(slotInfo, currentView, (date) => {
      setCurrentView("day");
      setCurrentDate(date);
    });

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

        {message && <StatusMessage message={message} size="lg" />}

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
          onSelectSlot={onSelectSlot}
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
