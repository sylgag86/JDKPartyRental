import React from 'react';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { services } from '@/data/services';

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-[hsl(var(--dark-bg2))] content-above-particles">
      <Container>
        <Heading 
          title="PERFECT FOR ANY EVENT"
          highlighted="PERFECT"
          glowColor="pink"
          subtitle="Our 360° Photo Booth brings the wow factor to any celebration, creating stunning slow-motion videos that will leave your guests amazed."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
