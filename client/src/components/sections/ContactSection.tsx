import React, { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { NeonButton } from '@/components/ui/NeonButton';
import { ContactCard } from '@/components/ui/ContactCard';
import { submitContactForm } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.eventType || !formData.eventDate || !formData.eventLocation) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast({
          title: "Booking Request Sent!",
          description: "We'll contact you shortly to confirm your reservation.",
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          eventLocation: '',
          message: ''
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-now" className="py-16 md:py-24 bg-[hsl(var(--dark-bg2))] content-above-particles">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div className="bg-[hsl(var(--dark-bg))] rounded-xl p-8 border border-[hsl(var(--neon-pink))/0.3]">
            <Heading 
              title="BOOK YOUR EXPERIENCE"
              highlighted="BOOK"
              glowColor="pink"
              center={true}
              className="mb-6"
            />
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                  Your Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--dark-bg2))] border border-gray-700 text-white rounded-lg p-3 focus:border-[hsl(var(--neon-pink))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-pink))/0.5] transition-all" 
                  required 
                />
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--dark-bg2))] border border-gray-700 text-white rounded-lg p-3 focus:border-[hsl(var(--neon-pink))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-pink))/0.5] transition-all" 
                  required 
                />
              </div>
              
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2 font-medium">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--dark-bg2))] border border-gray-700 text-white rounded-lg p-3 focus:border-[hsl(var(--neon-pink))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-pink))/0.5] transition-all" 
                  required 
                />
              </div>
              
              {/* Event Type */}
              <div>
                <label htmlFor="eventType" className="block text-gray-300 mb-2 font-medium">
                  Event Type
                </label>
                <select 
                  id="eventType" 
                  name="eventType" 
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--dark-bg2))] border border-gray-700 text-white rounded-lg p-3 focus:border-[hsl(var(--neon-pink))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-pink))/0.5] transition-all" 
                  required
                >
                  <option value="" disabled>Select Event Type</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="wedding">Wedding</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Event Date */}
              <div>
                <label htmlFor="eventDate" className="block text-gray-300 mb-2 font-medium">
                  Event Date
                </label>
                <input 
                  type="date" 
                  id="eventDate" 
                  name="eventDate" 
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--dark-bg2))] border border-gray-700 text-white rounded-lg p-3 focus:border-[hsl(var(--neon-pink))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-pink))/0.5] transition-all" 
                  required 
                />
              </div>
              
              {/* Event Location */}
              <div>
                <label htmlFor="eventLocation" className="block text-gray-300 mb-2 font-medium">
                  Event Location
                </label>
                <input 
                  type="text" 
                  id="eventLocation" 
                  name="eventLocation" 
                  value={formData.eventLocation}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--dark-bg2))] border border-gray-700 text-white rounded-lg p-3 focus:border-[hsl(var(--neon-pink))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-pink))/0.5] transition-all" 
                  required 
                />
              </div>
              
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                  Additional Information
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--dark-bg2))] border border-gray-700 text-white rounded-lg p-3 focus:border-[hsl(var(--neon-pink))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-pink))/0.5] transition-all"
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <div>
                <NeonButton 
                  type="submit" 
                  color="pink" 
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'BOOK NOW'} 
                  {!isSubmitting && <i className="fas fa-arrow-right ml-2"></i>}
                </NeonButton>
              </div>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <Heading 
                title="CONTACT INFORMATION"
                highlighted="CONTACT"
                glowColor="blue"
                center={false}
                className="mb-6"
              />
              
              {/* Phone */}
              <ContactCard
                icon="fas fa-phone"
                title="Call or Text"
                color="blue"
                content={
                  <a 
                    href="tel:8633358438" 
                    className="hover:text-[hsl(var(--neon-blue))] transition-colors"
                  >
                    863-335-8438
                  </a>
                }
              />
              
              {/* Email */}
              <ContactCard
                icon="fas fa-envelope"
                title="Email Us"
                color="pink"
                content={
                  <a 
                    href="mailto:jdkpartyrentalsllc@gmail.com" 
                    className="hover:text-[hsl(var(--neon-pink))] transition-colors"
                  >
                    jdkpartyrentalsllc@gmail.com
                  </a>
                }
              />
              
              {/* Instagram */}
              <ContactCard
                icon="fab fa-instagram"
                title="Follow Us"
                color="purple"
                content={
                  <a 
                    href="https://www.instagram.com/jdkpartyrentalsllc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[hsl(var(--neon-purple))] transition-colors"
                  >
                    @jdkpartyrentalsllc
                  </a>
                }
              />
            </div>
            
            {/* Service Areas */}
            <div className="bg-[hsl(var(--dark-bg))] p-6 rounded-xl border border-[hsl(var(--neon-gold))/0.3] mt-8">
              <h3 className="text-xl font-outfit font-bold mb-4 text-[hsl(var(--neon-gold))]">
                Service Areas
              </h3>
              <p className="text-gray-300 mb-4">
                We provide our 360° Photo Booth services throughout Central Florida, including:
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-[hsl(var(--neon-gold))]"></i>
                  <span>Tampa</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-[hsl(var(--neon-gold))]"></i>
                  <span>Orlando</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-[hsl(var(--neon-gold))]"></i>
                  <span>Lakeland</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-[hsl(var(--neon-gold))]"></i>
                  <span>St. Petersburg</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-[hsl(var(--neon-gold))]"></i>
                  <span>Sarasota</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-[hsl(var(--neon-gold))]"></i>
                  <span>And surrounding areas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
