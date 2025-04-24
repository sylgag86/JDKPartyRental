import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: 'blue' | 'pink' | 'purple' | 'gold';
}

export function FeatureCard({
  icon,
  title,
  description,
  color
}: FeatureCardProps) {
  // Color mapping
  const colorClasses = {
    blue: {
      border: 'border-[hsl(var(--neon-blue))/0.3] hover:border-[hsl(var(--neon-blue))]',
      icon: 'text-[hsl(var(--neon-blue))]'
    },
    pink: {
      border: 'border-[hsl(var(--neon-pink))/0.3] hover:border-[hsl(var(--neon-pink))]',
      icon: 'text-[hsl(var(--neon-pink))]'
    },
    purple: {
      border: 'border-[hsl(var(--neon-purple))/0.3] hover:border-[hsl(var(--neon-purple))]',
      icon: 'text-[hsl(var(--neon-purple))]'
    },
    gold: {
      border: 'border-[hsl(var(--neon-gold))/0.3] hover:border-[hsl(var(--neon-gold))]',
      icon: 'text-[hsl(var(--neon-gold))]'
    }
  };

  return (
    <div className={cn(
      "bg-[hsl(var(--dark-bg2))] p-6 rounded-xl border transition-colors",
      colorClasses[color].border
    )}>
      <div className={cn(
        "text-3xl mb-4",
        colorClasses[color].icon
      )}>
        <i className={icon}></i>
      </div>
      
      <h3 className="text-xl font-outfit font-bold mb-2">{title}</h3>
      
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
