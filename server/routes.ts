import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for handling contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      // Parse and validate the request data using Zod schema
      const formData = insertContactSchema.safeParse(req.body);
      
      if (!formData.success) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid form data', 
          errors: formData.error.format() 
        });
      }
      
      // Save to database
      const submission = await storage.submitContactForm(formData.data);
      
      // Send success response
      res.status(200).json({ 
        success: true, 
        message: 'Form submitted successfully!',
        submission: { id: submission.id }
      });
    } catch (error) {
      console.error('Error handling contact form submission:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while processing your request' 
      });
    }
  });

  // API route for creating bookings
  app.post('/api/bookings', async (req, res) => {
    try {
      // Parse and validate the request data using Zod schema
      const bookingData = insertBookingSchema.safeParse(req.body);
      
      if (!bookingData.success) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid booking data', 
          errors: bookingData.error.format() 
        });
      }
      
      // Save to database
      const booking = await storage.createBooking(bookingData.data);
      
      // Send success response
      res.status(201).json({ 
        success: true, 
        message: 'Booking created successfully!',
        booking: { id: booking.id }
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while processing your request' 
      });
    }
  });

  // API route for retrieving bookings
  app.get('/api/bookings', async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.status(200).json({ bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while fetching bookings' 
      });
    }
  });

  // API route for retrieving a specific booking
  app.get('/api/bookings/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid booking ID' 
        });
      }
      
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ 
          success: false, 
          message: 'Booking not found' 
        });
      }
      
      res.status(200).json({ booking });
    } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while fetching the booking' 
      });
    }
  });

  // API route for updating booking status
  app.patch('/api/bookings/:id/status', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid booking ID' 
        });
      }
      
      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: 'Status is required and must be a string' 
        });
      }
      
      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ 
          success: false, 
          message: 'Booking not found' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Booking status updated successfully', 
        booking 
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while updating the booking status' 
      });
    }
  });

  // API routes for contact submissions
  app.get('/api/contact-submissions', async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.status(200).json({ submissions });
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while fetching contact submissions' 
      });
    }
  });

  app.get('/api/contact-submissions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid submission ID' 
        });
      }
      
      const submission = await storage.getContactSubmission(id);
      if (!submission) {
        return res.status(404).json({ 
          success: false, 
          message: 'Submission not found' 
        });
      }
      
      res.status(200).json({ submission });
    } catch (error) {
      console.error('Error fetching contact submission:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while fetching the submission' 
      });
    }
  });

  app.patch('/api/contact-submissions/:id/status', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid submission ID' 
        });
      }
      
      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: 'Status is required and must be a string' 
        });
      }
      
      const submission = await storage.updateContactSubmissionStatus(id, status);
      if (!submission) {
        return res.status(404).json({ 
          success: false, 
          message: 'Submission not found' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Submission status updated successfully', 
        submission 
      });
    } catch (error) {
      console.error('Error updating submission status:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while updating the submission status' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
