import { Resend } from "resend";

type BookingNotificationInput = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  message?: string | null;
};

type ContactNotificationInput = BookingNotificationInput;

const bookingInbox = process.env.BOOKING_NOTIFICATION_EMAIL || "jdkpartyrentalsllc@gmail.com";
const fromEmail = process.env.RESEND_FROM_EMAIL || "JDK Party Rentals <onboarding@resend.dev>";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

async function sendEmail(subject: string, text: string, html: string, replyTo?: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set. Skipping notification email.");
    return;
  }

  const { data, error } = await resend.emails.send({
    to: bookingInbox,
    from: fromEmail,
    subject,
    text,
    html,
    replyTo: replyTo || bookingInbox,
  });

  if (error) {
    console.error("Resend API error:", error);
    throw new Error(error.message || "Resend failed to send email");
  }

  if (!data?.id) {
    throw new Error("Resend did not return an email id");
  }
}

export async function sendBookingNotification(data: BookingNotificationInput) {
  const subject = `New Booking Request: ${data.name} (${data.eventType})`;
  const text = [
    "New booking request received:",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Event Type: ${data.eventType}`,
    `Event Date: ${data.eventDate}`,
    `Event Location: ${data.eventLocation}`,
    `Notes: ${data.message || "N/A"}`,
  ].join("\n");

  const html = `
    <h2>New Booking Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Event Type:</strong> ${data.eventType}</p>
    <p><strong>Event Date:</strong> ${data.eventDate}</p>
    <p><strong>Event Location:</strong> ${data.eventLocation}</p>
    <p><strong>Notes:</strong> ${data.message || "N/A"}</p>
  `;

  await sendEmail(subject, text, html, data.email);
}

export async function sendContactNotification(data: ContactNotificationInput) {
  const subject = `New Contact Submission: ${data.name}`;
  const text = [
    "New contact form submission received:",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Event Type: ${data.eventType}`,
    `Event Date: ${data.eventDate}`,
    `Event Location: ${data.eventLocation}`,
    `Message: ${data.message || "N/A"}`,
  ].join("\n");

  const html = `
    <h2>New Contact Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Event Type:</strong> ${data.eventType}</p>
    <p><strong>Event Date:</strong> ${data.eventDate}</p>
    <p><strong>Event Location:</strong> ${data.eventLocation}</p>
    <p><strong>Message:</strong> ${data.message || "N/A"}</p>
  `;

  await sendEmail(subject, text, html, data.email);
}
