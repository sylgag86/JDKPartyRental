import React from 'react';
import { cn } from '@/lib/utils';

interface GalleryItemProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}

export function GalleryItem({
  image,
  title,
  description,
  onClick
}: GalleryItemProps) {
  return (
    <div 
      className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsla(var(--dark-bg)/0.9)] via-[hsla(var(--neon-blue)/0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 border border-transparent group-hover:border-[hsla(var(--neon-pink)/0.3)] rounded-lg">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold text-white mb-1 text-glow-blue">{title}</h3>
          <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{description}</p>
        </div>
      </div>
    </div>
  );
}
