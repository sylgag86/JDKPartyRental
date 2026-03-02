import { useState } from 'react';
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { NeonButton } from "@/components/ui/NeonButton";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, addMonths, startOfDay, getDay, isSameDay, setHours, setMinutes } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';
import { insertBookingSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Extended booking schema for the form
const bookingFormSchema = insertBookingSchema.extend({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }).max(15),
  eventDate: z.date({
    required_error: "Please select a date.",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot.",
  }),
  eventLocation: z.string().min(5, {
    message: "Please enter the event location.",
  }),
  eventType: z.string({
    required_error: "Please select an event type.",
  }),
  additionalNotes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Function to check if a time slot is available
// In a real app, this would check against the database
const isTimeSlotAvailable = (date: Date, hour: number): boolean => {
  // Example: weekend time slots are 12pm to 11pm, weekday 5pm to 11pm
  const dayOfWeek = getDay(date);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // For demo purposes, make some slots unavailable
  if (hour === 19 && isSameDay(date, addDays(new Date(), 3))) return false;
  if (hour === 18 && isSameDay(date, addDays(new Date(), 5))) return false;
  if (hour === 20 && isSameDay(date, addDays(new Date(), 7))) return false;
  
  if (isWeekend) {
    return hour >= 12 && hour <= 22; // 12pm to 10pm on weekends
  } else {
    return hour >= 17 && hour <= 22; // 5pm to 10pm on weekdays
  }
};

// Generate time slots for a given date
const generateTimeSlots = (date: Date) => {
  const timeSlots = [];
  const dayOfWeek = getDay(date);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Start at noon (12pm) for weekends, 5pm for weekdays
  const startHour = isWeekend ? 12 : 17;
  const endHour = 22; // End at 10pm
  
  for (let hour = startHour; hour <= endHour; hour++) {
    // Each event lasts 2 hours
    const startTime = setHours(setMinutes(date, 0), hour);
    const endTime = setHours(setMinutes(date, 0), hour + 2);
    
    // Check if this time slot is available
    if (isTimeSlotAvailable(date, hour)) {
      timeSlots.push({
        value: format(startTime, "HH:mm"),
        label: `${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}`,
        disabled: false
      });
    } else {
      timeSlots.push({
        value: format(startTime, "HH:mm"),
        label: `${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")} (Unavailable)`,
        disabled: true
      });
    }
  }
  
  return timeSlots;
};

const eventTypes = [
  { value: "wedding", label: "Wedding" },
  { value: "birthday", label: "Birthday Party" },
  { value: "corporate", label: "Corporate Event" },
  { value: "graduation", label: "Graduation" },
  { value: "holiday", label: "Holiday Party" },
  { value: "other", label: "Other" },
];

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<{ value: string; label: string; disabled: boolean }[]>([]);
  const [bookingStep, setBookingStep] = useState<'date' | 'details' | 'confirmation'>('date');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const { toast } = useToast();
  
  // Set up form with default values
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventLocation: "",
      additionalNotes: "",
    }
  });
  
  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      form.setValue("eventDate", date, { shouldValidate: true });
      form.setValue("timeSlot", "", { shouldValidate: false });
      // Generate time slots for the selected date
      setTimeSlots(generateTimeSlots(date));
    } else {
      setSelectedDate(undefined);
      form.setValue("timeSlot", "", { shouldValidate: false });
      setTimeSlots([]);
    }
  };
  
  // Move to details form after date and time selection
  const handleContinueToDetails = () => {
    const timeSlot = form.getValues("timeSlot");

    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a date for your event",
        variant: "destructive",
      });
      return;
    }

    if (!timeSlot) {
      toast({
        title: "Time Required",
        description: "Please select a time slot for your event",
        variant: "destructive",
      });
      return;
    }

    const selectedSlot = timeSlots.find((slot) => slot.value === timeSlot);
    if (!selectedSlot || selectedSlot.disabled) {
      toast({
        title: "Invalid Time Slot",
        description: "Please choose an available time slot.",
        variant: "destructive",
      });
      return;
    }

    setBookingStep('details');
  };
  
  // Back to date selection
  const handleBackToDateSelection = () => {
    setBookingStep('date');
  };
  
  // Submit booking form
  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Keep DB payload aligned with shared booking schema (date column + message field)
      const bookingData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        eventType: data.eventType,
        eventDate: format(data.eventDate, "yyyy-MM-dd"),
        eventLocation: data.eventLocation,
        message: data.additionalNotes || "",
      };
      
      // Send booking to backend
      await apiRequest('/api/bookings', 'POST', bookingData);
      
      // Handle successful booking
      setBookingComplete(true);
      setBookingStep('confirmation');
      
      toast({
        title: "Booking Successful",
        description: "Your booking request has been received!",
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Calculate disabled dates (past dates)
  const today = startOfDay(new Date());
  const disabledDates = {
    before: today,
    after: addMonths(today, 6) // Allow booking up to 6 months in advance
  };

  return (
    <section id="book-now" className="py-20 relative overflow-hidden">
      <Container>
        <Heading
          title="Book Your 360° Photo Booth"
          subtitle="Select a date and time that works for you"
          glowColor="purple"
          center
        />
        
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-neon-purple h-auto bg-[hsl(var(--dark-bg2))] p-8">
            {bookingComplete ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Booking Successful!</h3>
                <p className="text-lg mb-8 text-gray-300 max-w-md">
                  Thank you for booking with JDK Party Rentals. We'll be in touch shortly to confirm your appointment.
                </p>
                <NeonButton 
                  color="purple" 
                  onClick={() => {
                    setBookingComplete(false);
                    setBookingStep('date');
                    form.reset();
                    setSelectedDate(undefined);
                    setTimeSlots([]);
                  }}
                >
                  Book Another Time
                </NeonButton>
              </div>
            ) : (
              <div>
                {bookingStep === 'date' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-white">Select a Date</h3>
                      <div className="bg-[hsl(var(--dark-bg))] p-4 rounded-lg flex justify-center md:justify-start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={disabledDates}
                          className="rounded-md border border-[hsl(var(--neon-purple))]"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-white">Select a Time Slot</h3>
                      {selectedDate ? (
                        <div>
                          <p className="mb-4 text-gray-300">
                            Selected Date: <span className="text-white font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                          </p>
                          
                          <Form {...form}>
                            <form>
                              <FormField
                                control={form.control}
                                name="timeSlot"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel>Available Time Slots</FormLabel>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                      >
                                        {timeSlots.length > 0 ? (
                                          timeSlots.map((slot) => (
                                            <div key={slot.value} className={`flex items-center space-x-2 rounded-md border p-3 ${slot.disabled ? 'opacity-50' : 'hover:bg-[hsl(var(--dark-bg))]'}`}>
                                              <RadioGroupItem
                                                value={slot.value}
                                                id={slot.value}
                                                disabled={slot.disabled}
                                              />
                                              <Label htmlFor={slot.value} className={slot.disabled ? 'line-through' : ''}>
                                                {slot.label}
                                              </Label>
                                            </div>
                                          ))
                                        ) : (
                                          <p className="text-amber-400">
                                            No time slots available for this date. Please select another date.
                                          </p>
                                        )}
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="mt-6">
                                <NeonButton
                                  color="purple"
                                  onClick={handleContinueToDetails}
                                  type="button"
                                  className="w-full"
                                >
                                  Continue to Details
                                </NeonButton>
                              </div>
                            </form>
                          </Form>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-6 bg-[hsl(var(--dark-bg))] rounded-lg">
                          <p className="text-gray-300">Please select a date from the calendar to view available time slots.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {bookingStep === 'details' && (
                  <div>
                    <div className="flex items-center mb-6">
                      <button
                        type="button"
                        className="flex items-center text-gray-400 hover:text-white mr-4"
                        onClick={handleBackToDateSelection}
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back
                      </button>
                      <h3 className="text-xl font-semibold text-white">Enter Your Details</h3>
                    </div>
                    
                    <div className="bg-[hsl(var(--dark-bg))] p-6 rounded-lg mb-6">
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="bg-[hsl(var(--neon-purple-alpha))] px-4 py-2 rounded-md text-white">
                          <span className="font-medium">Date:</span> {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                        </div>
                        <div className="bg-[hsl(var(--neon-blue-alpha))] px-4 py-2 rounded-md text-white">
                          <span className="font-medium">Time:</span> {form.getValues("timeSlot") && 
                            (() => {
                              const timeSlot = timeSlots.find(slot => slot.value === form.getValues("timeSlot"));
                              return timeSlot ? timeSlot.label : form.getValues("timeSlot");
                            })()
                          }
                        </div>
                      </div>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="john@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(123) 456-7890" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="eventType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Event Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select event type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {eventTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="eventLocation"
                              render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2">
                                  <FormLabel>Event Location</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123 Main St, City, State, Zip" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="additionalNotes"
                              render={({ field }) => (
                                <FormItem className="col-span-1 md:col-span-2">
                                  <FormLabel>Additional Notes (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Any special requests or details about your event" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <NeonButton
                            type="submit"
                            color="purple"
                            className="w-full"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="mr-2">Submitting</span>
                                <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                              </>
                            ) : (
                              "Complete Booking"
                            )}
                          </NeonButton>
                        </form>
                      </Form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-10 text-center text-lg">
          <p className="text-gray-300">
            Need assistance with booking? <a href="#contact" className="text-[hsl(var(--neon-purple))] hover:text-[hsl(var(--neon-blue))] transition-colors">Contact us</a> and we'll help you find the perfect time slot.
          </p>
        </div>
      </Container>
      
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[hsl(var(--neon-purple))] opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[hsl(var(--neon-blue))] opacity-10 blur-3xl"></div>
    </section>
  );
}