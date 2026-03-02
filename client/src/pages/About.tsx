import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { NeonButton } from "@/components/ui/NeonButton";
import { smoothScrollTo } from "@/lib/utils";

export default function About() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg))]">
      <Helmet>
        <title>JDK Party Rentals LLC - Premier Party Rental Supplier in Central Florida</title>
        <meta name="description" content="JDK Party Rentals LLC is Central Florida's premier party rental service offering 360° photo booths, event equipment, and exceptional customer service for weddings, corporate events, and celebrations in Orlando, Tampa, and surrounding areas." />
        <meta name="keywords" content="party rentals, event rentals, photo booth, 360 photo booth, Central Florida, Orlando, Tampa, wedding rentals, corporate event rentals, JDK Party Rentals" />
        <meta property="og:title" content="JDK Party Rentals LLC - Premier Party Rental Supplier in Central Florida" />
        <meta property="og:description" content="Central Florida's premier party rental service offering 360° photo booths, event equipment, and exceptional customer service." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jdkpartyrentalsllc.com/about" />
        <meta property="og:image" content="/assets/gallery/IMG_0574.jpeg" />
        <link rel="canonical" href="https://www.jdkpartyrentalsllc.com/about" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-[85px]"> {/* Extra padding for fixed navbar */}
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative bg-gradient-to-b from-[hsl(var(--dark-bg))] to-[hsl(var(--dark-bg2))]">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Central Florida's{" "}
                <span className="text-[hsl(var(--neon-gold))] text-glow-gold animate-glow-gold">
                  Premier
                </span>{" "}
                Party Rental Supplier
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Serving Orlando, Tampa, and surrounding areas with exceptional event rental services
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <NeonButton 
                  color="blue" 
                  onClick={() => smoothScrollTo("services")}
                  size="lg"
                  className="shadow-xl"
                >
                  Explore Our Services
                </NeonButton>
                
                <NeonButton 
                  color="pink" 
                  variant="outline"
                  onClick={() => window.location.href = "/"}
                  size="lg"
                >
                  Back to Home
                </NeonButton>
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
        
        {/* About Us Section */}
        <section id="about" className="py-20 relative bg-[hsl(var(--dark-bg))]">
          <Container>
            <Heading
              title="About JDK Party Rentals"
              subtitle="Your trusted partner for memorable events across Central Florida"
              center
              glowColor="blue"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold mb-4 text-white">Our Story</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Founded with a passion for creating unforgettable experiences, JDK Party Rentals LLC has quickly established itself as the premier party rental service in Central Florida. What started as a small family business has grown into the region's most trusted name in event rentals.
                </p>
                
                <h3 className="text-2xl font-bold mb-4 text-white">Our Commitment</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  At JDK Party Rentals, we're committed to providing exceptional quality, reliability, and customer service. From our state-of-the-art 360° photo booths to our comprehensive event rental equipment, we ensure every detail of your event is perfect.
                </p>
                
                <h3 className="text-2xl font-bold mb-4 text-white">Service Area</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We proudly serve all of Central Florida including Orlando, Tampa, Daytona Beach, Kissimmee, Lakeland, Winter Garden, and surrounding areas. Our expert team travels throughout the region to bring premium party rental solutions to your doorstep.
                </p>
                
                <div className="mt-8">
                  <h4 className="text-xl font-semibold mb-4 text-[hsl(var(--neon-pink))] text-glow-pink">Why Choose JDK Party Rentals?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[hsl(var(--neon-blue))] mr-2 text-xl">✓</span>
                      <span>Highest quality equipment and photo experiences in Central Florida</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[hsl(var(--neon-blue))] mr-2 text-xl">✓</span>
                      <span>Professional, punctual staff committed to your event's success</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[hsl(var(--neon-blue))] mr-2 text-xl">✓</span>
                      <span>Transparent pricing with no hidden fees</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[hsl(var(--neon-blue))] mr-2 text-xl">✓</span>
                      <span>Personalized service tailored to your specific event needs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[hsl(var(--neon-blue))] mr-2 text-xl">✓</span>
                      <span>Extensive coverage throughout Central Florida and beyond</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="relative mx-auto max-w-md">
                  <img 
                    src="/assets/gallery/IMG_0573.jpeg" 
                    alt="JDK Party Rentals team and setup" 
                    className="rounded-xl shadow-2xl relative z-10" 
                  />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-pink))] opacity-30 blur-xl -z-10"></div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[hsl(var(--neon-gold))] opacity-20 blur-lg"></div>
                <div className="absolute -bottom-5 left-1/4 w-32 h-32 rounded-full bg-[hsl(var(--neon-purple))] opacity-20 blur-lg"></div>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Service Areas Section */}
        <section id="service-areas" className="py-20 relative bg-gradient-to-b from-[hsl(var(--dark-bg))] to-[hsl(var(--dark-bg2))]">
          <Container>
            <Heading
              title="Our Service Areas"
              subtitle="Bringing premier party rental experiences throughout Central Florida"
              center
              glowColor="purple"
            />
            
            <div className="max-w-4xl mx-auto mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { city: "Orlando", description: "From downtown to the suburbs, we're Orlando's top-rated party rental provider." },
                  { city: "Tampa", description: "Serving the Tampa Bay area with exceptional photo booth experiences." },
                  { city: "Daytona Beach", description: "Bringing the party to Daytona's beaches and beyond." },
                  { city: "Kissimmee", description: "Central Florida's trusted party rental service in Kissimmee." },
                  { city: "Winter Garden", description: "Premier photo booth rentals for Winter Garden events and celebrations." },
                  { city: "Lake Mary", description: "Your go-to party equipment rental service in Lake Mary." },
                  { city: "Lakeland", description: "Lakeland's favorite party rental supplier for all occasions." },
                  { city: "Clermont", description: "Bringing excitement to events throughout the Clermont area." },
                  { city: "All of Central Florida", description: "Serving all communities throughout the Central Florida region." },
                ].map((area, index) => (
                  <div 
                    key={index}
                    className="bg-[hsl(var(--dark-bg))] p-6 rounded-xl border border-[hsl(var(--neon-purple))] shadow-neon-purple hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2 text-white">{area.city}</h3>
                    <p className="text-gray-300">{area.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-300 mb-6">
                  Don't see your location? We likely still service your area! Contact us to confirm availability and discuss your event needs.
                </p>
                <NeonButton 
                  color="gold" 
                  onClick={() => smoothScrollTo("contact")}
                >
                  Contact Us Today
                </NeonButton>
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
        
        {/* Event Types Section */}
        <section id="events" className="py-20 relative bg-[hsl(var(--dark-bg))]">
          <Container>
            <Heading
              title="Events We Service"
              subtitle="Premier rental solutions for any celebration in Central Florida"
              center
              glowColor="pink"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {[
                { 
                  title: "Weddings", 
                  description: "Make your special day unforgettable with our premium photo booth experiences and rental equipment.",
                  icon: "💍"
                },
                { 
                  title: "Corporate Events", 
                  description: "Elevate your business gatherings with professional-grade rental solutions throughout Central Florida.",
                  icon: "💼"
                },
                { 
                  title: "Birthday Parties", 
                  description: "Create lasting memories at birthday celebrations with our exciting photo experiences.",
                  icon: "🎂"
                },
                { 
                  title: "Graduations", 
                  description: "Celebrate academic achievements with our premium party rentals and photo booths.",
                  icon: "🎓"
                },
                { 
                  title: "Holiday Parties", 
                  description: "Add extra sparkle to your seasonal celebrations with our festive rental options.",
                  icon: "✨"
                },
                { 
                  title: "School Events", 
                  description: "From proms to fundraisers, we provide top-quality equipment for all school functions.",
                  icon: "🏫"
                },
              ].map((event, index) => (
                <div 
                  key={index}
                  className="bg-[hsl(var(--dark-bg2))] p-8 rounded-xl border border-[hsl(var(--neon-blue))] shadow-neon-blue hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{event.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{event.title}</h3>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                No matter what type of event you're planning in Orlando, Tampa, or anywhere in Central Florida, JDK Party Rentals LLC has the perfect rental solutions to make it exceptional.
              </p>
              <NeonButton 
                color="blue" 
                onClick={() => smoothScrollTo("book-now")}
              >
                Book Your Event
              </NeonButton>
            </div>
          </Container>
        </section>
        
        {/* CTA Section */}
        <section id="cta" className="py-20 relative bg-gradient-to-b from-[hsl(var(--dark-bg))] to-[hsl(var(--dark-bg2))]">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Central Florida's Most Trusted{" "}
                <span className="text-[hsl(var(--neon-gold))] text-glow-gold animate-glow-gold">
                  Party Rental Service
                </span>
              </h2>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                From Orlando to Tampa and throughout all of Central Florida, JDK Party Rentals LLC delivers premium quality, reliability, and exceptional customer service for your special events.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <NeonButton 
                  color="purple" 
                  size="lg"
                  onClick={() => window.location.href = "/"}
                >
                  Explore Our Services
                </NeonButton>
                
                <NeonButton 
                  color="pink" 
                  variant="outline"
                  size="lg"
                  onClick={() => smoothScrollTo("contact")}
                >
                  Contact Us Today
                </NeonButton>
              </div>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}