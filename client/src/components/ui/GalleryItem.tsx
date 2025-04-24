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
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--dark-bg))] to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}
