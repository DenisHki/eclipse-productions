import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo, View } from "react-big-calendar";
import { format as formatDate, parse, startOfWeek, getDay } from "date-fns";
import { fi } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingFormModal from "./booking/BookingFormModal";
import Header from "./Header";
import { Helmet } from "react-helmet-async";
import BookingInstructions from "./booking/BookingInstructions";
import { useLanguage } from "../i18n/LanguageContext";
import StatusMessage from "./shared/StatusMessage";
import { useBookings } from "../hooks/useBookings";
import { BookingEvent } from "../types/booking";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "./auth/AuthModal";

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
    formData,
    setFormData,
    submitting,
    message,
    totalHours,
    priceBreakdown,
    totalPrice,
    handleSelectSlot,
    handleBook,
    handleCancelBooking,
  } = useBookings();

  const { user, role } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [cancelEvent, setCancelEvent] = useState<BookingEvent | null>(null);

  const handleBookSlot = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowForm(true);
    }
  };

  const handleSelectEvent = (event: BookingEvent) => {
    const isOwn = user && event.uid === user.uid;
    if (isOwn || role === "admin") {
      setCancelEvent(event);
    }
  };

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
    () => (event: BookingEvent) => {
      const isOwn = user && event.uid === user.uid;
      return {
        style: {
          backgroundColor: event.isBlocked
            ? "#ef4444"
            : isOwn
              ? "#b8975e"
              : "#f3f4f6",
          color: event.isBlocked ? "#ffffff" : isOwn ? "#000000" : "#111827",
          borderRadius: "0.375rem",
          border: event.isBlocked
            ? "1px solid #dc2626"
            : isOwn
              ? "1px solid #e1bd8f"
              : "1px solid #d1d5db",
        },
      };
    },
    [user],
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
          <div className="mt-6 mx-auto max-w-md lg:max-w-2xl p-6 border border-white/10 rounded-2xl bg-[#1a1a1a] shadow-lg">
            <div className="text-center lg:text-left space-y-2 sm:space-y-2 lg:space-y-4">
              <div>
                <p className="text-base text-gray-400">
                  {t.booking.selectedDate}
                </p>
                <p className="text-base lg:text-xl font-semibold text-white">
                  {formatDate(selectedRange.start, "dd.MM.yyyy")}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-400">
                  {t.booking.selectedTime}
                </p>
                <p className="text-base lg:text-xl font-semibold text-white">
                  {formatDate(selectedRange.start, "HH:mm")} –{" "}
                  {formatDate(selectedRange.end, "HH:mm")}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-400">{t.booking.duration}</p>
                <p className="text-base sm:text-lg lg:text-xl font-semibold text-white">
                  {totalHours}h<span className="mx-1 text-gray-500">·</span>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#e1bd8f]/20 text-[#e1bd8f] font-bold">
                    {" "}
                    {totalPrice} €
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={handleBookSlot}
                className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                {t.booking.bookSlot}
              </button>
              <button
                onClick={() => setSelectedRange(null)}
                className="px-4 py-2 border border-white/20 text-gray-300 text-sm font-semibold rounded-lg hover:bg-white/10 transition"
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
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleBook}
            onClose={() => {
              setShowForm(false);
              setSelectedRange(null);
            }}
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
          onSelectEvent={handleSelectEvent}
          titleAccessor={(event: BookingEvent) => {
            const isOwn = user && event.uid === user.uid;
            if (role === "admin")
              return (
                `👤 ${event.firstName ?? ""} ${event.lastName ?? ""}`.trim() ||
                "Booked"
              );
            if (isOwn) return "⭐ My Booking";
            return "Booked";
          }}
        />
      </div>
      <BookingInstructions />
      {cancelEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/70 overflow-y-auto"
          onClick={() => setCancelEvent(null)}
        >
          <div
            className="min-h-full flex items-start sm:items-center justify-center p-4 py-8 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">
                Cancel Booking
              </h2>
              <p className="text-gray-400 mb-2">
                <span className="text-white font-semibold">
                  {formatDate(cancelEvent.start, "dd.MM.yyyy")}
                </span>
              </p>
              <p className="text-gray-400 mb-4">
                {formatDate(cancelEvent.start, "HH:mm")} –{" "}
                {formatDate(cancelEvent.end, "HH:mm")}
              </p>
              {role !== "admin" &&
              cancelEvent.start.getTime() - Date.now() < 48 * 60 * 60 * 1000 ? (
                <p className="text-red-400 text-sm mb-6">
                  ⚠️ This booking is less than 48 hours away and cannot be
                  cancelled.
                </p>
              ) : (
                <p className="text-gray-400 text-sm mb-6">
                  Are you sure you want to cancel this booking?
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setCancelEvent(null)}
                  className="flex-1 px-4 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/10 transition"
                >
                  Keep Booking
                </button>
                <button
                                    disabled={role !== "admin" && (cancelEvent.start.getTime() - Date.now()) < 48 * 60 * 60 * 1000}
                  onClick={async () => {
                    await handleCancelBooking(cancelEvent.id);
                    setCancelEvent(null);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal
          initialMode="login"
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            setShowForm(true);
          }}
        />
      )}
    </section>
  );
}
