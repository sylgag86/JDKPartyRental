import sgMail from "@sendgrid/mail";

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
const fromEmail = process.env.SENDGRID_FROM_EMAIL || bookingInbox;

const hasSendgrid = Boolean(process.env.SENDGRID_API_KEY);
if (hasSendgrid) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
}

async function sendEmail(subject: string, text: string, html: string) {
  if (!hasSendgrid) {
    console.warn("SENDGRID_API_KEY not set. Skipping notification email.");
    return;
  }

  await sgMail.send({
    to: bookingInbox,
    from: fromEmail,
    subject,
    text,
    html,
    replyTo: bookingInbox,
  });
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

  await sendEmail(subject, text, html);
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

  await sendEmail(subject, text, html);
}
