'use client';

import React, { useState, useMemo } from 'react';
import { galleryItems } from '@/data/gallery';
import { Button } from '@/components/ui';

type FilterCategory = 'all' | 'grillz' | 'rings' | 'necklaces' | 'custom' | 'celebrities';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: { value: FilterCategory; label: string; count: number }[] = [
    { value: 'all', label: 'All Work', count: galleryItems.length },
    { value: 'grillz', label: 'Custom Grillz', count: galleryItems.filter(i => i.category === 'grillz').length },
    { value: 'rings', label: 'Rings', count: galleryItems.filter(i => i.category === 'rings').length },
    { value: 'necklaces', label: 'Necklaces', count: galleryItems.filter(i => i.category === 'necklaces').length },
    { value: 'custom', label: 'Custom Pieces', count: galleryItems.filter(i => i.category === 'custom').length },
    { value: 'celebrities', label: 'Celebrity Clients', count: galleryItems.filter(i => i.featured).length },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return galleryItems;
    if (selectedCategory === 'celebrities') return galleryItems.filter(item => item.featured);
    return galleryItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const openModal = (item: typeof galleryItems[0]) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-homer-black text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold mb-4">
            Our Gallery
          </h1>
          <p className="text-homer-gray-300 text-lg max-w-2xl mx-auto">
            Explore our collection of custom masterpieces, from luxury grillz to bespoke jewelry pieces
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-0 bg-white border-b border-homer-gray-200 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  'px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all',
                  selectedCategory === category.value
                    ? 'bg-homer-gold text-white'
                    : 'bg-homer-gray-100 text-homer-gray-700 hover:bg-homer-gray-200'
                )}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="group relative aspect-square overflow-hidden bg-homer-gray-100 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-homer-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-cinzel font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-homer-gray-300">{item.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs">❤️ {item.likes}</span>
                      <span className="text-xs uppercase">{item.category}</span>
                    </div>
                  </div>
                </div>

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-2 right-2 bg-homer-gold text-white px-2 py-1 text-xs font-semibold rounded">
                    Featured
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load More */}
          {filteredItems.length > 12 && (
            <div className="text-center mt-12">
              <Button variant="secondary" size="lg">
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-homer-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/3 p-6">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-homer-gray-500 hover:text-homer-black"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h2 className="font-cinzel text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-homer-gray-600 mb-4">{selectedImage.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-homer-gray-500">Category</span>
                    <span className="font-medium capitalize">{selectedImage.category}</span>
                  </div>
                  {selectedImage.materials && (
                    <div className="flex justify-between">
                      <span className="text-homer-gray-500">Materials</span>
                      <span className="font-medium">{selectedImage.materials.join(', ')}</span>
                    </div>
                  )}
                  {selectedImage.client && (
                    <div className="flex justify-between">
                      <span className="text-homer-gray-500">Client</span>
                      <span className="font-medium">{selectedImage.client}</span>
                    </div>
                  )}
                </div>

                <Button variant="primary" fullWidth onClick={() => window.location.href = '/book-consultation'}>
                  Create Similar Piece
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-homer-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-cinzel text-3xl font-bold mb-4">Create Your Masterpiece</h2>
          <p className="text-homer-gray-600 mb-8">
            Ready to bring your vision to life? Book a consultation with our master jewelers
          </p>
          <Button variant="luxury" size="lg" onClick={() => window.location.href = '/book-consultation'}>
            <span>Book Consultation</span>
          </Button>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}