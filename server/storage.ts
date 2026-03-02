import { 
  users, 
  type User, 
  type InsertUser,
  bookings,
  type Booking,
  type InsertBooking,
  contactSubmissions,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";
import { db, hasDatabase } from "./db";

const database = db!;
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Contact form operations
  submitContactForm(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await database.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await database.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await database.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Booking operations
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await database.insert(bookings).values(booking).returning();
    return newBooking;
  }
  
  async getBookings(): Promise<Booking[]> {
    return await database.select().from(bookings).orderBy(bookings.createdAt);
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await database.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [updatedBooking] = await database
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return updatedBooking;
  }
  
  // Contact form operations
  async submitContactForm(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await database.insert(contactSubmissions).values(submission).returning();
    return newSubmission;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await database.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }
  
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await database.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }
  
  async updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission | undefined> {
    const [updatedSubmission] = await database
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updatedSubmission;
  }
}

// For backwards compatibility
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookings: Map<number, Booking>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private userId: number;
  private bookingId: number;
  private submissionId: number;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.contactSubmissions = new Map();
    this.userId = 1;
    this.bookingId = 1;
    this.submissionId = 1;
    console.warn("Warning: Using in-memory storage. Data will be lost when the server restarts.");
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const newBooking: Booking = {
      id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      eventType: booking.eventType,
      eventDate: booking.eventDate,
      eventLocation: booking.eventLocation,
      message: booking.message ?? null,
      createdAt: new Date(),
      status: "pending",
    };

    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort((a, b) => {
      return (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0);
    });
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const existing = this.bookings.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, status };
    this.bookings.set(id, updated);
    return updated;
  }

  async submitContactForm(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.submissionId++;
    const newSubmission: ContactSubmission = {
      id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      eventType: submission.eventType,
      eventDate: submission.eventDate,
      eventLocation: submission.eventLocation,
      message: submission.message ?? null,
      createdAt: new Date(),
      status: "unread",
    };

    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => {
      return (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0);
    });
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }

  async updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission | undefined> {
    const existing = this.contactSubmissions.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, status };
    this.contactSubmissions.set(id, updated);
    return updated;
  }
}

// Use database when configured, otherwise use in-memory fallback
export const storage = hasDatabase ? new DatabaseStorage() : new MemStorage();
