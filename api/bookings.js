import { sendEmail, json } from "./_email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, phone, eventType, eventDate, eventLocation, message } = req.body || {};

    if (!name || !email || !phone || !eventType || !eventDate || !eventLocation) {
      return json(res, 400, { success: false, message: "Missing required booking fields" });
    }

    const subject = `New Booking Request: ${name} (${eventType})`;
    const text = [
      "New booking request received:",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Event Type: ${eventType}`,
      `Event Date: ${eventDate}`,
      `Event Location: ${eventLocation}`,
      `Notes: ${message || "N/A"}`,
    ].join("\n");

    const html = `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Event Date:</strong> ${eventDate}</p>
      <p><strong>Event Location:</strong> ${eventLocation}</p>
      <p><strong>Notes:</strong> ${message || "N/A"}</p>
    `;

    await sendEmail(subject, text, html);

    return json(res, 201, {
      success: true,
      message: "Booking created successfully!",
      booking: { id: Date.now() },
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return json(res, 500, { success: false, message: "An error occurred while processing your request" });
  }
}
