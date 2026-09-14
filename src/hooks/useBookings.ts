import { useState, useEffect, useCallback, useMemo } from "react";
import { SlotInfo } from "react-big-calendar";
import { format as formatDate, parse } from "date-fns";
import emailjs from "emailjs-com";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { useLanguage } from "../i18n/LanguageContext";
import { calculateTotalPrice, getPriceBreakdown } from "../utils/priceUtils";
import { BookingEvent } from "../types/booking";

/**
 * Owns everything related to the booking *domain*: reading/writing bookings
 * in Firestore, slot selection + overlap checks, and the submission flow.
 * BookingPage stays responsible only for rendering the calendar UI around it.
 */
export function useBookings() {
  const { t } = useLanguage();

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

  const resetUserForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setNeedsEngineer(false);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (showForm) {
      resetUserForm();
    }
  }, [showForm]);

  useEffect(() => {
    const fetchBooked = async () => {
      try {
        const q = collection(db, "bookings_public");
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

  const handleSelectSlot = useCallback(
    (
      slotInfo: SlotInfo,
      currentView: string,
      onMonthClick: (date: Date) => void,
    ) => {
      if (currentView === "month") {
        onMonthClick(slotInfo.start);
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
    [events, t],
  );

  const handleBook = useCallback(
    async (termsAccepted: boolean) => {
      if (!selectedRange) {
        setMessage(t.booking.messages.selectRange);
        return;
      }

      if (!firstName || !lastName || !phone || !email) {
        setMessage(t.booking.messages.fillRequired);
        return;
      }

      if (!termsAccepted) {
        // NOTE: kept exactly as it was in BookingPage.tsx — this reuses the
        // "fill required fields" message rather than terms.mustAccept.
        // Flagging this as a likely copy-paste slip; not changing it here
        // since this step is a pure move, not a behavior fix.
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
        const snap = await getDocs(collection(db, "bookings_public"));
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

        await runTransaction(db, async (tx) => {
          const publicRef = doc(db, "bookings_public", bookingId);
          const privateRef = doc(db, "bookings_private", bookingId);

          const docSnapshot = await tx.get(publicRef);

          if (docSnapshot.exists()) {
            throw new Error(t.booking.messages.overlap);
          }

          tx.set(publicRef, {
            date: dateStr,
            time: `${startStr}-${endStr}`,
            hours: totalHours,
            price: totalPrice,
            createdAt: serverTimestamp(),
          });

          tx.set(privateRef, {
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
            termsAccepted: true,
            termsAcceptedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
          });
        });

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
    },
    [
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
    ],
  );

  return {
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
  };
}
