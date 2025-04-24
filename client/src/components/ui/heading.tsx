import React from 'react';
import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  subtitle?: string;
  highlighted?: string;
  glowColor?: 'blue' | 'pink' | 'purple' | 'gold';
  className?: string;
  center?: boolean;
}

export function Heading({ 
  title, 
  subtitle, 
  highlighted, 
  glowColor = 'blue',
  className,
  center = true
}: HeadingProps) {
  // Determine glow class based on color
  const glowClasses = {
    blue: 'text-[hsl(var(--neon-blue))] text-glow-blue animate-glow-blue',
    pink: 'text-[hsl(var(--neon-pink))] text-glow-pink animate-glow-pink',
    purple: 'text-[hsl(var(--neon-purple))] text-glow-purple animate-glow-purple',
    gold: 'text-[hsl(var(--neon-gold))] text-glow-gold animate-glow-gold',
  };

  const glowClass = glowClasses[glowColor];

  // Split the title and wrap the highlighted part with the glow class
  let titleContent;
  if (highlighted) {
    const parts = title.split(highlighted);
    titleContent = (
      <>
        {parts[0]}
        <span className={glowClass}>{highlighted}</span>
        {parts[1]}
      </>
    );
  } else {
    titleContent = title;
  }

  return (
    <div className={cn(
      "mb-12",
      center ? "text-center" : "",
      className
    )}>
      <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
        {titleContent}
      </h2>
      {subtitle && (
        <p className="text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
