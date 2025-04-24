import React from 'react';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { FaqItem } from '@/components/ui/FaqItem';
import { faqs } from '@/data/faqs';

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-[hsl(var(--dark-bg))] bg-particles relative content-above-particles">
      <Container>
        <Heading 
          title="FREQUENTLY ASKED QUESTIONS"
          highlighted="FREQUENTLY"
          glowColor="gold"
          subtitle="Everything you need to know about our 360° Photo Booth experience."
        />
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
