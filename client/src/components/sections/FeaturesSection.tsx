import React from 'react';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { features } from '@/data/features';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-[hsl(var(--dark-bg))] bg-particles relative content-above-particles">
      <Container>
        <Heading 
          title="STUNNING FEATURES"
          highlighted="STUNNING"
          glowColor="gold"
          subtitle="Our 360° Photo Booth comes packed with impressive technology and features to make your event truly memorable."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                />
              ))}
            </div>
          </div>
          
          {/* Feature Video */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative rounded-xl border border-[hsla(var(--neon-blue)/0.35)] bg-[hsl(var(--dark-bg2))] overflow-hidden shadow-2xl">
                <video
                  src="/assets/video/jdk-highlight-loop.mp4"
                  className="w-full h-auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-blue))] opacity-25 blur-xl -z-10"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-[hsl(var(--neon-pink))] opacity-20 blur-lg"></div>
            <div className="absolute -bottom-5 right-1/4 w-32 h-32 rounded-full bg-[hsl(var(--neon-gold))] opacity-20 blur-lg"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
