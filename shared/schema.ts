import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: date("event_date").notNull(),
  eventLocation: text("event_location").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("pending"),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: date("event_date").notNull(),
  eventLocation: text("event_location").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("unread"),
});

// User schema
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Booking schema
export const insertBookingSchema = createInsertSchema(bookings).pick({
  name: true,
  email: true,
  phone: true,
  eventType: true,
  eventDate: true,
  eventLocation: true,
  message: true,
});

// Contact submission schema
export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  phone: true,
  eventType: true,
  eventDate: true,
  eventLocation: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
