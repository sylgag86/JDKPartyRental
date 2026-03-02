import { Resend } from "resend";

const bookingInbox = process.env.BOOKING_NOTIFICATION_EMAIL || "jdkpartyrentalsllc@gmail.com";
const fromEmail = process.env.RESEND_FROM_EMAIL || bookingInbox;

export async function sendEmail(subject, text, html) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: fromEmail,
    to: bookingInbox,
    subject,
    text,
    html,
    replyTo: bookingInbox,
  });
}

export function json(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}
