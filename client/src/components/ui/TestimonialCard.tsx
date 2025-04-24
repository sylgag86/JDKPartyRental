import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  image: string;
  quote: string;
  event: string;
  location: string;
  color: 'blue' | 'pink' | 'purple' | 'gold';
}

export function TestimonialCard({
  name,
  image,
  quote,
  event,
  location,
  color
}: TestimonialCardProps) {
  // Color mapping
  const colorClasses = {
    blue: {
      border: 'border-[hsl(var(--neon-blue))/0.2]',
      profile: 'border-[hsl(var(--neon-blue))]',
      location: 'text-[hsl(var(--neon-blue))]'
    },
    pink: {
      border: 'border-[hsl(var(--neon-pink))/0.2]',
      profile: 'border-[hsl(var(--neon-pink))]',
      location: 'text-[hsl(var(--neon-pink))]'
    },
    purple: {
      border: 'border-[hsl(var(--neon-purple))/0.2]',
      profile: 'border-[hsl(var(--neon-purple))]',
      location: 'text-[hsl(var(--neon-purple))]'
    },
    gold: {
      border: 'border-[hsl(var(--neon-gold))/0.2]',
      profile: 'border-[hsl(var(--neon-gold))]',
      location: 'text-[hsl(var(--neon-gold))]'
    }
  };

  return (
    <div className={cn(
      "bg-[hsl(var(--dark-bg2))] rounded-xl p-8 border",
      colorClasses[color].border
    )}>
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className={cn(
          "w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4",
          colorClasses[color].profile
        )}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex mb-4 text-[hsl(var(--neon-gold))]">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
          
          <blockquote className="text-gray-300 text-lg italic mb-6">
            "{quote}"
          </blockquote>
          
          <div>
            <h4 className="font-bold text-xl text-white">{name}</h4>
            <p className={colorClasses[color].location}>{event} in {location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
