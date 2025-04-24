import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { NeonButton } from "@/components/ui/NeonButton";
import { services } from "@/data/services";
import { smoothScrollTo } from "@/lib/utils";

// Define the color styles
const colorClasses = {
  blue: {
    title: "text-[hsl(var(--neon-blue))] text-glow-blue",
    shadow: "shadow-neon-blue",
    border: "border-[hsl(var(--neon-blue))]",
    bg: "bg-[hsla(var(--neon-blue)/0.1)]",
    gradient: "from-[hsl(var(--neon-blue))] to-transparent"
  },
  pink: {
    title: "text-[hsl(var(--neon-pink))] text-glow-pink",
    shadow: "shadow-neon-pink",
    border: "border-[hsl(var(--neon-pink))]",
    bg: "bg-[hsla(var(--neon-pink)/0.1)]",
    gradient: "from-[hsl(var(--neon-pink))] to-transparent"
  },
  purple: {
    title: "text-[hsl(var(--neon-purple))] text-glow-purple",
    shadow: "shadow-neon-purple",
    border: "border-[hsl(var(--neon-purple))]",
    bg: "bg-[hsla(var(--neon-purple)/0.1)]",
    gradient: "from-[hsl(var(--neon-purple))] to-transparent"
  },
  gold: {
    title: "text-[hsl(var(--neon-gold))] text-glow-gold",
    shadow: "shadow-neon-gold",
    border: "border-[hsl(var(--neon-gold))]",
    bg: "bg-[hsla(var(--neon-gold)/0.1)]",
    gradient: "from-[hsl(var(--neon-gold))] to-transparent"
  }
};

