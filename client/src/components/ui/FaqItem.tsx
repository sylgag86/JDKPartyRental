import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="bg-[hsl(var(--dark-bg2))] rounded-xl overflow-hidden">
      <button 
        className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
        onClick={toggleOpen}
      >
        <span className="text-xl font-outfit font-semibold">{question}</span>
        <i className={cn(
          "fas text-[hsl(var(--neon-blue))] transition-transform", 
          isOpen ? "fa-minus" : "fa-plus"
        )}></i>
      </button>
      
      <div className={cn(
        "px-6 pb-6 transition-all duration-300 max-h-0 overflow-hidden",
        isOpen && "max-h-96"
      )}>
        <p className="text-gray-300">
          {answer}
        </p>
      </div>
    </div>
  );
}
