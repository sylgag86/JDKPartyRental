import { sendEmail, json } from "./_email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, phone, eventType, eventDate, eventLocation, message } = req.body || {};

    if (!name || !email || !phone || !eventType || !eventDate || !eventLocation) {
      return json(res, 400, { success: false, message: "Missing required contact fields" });
    }

    const subject = `New Contact Submission: ${name}`;
    const text = [
      "New contact form submission received:",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Event Type: ${eventType}`,
      `Event Date: ${eventDate}`,
      `Event Location: ${eventLocation}`,
      `Message: ${message || "N/A"}`,
    ].join("\n");

    const html = `
      <h2>New Contact Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Event Date:</strong> ${eventDate}</p>
      <p><strong>Event Location:</strong> ${eventLocation}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    `;

    await sendEmail(subject, text, html);

    return json(res, 200, {
      success: true,
      message: "Form submitted successfully!",
      submission: { id: Date.now() },
    });
  } catch (error) {
    console.error("Error handling contact submission:", error);
    return json(res, 500, { success: false, message: "An error occurred while processing your request" });
  }
}