// Extended service data with more details
const serviceExtendedDetails = {
  "360-photo-booth": {
    longDescription: "Our 360° Photo Booth creates stunning slow-motion videos by revolving around you and your guests. This cutting-edge booth captures unforgettable moments from every angle, creating dynamic content perfect for social media. The 360° platform is elegantly designed with LED lighting that can be customized to match your event's theme.",
    features: [
      "Slow-motion 360° video capture",
      "Elegant platform with customizable LED lighting",
      "Instant social media sharing",
      "Professional attendant included",
      "Custom digital props and effects",
      "Branded video overlays available",
      "High-quality video output"
    ],
    packages: [
      {
        name: "Standard 360° Package",
        price: "$499",
        duration: "3 hours",
        details: "Includes setup, attendant, basic lighting, and digital delivery of all content."
      },
      {
        name: "Premium 360° Experience",
        price: "$699",
        duration: "4 hours",
        details: "Includes custom lighting, premium backdrop, social media station, and instant delivery."
      }
    ]
  },
  "photo-mirror-booth": {
    longDescription: "Our Magic Mirror Photo Booth combines interactive technology with stunning photography. This full-length mirror features a sleek design that blends seamlessly with your event decor while providing a fun, engaging experience. Guests can sign their photos, add animated stickers, and create personalized digital and print keepsakes.",
    features: [
      "Interactive touchscreen mirror interface",
      "Digital signing and drawing tools",
      "Animated graphics and effects",
      "Voice guidance and prompts",
      "Instant high-quality prints",
      "Digital sharing capabilities",
      "Customizable print templates"
    ],
    packages: [
      {
        name: "Classic Mirror Booth",
        price: "$399",
        duration: "3 hours",
        details: "Includes setup, attendant, digital props, and unlimited prints."
      },
      {
        name: "Deluxe Mirror Experience",
        price: "$599",
        duration: "4 hours",
        details: "Includes premium animations, custom branding, guest book, and USB with all images."
      }
    ]
  },
  "open-air-booth": {
    longDescription: "Our Open Air Photo Booth offers unlimited possibilities for group photos and creative shots. This spacious setup accommodates large groups and provides a versatile backdrop system that can be customized to match your event theme. With professional lighting and high-quality camera equipment, every shot looks amazing.",
    features: [
      "Spacious open design for large groups",
      "Professional studio lighting setup",
      "Customizable backdrop options",
      "High-resolution DSLR camera",
      "Unlimited prints and sessions",
      "Digital sharing station",
      "Fun props and accessories included"
    ],
    packages: [
      {
        name: "Basic Open Air Booth",
        price: "$349",
        duration: "3 hours",
        details: "Includes standard backdrop, props, unlimited prints, and digital gallery."
      },
      {
        name: "Premium Open Air Experience",
        price: "$549",
        duration: "4 hours",
        details: "Includes multiple backdrop options, premium props, photo book, and social media sharing station."
      }
    ]
  },
  "gif-booth": {
    longDescription: "Our GIF Booth creates animated moments that capture the energy of your event. Guests can create boomerangs, animated GIFs, and short video clips that are perfect for sharing on social media. This modern photo experience generates content that's designed to engage and impress in today's digital landscape.",
    features: [
      "Boomerang, GIF, and video creation",
      "Instant social media sharing",
      "Digital props and effects",
      "Branded overlays available",
      "Integrated sharing station",
      "Email and text delivery options",
      "User-friendly interface"
    ],
    packages: [
      {
        name: "Standard GIF Booth",
        price: "$399",
        duration: "3 hours",
        details: "Includes setup, digital props, social media sharing, and digital delivery."
      },
      {
        name: "Premium GIF Experience",
        price: "$599",
        duration: "4 hours",
        details: "Includes custom animations, branded overlays, on-site sharing station, and premium digital effects."
      }
    ]
  }
};

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:serviceId");
  const [service, setService] = useState<any>(null);
  const [color, setColor] = useState<"blue" | "pink" | "purple" | "gold">("blue");
  const [loading, setLoading] = useState(true);
  const [extendedDetails, setExtendedDetails] = useState<any>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (params && params.serviceId) {
      // Find the service by its ID (slug)
      const serviceId = params.serviceId;
      const foundService = services.find(s => {
        // Create a slug from the title
        const slug = s.title.toLowerCase().replace(/\s+/g, '-');
        return slug === serviceId;
      });
      
      if (foundService) {
        setService(foundService);
        setColor(foundService.color);
        
        // Get extended details
        const extended = serviceExtendedDetails[serviceId as keyof typeof serviceExtendedDetails];
        if (extended) {
          setExtendedDetails(extended);
        }
      }
    }
    
    setLoading(false);
  }, [params]);
  
  // Redirect to 404 if service not found
  if (!loading && !service) {
    window.location.href = "/not-found";
    return null;
  }
  
  // Show loading state
  if (loading || !service) {
    return (
      <div className="min-h-screen bg-[hsl(var(--dark-bg))] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[hsl(var(--neon-blue))] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg))]">
      <Helmet>
        <title>{service.title} - JDK Party Rentals | Central Florida Photo Booths</title>
        <meta name="description" content={`Explore JDK Party Rentals' ${service.title} service in Central Florida. ${service.description} Perfect for weddings, corporate events, and celebrations in Orlando, Tampa, and surrounding areas.`} />
        <meta name="keywords" content={`${service.title}, photo booth, 360 photo booth, Orlando, Tampa, Central Florida, party rentals, event rentals, ${service.title.toLowerCase()} rental`} />
        <link rel="canonical" href={`https://jdkpartyrentals.com/services/${params?.serviceId}`} />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative bg-gradient-to-b from-[hsl(var(--dark-bg))] to-[hsl(var(--dark-bg2))]">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${colorClasses[color].title}`}>
                {service.title}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <NeonButton 
                  color={color} 
                  onClick={() => smoothScrollTo("book-now")}
                  size="lg"
                  className="shadow-xl"
                >
                  Book This Service
                </NeonButton>
                
                <NeonButton 
                  color={color} 
                  variant="outline"
                  onClick={() => window.location.href = "/"}
                  size="lg"
                >
                  View All Services
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
        
        {/* Service Detail Section */}
        <section className="py-20 relative bg-[hsl(var(--dark-bg))]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className={`rounded-xl shadow-2xl relative z-10 overflow-hidden ${colorClasses[color].shadow}`}>
                    <img 
                      src={service.imageUrl || `https://images.unsplash.com/photo-${service.title === '360° Photo Booth' ? '1533174072545-7a4b6ad7a6c3' : 
                                            service.title === 'Mirror Photo Booth' ? '1516035069371-29a1b244cc32' : 
                                            service.title === 'Open Air Booth' ? '1496843916299-590492c751f4' : 
                                            '1525268323446-0505b6fe7778'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
                      alt={service.title} 
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colorClasses[color].gradient} opacity-30 blur-xl -z-10`}></div>
                </div>
                
                {/* Floating elements */}
                <div className={`absolute -top-10 -left-10 w-20 h-20 rounded-full ${colorClasses[color].bg} opacity-20 blur-lg`}></div>
                <div className={`absolute -bottom-5 right-1/4 w-32 h-32 rounded-full ${colorClasses[color].bg} opacity-20 blur-lg`}></div>
              </div>
              
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${colorClasses[color].title}`}>
                  About This Service
                </h2>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {extendedDetails?.longDescription || service.description}
                </p>
                
                <h3 className="text-2xl font-bold mb-4 text-white">Key Features</h3>
                <ul className="space-y-3 mb-8">
                  {extendedDetails?.features ? (
                    extendedDetails.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className={`${colorClasses[color].title} mr-2 text-xl`}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start">
                      <span className={`${colorClasses[color].title} mr-2 text-xl`}>✓</span>
                      <span>Professional setup and operation</span>
                    </li>
                  )}
                </ul>
                
                <NeonButton 
                  color={color} 
                  onClick={() => smoothScrollTo("packages")}
                >
                  View Packages & Pricing
                </NeonButton>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Packages Section */}
        <section id="packages" className="py-20 relative bg-gradient-to-b from-[hsl(var(--dark-bg))] to-[hsl(var(--dark-bg2))]">
          <Container>
            <Heading
              title="Packages & Pricing"
              subtitle="Choose the perfect package for your event"
              center
              glowColor={color}
            />
            
            <div className="max-w-5xl mx-auto mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {extendedDetails?.packages ? (
                  extendedDetails.packages.map((pkg: any, index: number) => (
                    <div 
                      key={index}
                      className={`bg-[hsl(var(--dark-bg))] p-8 rounded-xl ${colorClasses[color].border} ${colorClasses[color].shadow} transition-all duration-300 hover:transform hover:scale-105`}
                    >
                      <h3 className={`text-2xl font-bold mb-2 ${colorClasses[color].title}`}>
                        {pkg.name}
                      </h3>
                      <div className="text-3xl font-bold text-white mb-4">{pkg.price}</div>
                      <p className="text-sm text-gray-400 mb-4">Duration: {pkg.duration}</p>
                      <p className="text-gray-300 mb-6">{pkg.details}</p>
                      <NeonButton 
                        color={color} 
                        onClick={() => smoothScrollTo("book-now")}
                        className="w-full"
                      >
                        Book This Package
                      </NeonButton>
                    </div>
                  ))
                ) : (
                  <>
                    <div 
                      className={`bg-[hsl(var(--dark-bg))] p-8 rounded-xl ${colorClasses[color].border} ${colorClasses[color].shadow} transition-all duration-300 hover:transform hover:scale-105`}
                    >
                      <h3 className={`text-2xl font-bold mb-2 ${colorClasses[color].title}`}>
                        Standard Package
                      </h3>
                      <div className="text-3xl font-bold text-white mb-4">$399</div>
                      <p className="text-sm text-gray-400 mb-4">Duration: 3 hours</p>
                      <p className="text-gray-300 mb-6">Includes professional setup, attendant, and all digital files delivered after your event.</p>
                      <NeonButton 
                        color={color} 
                        onClick={() => smoothScrollTo("book-now")}
                        className="w-full"
                      >
                        Book This Package
                      </NeonButton>
                    </div>
                    
                    <div 
                      className={`bg-[hsl(var(--dark-bg))] p-8 rounded-xl ${colorClasses[color].border} ${colorClasses[color].shadow} transition-all duration-300 hover:transform hover:scale-105`}
                    >
                      <h3 className={`text-2xl font-bold mb-2 ${colorClasses[color].title}`}>
                        Premium Package
                      </h3>
                      <div className="text-3xl font-bold text-white mb-4">$599</div>
                      <p className="text-sm text-gray-400 mb-4">Duration: 4 hours</p>
                      <p className="text-gray-300 mb-6">Includes everything in the Standard Package plus custom branding, premium props, and unlimited prints.</p>
                      <NeonButton 
                        color={color} 
                        onClick={() => smoothScrollTo("book-now")}
                        className="w-full"
                      >
                        Book This Package
                      </NeonButton>
                    </div>
                  </>
                )}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-300 mb-6">
                  Need a custom package? Contact us to discuss your specific requirements.
                </p>
                <NeonButton 
                  color={color} 
                  variant="outline"
                  onClick={() => smoothScrollTo("contact")}
                >
                  Contact For Custom Quote
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
        
        {/* CTA Section */}
        <section id="book-now" className="py-20 relative bg-[hsl(var(--dark-bg))]">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${colorClasses[color].title}`}>
                Ready to Book Your {service.title}?
              </h2>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Reserve your date now to ensure availability for your upcoming event in Central Florida. Our team is ready to create an unforgettable experience for you and your guests.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <NeonButton 
                  color={color} 
                  size="lg"
                  onClick={() => window.location.href = "/#book-now"}
                >
                  Book Now
                </NeonButton>
                
                <NeonButton 
                  color={color} 
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = "/#contact"}
                >
                  Contact Us
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