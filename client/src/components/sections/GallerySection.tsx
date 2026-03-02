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
          subtitle="A curated look at our setup, guest experience, and event vibes — clean, modern, and unforgettable."
        />

        {/* Modern bento gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5">
          {gallery.map((item, index) => {
            const layoutClass =
              index === 0
                ? 'lg:col-span-7 min-h-[320px] md:min-h-[380px]'
                : index === 1
                  ? 'lg:col-span-5 min-h-[320px] md:min-h-[380px]'
                  : index === 2
                    ? 'lg:col-span-4 min-h-[240px] md:min-h-[280px]'
                    : index === 3
                      ? 'lg:col-span-4 min-h-[240px] md:min-h-[280px]'
                      : 'lg:col-span-4 min-h-[240px] md:min-h-[280px]';

            return (
              <GalleryItem
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                className={layoutClass}
                onClick={() => openModal(item.image, item.title, item.description)}
              />
            );
          })}
        </div>

        <div className="text-center mt-10">
          <NeonButton color="purple" size="lg" onClick={() => (window.location.href = '#book-now')}>
            Book Your Date <i className="fas fa-arrow-right ml-2"></i>
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
