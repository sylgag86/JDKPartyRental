import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import { NeonButton } from "@/components/ui/NeonButton";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg))]">
      <Helmet>
        <title>Page Not Found - JDK Party Rentals | Central Florida Photo Booths</title>
        <meta name="description" content="The page you're looking for could not be found." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-[85px]"> {/* Extra padding for fixed navbar */}
        <Container>
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <h1 className="text-8xl md:text-9xl font-bold text-[hsl(var(--neon-purple))] text-glow-purple animate-glow-purple mb-8">
                404
              </h1>
              <div className="absolute inset-0 blur-xl opacity-50 bg-[hsl(var(--neon-purple))]"></div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Oops! Page Not Found
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 text-center max-w-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex gap-4">
              <NeonButton 
                color="blue" 
                onClick={() => window.location.href = "/"}
                size="lg"
              >
                Back to Home
              </NeonButton>
              
              <NeonButton 
                color="pink" 
                variant="outline"
                onClick={() => window.location.href = "/#contact"}
                size="lg"
              >
                Contact Us
              </NeonButton>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
