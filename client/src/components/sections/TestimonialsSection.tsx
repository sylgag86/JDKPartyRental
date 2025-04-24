import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Functions to navigate the slider
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  // Auto-slide effect
  useEffect(() => {
    // Clear previous interval if it exists
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set new interval
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 8000);
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide]);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[hsl(var(--dark-bg))] bg-particles relative content-above-particles">
      <Container>
        <Heading 
          title="WHAT PEOPLE SAY"
          highlighted="WHAT"
          glowColor="purple"
          subtitle="Don't just take our word for it. Hear what our clients have to say about their JDK 360° Photo Booth experience."
        />
        
        {/* Testimonials Slider */}
        <div className="relative max-w-5xl mx-auto overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-full px-4">
                <TestimonialCard 
                  name={testimonial.name}
                  image={testimonial.image}
                  quote={testimonial.quote}
                  event={testimonial.event}
                  location={testimonial.location}
                  color={testimonial.color}
                />
              </div>
            ))}
          </div>
          
          {/* Slider Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-4 h-4 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-[hsl(var(--neon-blue))]' : 'bg-gray-600 hover:bg-[hsl(var(--neon-blue))/0.5]'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
          
          {/* Slider Controls */}
          <button 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[hsl(var(--dark-bg))] rounded-full w-12 h-12 flex items-center justify-center text-white hover:text-[hsl(var(--neon-blue))] transition-colors"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left text-xl"></i>
          </button>
          
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[hsl(var(--dark-bg))] rounded-full w-12 h-12 flex items-center justify-center text-white hover:text-[hsl(var(--neon-blue))] transition-colors"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right text-xl"></i>
          </button>
        </div>
      </Container>
    </section>
  );
}
