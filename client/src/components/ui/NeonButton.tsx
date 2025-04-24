import React from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  color?: 'blue' | 'pink' | 'purple' | 'gold';
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function NeonButton({
  children,
  color = 'blue',
  variant = 'solid',
  size = 'md',
  className,
  onClick,
  href,
  type = 'button',
  disabled
}: NeonButtonProps) {
  // Define color classes
  const colorClasses = {
    blue: {
      solid: 'bg-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))/0.8] text-white shadow-neon-blue',
      outline: 'border-2 border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))/0.1]'
    },
    pink: {
      solid: 'bg-[hsl(var(--neon-pink))] hover:bg-[hsl(var(--neon-pink))/0.8] text-white shadow-neon-pink',
      outline: 'border-2 border-[hsl(var(--neon-pink))] text-[hsl(var(--neon-pink))] hover:bg-[hsl(var(--neon-pink))/0.1]'
    },
    purple: {
      solid: 'bg-[hsl(var(--neon-purple))] hover:bg-[hsl(var(--neon-purple))/0.8] text-white shadow-neon-purple',
      outline: 'border-2 border-[hsl(var(--neon-purple))] text-[hsl(var(--neon-purple))] hover:bg-[hsl(var(--neon-purple))/0.1]'
    },
    gold: {
      solid: 'bg-[hsl(var(--neon-gold))] hover:bg-[hsl(var(--neon-gold))/0.8] text-white shadow-neon-gold',
      outline: 'border-2 border-[hsl(var(--neon-gold))] text-[hsl(var(--neon-gold))] hover:bg-[hsl(var(--neon-gold))/0.1]'
    }
  };

  // Define size classes
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  // Common classes
  const buttonClasses = cn(
    'rounded-full font-semibold transition-all relative overflow-hidden',
    !disabled && 'hover:scale-105',
    sizeClasses[size],
    colorClasses[color][variant],
    'before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
    'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:blur-sm',
    disabled && 'opacity-50 cursor-not-allowed hover:scale-100 pointer-events-none',
    className
  );

  // Render as link if href is provided
  if (href) {
    return (
      <a 
        href={href}
        className={buttonClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
