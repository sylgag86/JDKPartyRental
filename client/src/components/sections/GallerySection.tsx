import React, { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { GalleryItem } from '@/components/ui/GalleryItem';
import { NeonButton } from '@/components/ui/NeonButton';
import { gallery } from '@/data/gallery';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    title: string;
    description: string;
  } | null>(null);
  
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (image: string, title: string, description: string) => {
    setSelectedImage({ image, title, description });
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[hsl(var(--dark-bg2))] content-above-particles">
      <Container>
        <Heading 
          title="CAPTURE THE MOMENT"
          highlighted="CAPTURE"
          glowColor="blue"
          subtitle="See our 360° Photo Booth in action at various events. These unforgettable moments could be yours!"
        />
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, index) => (
            <GalleryItem
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              onClick={() => openModal(item.image, item.title, item.description)}
            />
          ))}
        </div>
        
        {/* View More Button */}
        <div className="text-center mt-12">
          <NeonButton color="purple" size="lg">
            View More <i className="fas fa-images ml-2"></i>
          </NeonButton>
        </div>
      </Container>
      
      {/* Gallery Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[hsl(var(--dark-bg))] bg-opacity-90 z-50 flex items-center justify-center content-above-particles">
          <div className="container mx-auto px-4 relative">
            <button 
              className="absolute top-4 right-4 text-white text-3xl hover:text-[hsl(var(--neon-pink))] transition-colors"
              onClick={closeModal}
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="max-w-4xl mx-auto">
              {selectedImage && (
                <>
                  <img 
                    src={selectedImage.image} 
                    alt={selectedImage.title} 
                    className="w-full h-auto rounded-xl"
                  />
                  <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
                    <p className="text-gray-300">{selectedImage.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
