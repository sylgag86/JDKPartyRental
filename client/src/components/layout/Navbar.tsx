import React, { useState, useEffect } from 'react';
import { Container } from "@/components/ui/container";
import { NeonButton } from "@/components/ui/NeonButton";
import { smoothScrollTo } from '@/lib/utils';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleNavClick = (id: string) => {
    smoothScrollTo(id);
    setMobileMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full bg-[hsl(var(--dark-bg))] z-50 content-above-particles transition-all duration-300 ${scrolled ? 'bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg' : 'bg-opacity-50'}`}>
      <Container className="py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" onClick={() => handleNavClick('hero')}>
            <span className="text-3xl font-bold font-outfit text-[hsl(var(--neon-pink))] text-glow-pink animate-glow-pink">JDK</span>
            <span className="hidden md:inline-block text-xl font-semibold text-white">Party Rentals</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#services" 
              className="font-medium hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
            >
              Services
            </a>
            <a 
              href="#gallery" 
              className="font-medium hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}
            >
              Gallery
            </a>
            <a 
              href="#features" 
              className="font-medium hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="font-medium hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="font-medium hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            >
              Contact
            </a>
          </div>
          
          {/* CTA Button */}
          <NeonButton 
            color="blue" 
            size="sm"
            onClick={() => handleNavClick('book-now')}
          >
            Book Now
          </NeonButton>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      <div className={`bg-[hsl(var(--dark-bg2))] md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <Container className="py-4">
          <div className="flex flex-col gap-4">
            <a 
              href="#services" 
              className="font-medium py-2 hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
            >
              Services
            </a>
            <a 
              href="#gallery" 
              className="font-medium py-2 hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}
            >
              Gallery
            </a>
            <a 
              href="#features" 
              className="font-medium py-2 hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="font-medium py-2 hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="font-medium py-2 hover:text-[hsl(var(--neon-blue))] transition-colors"
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            >
              Contact
            </a>
          </div>
        </Container>
      </div>
    </nav>
  );
}
