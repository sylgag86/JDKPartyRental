import { useEffect } from 'react';
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function BookingSection() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
          <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-neon-blue h-[650px] md:h-[700px]">
            {/* Calendly inline widget */}
            <div 
              className="calendly-inline-widget w-full h-full" 
              data-url="https://calendly.com/your-calendly-username/360-photo-booth-booking"
              style={{ minWidth: '320px' }}
            ></div>
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