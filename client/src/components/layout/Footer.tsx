import React from 'react';
import { Container } from "@/components/ui/container";
import { smoothScrollTo } from '@/lib/utils';

export default function Footer() {
  const handleNavClick = (id: string) => {
    smoothScrollTo(id);
  };

  return (
    <footer className="bg-[hsl(var(--dark-bg2))] pt-16 pb-8 content-above-particles">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-outfit font-bold mb-4">
              <span className="text-[hsl(var(--neon-pink))] text-glow-pink">JDK</span> PARTY RENTALS
            </h3>
            <p className="text-gray-300 mb-6">
              Creating unforgettable moments with our cutting-edge 360° Photo Booth Experience for all your special events.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/JDKPartyRentalsllc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[hsl(var(--dark-bg))] rounded-full flex items-center justify-center text-white hover:bg-[hsl(var(--neon-blue))] transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-outfit font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#services"
                  className="text-gray-300 hover:text-[hsl(var(--neon-blue))] transition-colors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#gallery"
                  className="text-gray-300 hover:text-[hsl(var(--neon-blue))] transition-colors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a 
                  href="#features"
                  className="text-gray-300 hover:text-[hsl(var(--neon-blue))] transition-colors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}
                >
                  Features
                </a>
              </li>

              <li>
                <a 
                  href="#book-now"
                  className="text-gray-300 hover:text-[hsl(var(--neon-blue))] transition-colors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('book-now'); }}
                >
                  Book Now
                </a>
              </li>
            </ul>
          </div>
          
          {/* Event Types */}
          <div>
            <h3 className="text-xl font-outfit font-bold mb-4 text-white">Event Types</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#services"
                  className="text-gray-300 hover:text-[hsl(var(--neon-pink))] transition-colors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
                >
                  Birthday Parties
                </a>
              </li>
              <li>
                <a 
                  href="#services"
                  className="text-gray-300 hover:text-[hsl(var(--neon-pink))] transition-colors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
                >
                  Weddings
                </a>
              </li>
              <li>
                <a 
                  href="#services"
                  className="text-gray-300 hover:text-[hsl(var(--neon-pink))] transition-colors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
                >
                  Baby Showers
                </a>
              </li>
              <li>
                <a 
                  href="#services"
                  className="text-gray-300 hover:text-[hsl(var(--neon-pink))] transition-colors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
                >
                  Corporate Events
                </a>
              </li>
              <li>
                <a 
                  href="#services"
                  className="text-gray-300 hover:text-[hsl(var(--neon-pink))] transition-colors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
                >
                  Graduation Parties
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-outfit font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-[hsl(var(--neon-blue))]"></i>
                <a 
                  href="tel:8633358438" 
                  className="text-gray-300 hover:text-[hsl(var(--neon-blue))] transition-colors"
                >
                  863-335-8438
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-[hsl(var(--neon-pink))]"></i>
                <a 
                  href="mailto:jdkpartyrentalsllc@gmail.com" 
                  className="text-gray-300 hover:text-[hsl(var(--neon-pink))] transition-colors"
                >
                  jdkpartyrentalsllc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fab fa-facebook-f text-[hsl(var(--neon-purple))]"></i>
                <a 
                  href="https://www.facebook.com/JDKPartyRentalsllc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[hsl(var(--neon-purple))] transition-colors"
                >
                  JDK Party Rentals LLC
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-[hsl(var(--neon-gold))]"></i>
                <span className="text-gray-300">Serving Central Florida</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} JDK Party Rentals LLC. All rights reserved.</p>
          <p>
            <a 
              href="/admin" 
              className="text-gray-500 hover:text-[hsl(var(--neon-blue))] transition-colors text-xs"
            >
              Admin Dashboard
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
