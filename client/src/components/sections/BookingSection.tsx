import { useEffect, useState } from 'react';
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { NeonButton } from "@/components/ui/NeonButton";

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function BookingSection() {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const [calendlyError, setCalendlyError] = useState(false);
  
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      setIsCalendlyLoaded(true);
      setCalendlyError(false);
    };
    
    script.onerror = () => {
      setCalendlyError(true);
    };
    
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      try {
        document.body.removeChild(script);
      } catch (e) {
        // Script might have been removed already
      }
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
          <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-neon-blue h-[650px] md:h-[700px] bg-[hsl(var(--dark-bg2))]">
            {calendlyError ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="text-red-400 text-5xl mb-4">
                  <i className="fas fa-exclamation-circle"></i>
                </div>
                <h3 className="text-2xl font-bold mb-3">Unable to load booking calendar</h3>
                <p className="mb-6 text-gray-300">
                  To connect your Calendly account, edit the URL in the BookingSection.tsx file.
                </p>
                <div className="bg-[hsl(var(--dark-bg))] p-4 rounded-lg text-left w-full max-w-md overflow-auto mb-6">
                  <code className="text-sm text-gray-300">
                    <pre className="whitespace-pre-wrap">
                      {`data-url="https://calendly.com/YOUR_USERNAME/service"`}
                    </pre>
                  </code>
                </div>
                <NeonButton 
                  color="purple" 
                  onClick={() => window.location.href="#contact"}
                >
                  Contact Us Directly
                </NeonButton>
              </div>
            ) : !isCalendlyLoaded ? (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="w-16 h-16 border-t-4 border-b-4 border-[hsl(var(--neon-purple))] rounded-full animate-spin mb-4"></div>
                <p className="text-lg">Loading booking calendar...</p>
              </div>
            ) : (
              <div 
                className="calendly-inline-widget w-full h-full" 
                data-url="https://calendly.com/your-calendly-username/360-photo-booth-booking?hide_gdpr_banner=1"
                style={{ minWidth: '320px' }}
              ></div>
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