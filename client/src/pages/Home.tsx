import { useEffect } from 'react';
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import GallerySection from "@/components/sections/GallerySection";

import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQSection";
import BookingSection from "@/components/sections/BookingSection";
import Particles from "@/components/Particles";

export default function Home() {
  // Back to top button functionality
  useEffect(() => {
    const handleScroll = () => {
      const backToTopBtn = document.getElementById('back-to-top');
      if (!backToTopBtn) return;
      
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg))]">
      <Helmet>
        <title>JDK Party Rentals LLC | 360° Photo Booth & Event Rentals in Central Florida</title>
        <meta
          name="description"
          content="JDK Party Rentals LLC provides 360° photo booth experiences and event rentals across Central Florida. Book birthdays, weddings, school events, and corporate parties."
        />
        <meta
          name="keywords"
          content="JDK Party Rentals, 360 photo booth, party rentals, Winter Haven, Central Florida, wedding photo booth, event rentals"
        />
        <meta property="og:title" content="JDK Party Rentals LLC | 360° Photo Booth & Event Rentals" />
        <meta
          property="og:description"
          content="Create unforgettable memories with JDK Party Rentals LLC. Serving Winter Haven and Central Florida with premium 360° photo booth experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jdkpartyrentalsllc.com/" />
        <link rel="canonical" href="https://www.jdkpartyrentalsllc.com/" />
      </Helmet>
      <Particles />
      <Navbar />
      <main className="pt-[85px]"> {/* This padding creates space for the fixed navbar */}
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <GallerySection />

        <BookingSection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      
      {/* Back to Top Button */}
      <button 
        id="back-to-top" 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[hsl(var(--neon-blue))] rounded-full flex items-center justify-center text-white shadow-neon-blue opacity-0 invisible transition-all duration-300 z-40"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}
