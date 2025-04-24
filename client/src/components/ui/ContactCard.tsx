import React from 'react';
import { cn } from '@/lib/utils';

interface ContactCardProps {
  icon: string;
  title: string;
  content: React.ReactNode;
  color: 'blue' | 'pink' | 'purple' | 'gold';
}

export function ContactCard({
  icon,
  title,
  content,
  color
}: ContactCardProps) {
  // Color mapping
  const colorClasses = {
    blue: {
      border: 'border-[hsl(var(--neon-blue))/0.3] hover:border-[hsl(var(--neon-blue))]',
      icon: 'text-[hsl(var(--neon-blue))]',
      hover: 'hover:text-[hsl(var(--neon-blue))]'
    },
    pink: {
      border: 'border-[hsl(var(--neon-pink))/0.3] hover:border-[hsl(var(--neon-pink))]',
      icon: 'text-[hsl(var(--neon-pink))]',
      hover: 'hover:text-[hsl(var(--neon-pink))]'
    },
    purple: {
      border: 'border-[hsl(var(--neon-purple))/0.3] hover:border-[hsl(var(--neon-purple))]',
      icon: 'text-[hsl(var(--neon-purple))]',
      hover: 'hover:text-[hsl(var(--neon-purple))]'
    },
    gold: {
      border: 'border-[hsl(var(--neon-gold))/0.3] hover:border-[hsl(var(--neon-gold))]',
      icon: 'text-[hsl(var(--neon-gold))]',
      hover: 'hover:text-[hsl(var(--neon-gold))]'
    }
  };

  return (
    <div className={cn(
      "flex items-start gap-4 bg-[hsl(var(--dark-bg))] p-6 rounded-xl border transition-colors",
      colorClasses[color].border
    )}>
      <div className={cn("text-3xl", colorClasses[color].icon)}>
        <i className={icon}></i>
      </div>
      
      <div>
        <h3 className="text-xl font-outfit font-bold mb-1">{title}</h3>
        {typeof content === 'string' ? (
          <p className={cn("text-gray-300 transition-colors", colorClasses[color].hover)}>
            {content}
          </p>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
