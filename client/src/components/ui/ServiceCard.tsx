import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  color: 'blue' | 'pink' | 'purple' | 'gold';
  onClick?: () => void;
}

export function ServiceCard({
  icon,
  title,
  description,
  color,
  onClick
}: ServiceCardProps) {
  // Color mapping
  const colorClasses = {
    blue: {
      border: 'group-hover:border-[hsl(var(--neon-blue))] group-hover:shadow-neon-blue',
      icon: 'border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))]',
      title: 'group-hover:text-[hsl(var(--neon-blue))]',
      gradient: 'from-[hsl(var(--neon-blue))] to-transparent'
    },
    pink: {
      border: 'group-hover:border-[hsl(var(--neon-pink))] group-hover:shadow-neon-pink',
      icon: 'border-[hsl(var(--neon-pink))] text-[hsl(var(--neon-pink))]',
      title: 'group-hover:text-[hsl(var(--neon-pink))]',
      gradient: 'from-[hsl(var(--neon-pink))] to-transparent'
    },
    purple: {
      border: 'group-hover:border-[hsl(var(--neon-purple))] group-hover:shadow-neon-purple',
      icon: 'border-[hsl(var(--neon-purple))] text-[hsl(var(--neon-purple))]',
      title: 'group-hover:text-[hsl(var(--neon-purple))]',
      gradient: 'from-[hsl(var(--neon-purple))] to-transparent'
    },
    gold: {
      border: 'group-hover:border-[hsl(var(--neon-gold))] group-hover:shadow-neon-gold',
      icon: 'border-[hsl(var(--neon-gold))] text-[hsl(var(--neon-gold))]',
      title: 'group-hover:text-[hsl(var(--neon-gold))]',
      gradient: 'from-[hsl(var(--neon-gold))] to-transparent'
    }
  };

  return (
    <div 
      className={cn(
        "group relative bg-[hsl(var(--dark-bg))] rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105 overflow-hidden border border-gray-800",
        colorClasses[color].border
      )}
      onClick={onClick}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-10 transition-opacity duration-300",
        colorClasses[color].gradient
      )}></div>
      
      <div className={cn(
        "w-20 h-20 bg-[hsl(var(--dark-bg2))] rounded-full mx-auto mb-4 flex items-center justify-center border-2",
        colorClasses[color].icon
      )}>
        <i className={cn("text-3xl", icon)}></i>
      </div>
      
      <h3 className={cn(
        "text-2xl font-outfit font-bold mb-3 text-white transition-colors",
        colorClasses[color].title
      )}>
        {title}
      </h3>
      
      <p className="text-gray-300 mb-4">
        {description}
      </p>
      
      <a href={`/services/${title.toLowerCase().replace(/\s+/g, '-').replace(/°/g, '')}`} className={cn(
        "inline-block font-semibold hover:underline",
        colorClasses[color].icon
      )}>
        Learn More <i className="fas fa-arrow-right ml-1"></i>
      </a>
    </div>
  );
}
