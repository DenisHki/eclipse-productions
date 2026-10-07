import { setGlobalOptions } from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { Resend } from "resend";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Limit to 10 simultaneous instances to control costs
setGlobalOptions({ maxInstances: 10 });

// Define what data we expect to receive from the browser
interface BookingData {
  bookingId: string;
  dateStr: string;
  startStr: string;
  endStr: string;
  totalHours: number;
  totalPrice: number;
  basePrice: number;
  engineerFee: number;
  needsEngineer: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
  termsAccepted: boolean;
}

export const createBooking = onCall({ cors: true }, async (request) => {
  const data = request.data as BookingData;

  // Validate all required fields are present
  if (
    !data.bookingId ||
    !data.dateStr ||
    !data.startStr ||
    !data.endStr ||
    !data.firstName ||
    !data.lastName ||
    !data.phone ||
    !data.email
  ) {
    throw new HttpsError("invalid-argument", "Missing required booking fields");
  }

  // Validate terms were accepted
  if (!data.termsAccepted) {
    throw new HttpsError(
      "invalid-argument",
      "Terms and conditions must be accepted",
    );
  }

  const db = admin.firestore();
  const publicRef = db.collection("bookings_public").doc(data.bookingId);
  const privateRef = db.collection("bookings_private").doc(data.bookingId);

  // Atomic transaction — both writes succeed or both fail
  // Prevents double bookings even under concurrent load
  await db.runTransaction(async (tx) => {
    const existing = await tx.get(publicRef);

    if (existing.exists) {
      throw new HttpsError(
        "already-exists",
        "This time slot is already booked",
      );
    }

    // Public collection — safe data only, calendar reads this
    tx.set(publicRef, {
      date: data.dateStr,
      time: `${data.startStr}-${data.endStr}`,
      hours: data.totalHours,
      price: data.totalPrice,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Private collection — personal data, locked from browser access
    tx.set(privateRef, {
      date: data.dateStr,
      time: `${data.startStr}-${data.endStr}`,
      hours: data.totalHours,
      price: data.totalPrice,
      needsEngineer: data.needsEngineer,
      engineerFee: data.engineerFee,
      basePrice: data.basePrice,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      notes: data.notes,
      termsAccepted: data.termsAccepted,
      termsAcceptedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  // Send confirmation email via Resend
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Eclipse Productions <bookings@eclipseproductions.fi>",
    to: data.email,
    replyTo: "info@eclipseproductions.fi",
    subject: `Booking Confirmed — ${data.dateStr} ${data.startStr}–${data.endStr}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #000000;">Booking Confirmed ✅</h2>
        <p>Hi ${data.firstName},</p>
        <p>Your studio booking at Eclipse Productions has been confirmed.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Booking Details</h3>
          <p><strong>Date:</strong> ${data.dateStr}</p>
          <p><strong>Time:</strong> ${data.startStr} – ${data.endStr}</p>
          <p><strong>Duration:</strong> ${data.totalHours} hours</p>
          <p><strong>Studio rental:</strong> ${data.basePrice} €</p>
          ${data.needsEngineer ? `<p><strong>Recording engineer:</strong> ${data.engineerFee} €</p>` : ""}
          <p style="font-size: 18px;"><strong>Total:</strong> ${data.totalPrice} €</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Studio Location</h3>
          <p>Sörnäisten rantatie 25 A 541<br>00500 Helsinki</p>
        </div>

        <p>An invoice will be sent to you separately. Payment is required before the session.</p>
        <p>If you have any questions, reply to this email or contact us at info@eclipseproductions.fi</p>
        
        <p>See you at the studio!</p>
        <p><strong>Eclipse Productions Team</strong></p>
      </div>
    `,
  });

  // Also notify the studio owner
  await resend.emails.send({
    from: "Eclipse Productions Booking <bookings@eclipseproductions.fi>",
    to: "info@eclipseproductions.fi",
    subject: `New Booking — ${data.firstName} ${data.lastName} — ${data.dateStr}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Studio Booking</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Customer Details</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Booking Details</h3>
          <p><strong>Date:</strong> ${data.dateStr}</p>
          <p><strong>Time:</strong> ${data.startStr} – ${data.endStr}</p>
          <p><strong>Duration:</strong> ${data.totalHours} hours</p>
          <p><strong>Recording engineer:</strong> ${data.needsEngineer ? "Yes" : "No"}</p>
          <p><strong>Base price:</strong> ${data.basePrice} €</p>
          ${data.needsEngineer ? `<p><strong>Engineer fee:</strong> ${data.engineerFee} €</p>` : ""}
          <p style="font-size: 18px;"><strong>Total:</strong> ${data.totalPrice} €</p>
        </div>
      </div>
    `,
  });

  return { success: true };
});
