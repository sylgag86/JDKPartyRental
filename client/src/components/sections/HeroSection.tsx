import React from 'react';
import { Container } from '@/components/ui/container';
import { NeonButton } from '@/components/ui/NeonButton';
import { smoothScrollTo } from '@/lib/utils';

export default function HeroSection() {
  const handleLearnMore = () => {
    smoothScrollTo('services');
  };

  const handleBookNow = () => {
    smoothScrollTo('book-now');
  };

  return (
    <section id="hero" className="relative min-h-screen bg-[hsl(var(--dark-bg))] bg-particles pt-24 overflow-hidden content-above-particles">
      <Container className="py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Hero Text */}
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <h1 className="text-5xl md:text-7xl font-black font-outfit mb-6 leading-tight">
              <span className="text-[hsl(var(--neon-blue))] text-glow-blue animate-glow-blue">360°</span>
              <span className="block md:inline-block text-white">PHOTO BOOTH</span>
              <span className="block text-[hsl(var(--neon-gold))] text-glow-gold animate-glow-gold text-4xl md:text-5xl mt-2">
                EXPERIENCE
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Create unforgettable memories with our state-of-the-art 360° photo booth. Perfect for any event to make your special day truly unique!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <NeonButton 
                color="pink" 
                size="lg"
                onClick={handleBookNow}
              >
                BOOK NOW
              </NeonButton>
              
              <NeonButton 
                color="blue" 
                variant="outline" 
                size="lg"
                onClick={handleLearnMore}
              >
                Learn More
              </NeonButton>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <i className="fas fa-birthday-cake text-[hsl(var(--neon-blue))]"></i>
                <span>Birthday Parties</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-ring text-[hsl(var(--neon-pink))]"></i>
                <span>Weddings</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-baby text-[hsl(var(--neon-purple))]"></i>
                <span>Baby Showers</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-briefcase text-[hsl(var(--neon-gold))]"></i>
                <span>Corporate Events</span>
              </div>
            </div>
          </div>
          
          {/* Hero Video */}
          <div className="lg:w-1/2 relative animate-float">
            <div className="relative">
              <div className="rounded-xl shadow-2xl relative z-10 overflow-hidden w-full aspect-[9/16] md:aspect-video">
                <iframe 
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fjdkpartyrentalsllc%2Fvideos%2F651341327868884%2F&width=500&show_text=false&height=280&appId" 
                  className="w-full h-full border-0"
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
              
              {/* Glow Effect around video */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-pink))] opacity-50 blur-xl z-0"></div>
              
              {/* Floating elements */}
              <img 
                src="https://img.icons8.com/nolan/64/camera.png" 
                alt="Camera Icon" 
                className="absolute -top-10 -right-10 z-20 animate-float"
              />
              <div className="absolute -bottom-5 -left-5 w-24 h-24 rounded-full bg-[hsl(var(--dark-bg))] border-2 border-[hsl(var(--neon-gold))] shadow-neon-gold animate-pulse-light z-20"></div>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 md:h-24"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#121212"
          ></path>
        </svg>
      </div>
    </section>
  );
}
