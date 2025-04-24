import React, { useState, useEffect } from 'react';
import { Container } from "@/components/ui/container";
import { NeonButton } from "@/components/ui/NeonButton";
import { smoothScrollTo } from '@/lib/utils';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  
  // Array of section IDs in order of appearance
  const sections = ['hero', 'services', 'features', 'gallery', 'testimonials', 'book-now', 'contact', 'faq'];
  
  // Function to get dynamic gradient based on active section
  const getActiveGradient = () => {
    // Create more dynamic gradient effects based on section
    const gradients = {
      'hero': `linear-gradient(to right, 
                hsla(var(--neon-blue)/0.2), 
                hsla(var(--neon-pink)/0.2))`,
      'services': `linear-gradient(to right, 
                    hsla(var(--neon-blue)/0.25), 
                    hsla(var(--neon-blue)/0.05), 
                    hsla(var(--neon-blue)/0.15))`,
      'features': `linear-gradient(to right, 
                    hsla(var(--neon-purple)/0.2), 
                    hsla(var(--neon-blue)/0.1), 
                    hsla(var(--neon-purple)/0.05))`,
      'gallery': `linear-gradient(to right, 
                    hsla(var(--neon-pink)/0.2), 
                    hsla(var(--neon-purple)/0.1), 
                    hsla(var(--neon-pink)/0.05))`,
      'testimonials': `linear-gradient(to right, 
                        hsla(var(--neon-gold)/0.15), 
                        hsla(var(--neon-pink)/0.05), 
                        hsla(var(--neon-gold)/0.1))`,
      'book-now': `linear-gradient(to right, 
                    hsla(var(--neon-blue)/0.15), 
                    hsla(var(--neon-gold)/0.15), 
                    hsla(var(--neon-blue)/0.1))`,
      'contact': `linear-gradient(to right, 
                    hsla(var(--neon-blue)/0.1), 
                    hsla(var(--neon-gold)/0.1), 
                    hsla(var(--neon-blue)/0.15))`,
      'faq': `linear-gradient(to right, 
                hsla(var(--neon-purple)/0.15), 
                hsla(var(--neon-gold)/0.1), 
                hsla(var(--neon-purple)/0.05))`,
    };
    
    return gradients[activeSection as keyof typeof gradients] || gradients.hero;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleNavClick = (id: string) => {
    if (id === 'about') {
      window.location.href = '/about';
    } else {
      smoothScrollTo(id);
    }
    setMobileMenuOpen(false);
  };

  // Handle scroll effect and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      // Calculate scroll direction and speed
      const timeDiff = currentTime - lastScrollTime;
      if (timeDiff > 0) {
        const pixelsPerMs = Math.abs(currentScrollY - lastScrollY) / timeDiff;
        setScrollSpeed(pixelsPerMs * 100); // Scale for better use
        setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      }
      
      // Update scroll position and time
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
      setLastScrollTime(currentTime);
      
      // Handle navbar background
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Handle active section tracking
      const buffer = 100; // Buffer to account for navbar height
      
      // Find the current active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop - buffer;
          if (currentScrollY >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, lastScrollY, lastScrollTime]);

  // Get navbar height transformation based on scroll
  const getNavbarHeight = () => {
    // Default height
    const defaultHeight = scrolled ? '72px' : '80px';
    
    // When scrolling down, compress navbar slightly
    if (scrollDirection === 'down' && scrollSpeed > 1) {
      return scrolled ? '68px' : '76px';
    }
    
    // When scrolling up quickly, expand navbar slightly for emphasis
    if (scrollDirection === 'up' && scrollSpeed > 4) {
      return scrolled ? '74px' : '82px';
    }
    
    return defaultHeight;
  };
  
  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 content-above-particles transition-all duration-300"
      style={{
        backgroundColor: 'hsla(var(--dark-bg) / 0.9)',
        boxShadow: activeSection ? `0 0 10px 0 hsla(var(--${
          activeSection === 'services' ? 'neon-blue' : 
          activeSection === 'gallery' ? 'neon-pink' :
          activeSection === 'features' ? 'neon-purple' :
          activeSection === 'testimonials' ? 'neon-gold' :
          activeSection === 'contact' ? 'neon-blue' :
          activeSection === 'book-now' ? 'neon-gold' : 'neon-blue'
        }) / 0.5)` : 'none'
      }}
    >
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundImage: getActiveGradient(),
          opacity: 0.7
        }}
      ></div>
      
      <Container className="py-3 md:py-4 relative">
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
              className={`font-medium relative group transition-all duration-300 ${activeSection === 'services' ? 'text-[hsl(var(--neon-blue))] text-glow-blue font-bold nav-active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
            >
              <span className="transition-colors duration-300 group-hover:text-[hsl(var(--neon-blue))] group-hover:text-glow-blue">Services</span>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--neon-blue))] transition-all duration-300 ${activeSection === 'services' ? 'w-full' : 'group-hover:w-full'}`}></span>
            </a>
            <a 
              href="#gallery" 
              className={`font-medium relative group transition-all duration-300 ${activeSection === 'gallery' ? 'text-[hsl(var(--neon-pink))] text-glow-pink font-bold nav-active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}
            >
              <span className="transition-colors duration-300 group-hover:text-[hsl(var(--neon-pink))] group-hover:text-glow-pink">Gallery</span>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--neon-pink))] transition-all duration-300 ${activeSection === 'gallery' ? 'w-full' : 'group-hover:w-full'}`}></span>
            </a>
            <a 
              href="#features" 
              className={`font-medium relative group transition-all duration-300 ${activeSection === 'features' ? 'text-[hsl(var(--neon-purple))] text-glow-purple font-bold nav-active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}
            >
              <span className="transition-colors duration-300 group-hover:text-[hsl(var(--neon-purple))] group-hover:text-glow-purple">Features</span>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--neon-purple))] transition-all duration-300 ${activeSection === 'features' ? 'w-full' : 'group-hover:w-full'}`}></span>
            </a>
            <a 
              href="#testimonials" 
              className={`font-medium relative group transition-all duration-300 ${activeSection === 'testimonials' ? 'text-[hsl(var(--neon-gold))] text-glow-gold font-bold nav-active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }}
            >
              <span className="transition-colors duration-300 group-hover:text-[hsl(var(--neon-gold))] group-hover:text-glow-gold">Testimonials</span>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--neon-gold))] transition-all duration-300 ${activeSection === 'testimonials' ? 'w-full' : 'group-hover:w-full'}`}></span>
            </a>
            <a 
              href="#contact" 
              className={`font-medium relative group transition-all duration-300 ${activeSection === 'contact' ? 'text-[hsl(var(--neon-blue))] text-glow-blue font-bold nav-active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            >
              <span className="transition-colors duration-300 group-hover:text-[hsl(var(--neon-blue))] group-hover:text-glow-blue">Contact</span>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--neon-blue))] transition-all duration-300 ${activeSection === 'contact' ? 'w-full' : 'group-hover:w-full'}`}></span>
            </a>
            <a 
              href="/about" 
              className="font-medium relative group transition-all duration-300"
              onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            >
              <span className="transition-colors duration-300 group-hover:text-[hsl(var(--neon-gold))] group-hover:text-glow-gold">About Us</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--neon-gold))] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          
          {/* CTA Button */}
          <NeonButton 
            color={activeSection === 'book-now' ? 'gold' : 'blue'} 
            size="sm"
            onClick={() => handleNavClick('book-now')}
            className={`transition-all duration-500 ${
              activeSection === 'book-now' 
                ? 'animate-bounce-gentle shadow-lg shadow-[hsla(var(--neon-gold)/0.5)] scale-105' 
                : 'animate-pulse-slow hover:scale-105'
            }`}
          >
            {activeSection === 'book-now' ? 'Booking Now!' : 'Book Now'}
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
      <div className={`bg-gradient-to-br from-[hsla(var(--dark-bg2)/0.9)] to-[hsla(var(--dark-bg)/0.95)] backdrop-blur-sm md:hidden transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <Container className="py-4">
          <div className="flex flex-col gap-4">
            <a 
              href="#services" 
              className={`font-medium py-2 relative overflow-hidden transition-all duration-300`}
              onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
            >
              <div className={`flex items-center ${activeSection === 'services' ? 'text-[hsl(var(--neon-blue))] text-glow-blue font-bold' : ''}`}>
                <span className="transition-all duration-300">Services</span>
                {activeSection === 'services' && <span className="ml-2 text-xs animate-pulse">●</span>}
              </div>
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${activeSection === 'services' ? 'w-full bg-[hsl(var(--neon-blue))]' : 'w-0 bg-transparent'}`}></span>
            </a>
            <a 
              href="#gallery" 
              className={`font-medium py-2 relative overflow-hidden transition-all duration-300`}
              onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}
            >
              <div className={`flex items-center ${activeSection === 'gallery' ? 'text-[hsl(var(--neon-pink))] text-glow-pink font-bold' : ''}`}>
                <span className="transition-all duration-300">Gallery</span>
                {activeSection === 'gallery' && <span className="ml-2 text-xs animate-pulse">●</span>}
              </div>
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${activeSection === 'gallery' ? 'w-full bg-[hsl(var(--neon-pink))]' : 'w-0 bg-transparent'}`}></span>
            </a>
            <a 
              href="#features" 
              className={`font-medium py-2 relative overflow-hidden transition-all duration-300`}
              onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}
            >
              <div className={`flex items-center ${activeSection === 'features' ? 'text-[hsl(var(--neon-purple))] text-glow-purple font-bold' : ''}`}>
                <span className="transition-all duration-300">Features</span>
                {activeSection === 'features' && <span className="ml-2 text-xs animate-pulse">●</span>}
              </div>
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${activeSection === 'features' ? 'w-full bg-[hsl(var(--neon-purple))]' : 'w-0 bg-transparent'}`}></span>
            </a>
            <a 
              href="#testimonials" 
              className={`font-medium py-2 relative overflow-hidden transition-all duration-300`}
              onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }}
            >
              <div className={`flex items-center ${activeSection === 'testimonials' ? 'text-[hsl(var(--neon-gold))] text-glow-gold font-bold' : ''}`}>
                <span className="transition-all duration-300">Testimonials</span>
                {activeSection === 'testimonials' && <span className="ml-2 text-xs animate-pulse">●</span>}
              </div>
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${activeSection === 'testimonials' ? 'w-full bg-[hsl(var(--neon-gold))]' : 'w-0 bg-transparent'}`}></span>
            </a>
            <a 
              href="#contact" 
              className={`font-medium py-2 relative overflow-hidden transition-all duration-300`}
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            >
              <div className={`flex items-center ${activeSection === 'contact' ? 'text-[hsl(var(--neon-blue))] text-glow-blue font-bold' : ''}`}>
                <span className="transition-all duration-300">Contact</span>
                {activeSection === 'contact' && <span className="ml-2 text-xs animate-pulse">●</span>}
              </div>
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${activeSection === 'contact' ? 'w-full bg-[hsl(var(--neon-blue))]' : 'w-0 bg-transparent'}`}></span>
            </a>
            <a 
              href="/about" 
              className="font-medium py-2 text-white hover:text-[hsl(var(--neon-gold))] hover:text-glow-gold transition-colors relative overflow-hidden"
              onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            >
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--neon-gold))] transition-all duration-300 hover:w-full"></span>
            </a>
          </div>
        </Container>
      </div>
    </nav>
  );
}