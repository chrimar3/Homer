'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BaseComponentProps } from '@/types';
import { featuredGalleryItems, GalleryItem } from '@/data/gallery';

interface GalleryPreviewProps extends BaseComponentProps {}

interface GalleryItemCardProps {
  item: GalleryItem;
  index: number;
  isVisible: boolean;
  onClick: (item: GalleryItem) => void;
}

const GalleryItemCard: React.FC<GalleryItemCardProps> = ({ 
  item, 
  index, 
  isVisible, 
  onClick 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative aspect-square cursor-pointer overflow-hidden rounded-none shadow-lg hover:shadow-luxury-hover transition-all duration-500 transform hover:-translate-y-1 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'both'
      }}
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
          imageLoaded ? '' : 'animate-pulse bg-gray-200'
        }`}
        onLoad={() => setImageLoaded(true)}
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        
        {/* Top Content - Category & Likes */}
        <div className="flex justify-between items-start">
          <span className="bg-homer-gold text-white px-2 py-1 text-xs font-montserrat font-bold rounded-none transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {item.category.toUpperCase()}
          </span>
          
          {item.likes && (
            <div className="flex items-center gap-1 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-montserrat">{item.likes}</span>
            </div>
          )}
        </div>

        {/* Bottom Content - Title & Description */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-montserrat font-semibold text-sm mb-1 line-clamp-2">
            {item.title}
          </h3>
          
          {item.description && (
            <p className="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {item.description}
            </p>
          )}
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
            {item.tags.slice(0, 2).map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="bg-white/20 text-white px-2 py-1 text-xs rounded-none backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 2 && (
              <span className="text-white/70 text-xs">
                +{item.tags.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Instagram Icon (if has Instagram link) */}
        {item.instagramUrl && (
          <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // Take first 8 items for the grid
  const displayItems = featuredGalleryItems.slice(0, 8);

  return (
    <>
      <section ref={sectionRef} className={`py-20 bg-white ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-homer-gold font-montserrat tracking-[0.2em] uppercase text-sm mb-4">
              Latest Creations
            </p>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Gallery
              <span className="block text-homer-gold">Spotlight</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Follow our journey of craftsmanship through our latest creations and 
              behind-the-scenes moments from our Athens and Southampton ateliers
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {displayItems.map((item, index) => (
              <GalleryItemCard
                key={item.id}
                item={item}
                index={index}
                isVisible={isVisible}
                onClick={handleItemClick}
              />
            ))}
          </div>

          {/* Social & CTA Section */}
          <div className="bg-gradient-luxury rounded-none shadow-luxury p-8 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <svg className="w-12 h-12 mx-auto mb-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              
              <h3 className="font-cinzel text-2xl font-bold mb-4">
                Follow Our Journey
              </h3>
              
              <p className="text-white/90 mb-6 leading-relaxed">
                Stay connected with Homer for daily inspiration, behind-the-scenes content, 
                and first looks at our latest masterpieces. Join our community of luxury jewelry enthusiasts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-white text-homer-gold hover:bg-gray-100 px-8 py-3 rounded-none font-montserrat font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    FOLLOW @HOMER_LUXURY
                  </span>
                </button>
                
                <button className="group border-2 border-white hover:border-white/80 text-white hover:text-white/90 px-8 py-3 rounded-none font-montserrat font-medium text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10 hover:bg-white/20">
                  <span className="flex items-center gap-2">
                    VIEW FULL GALLERY
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for selected item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-none overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              
              {/* Image */}
              <div className="relative aspect-square lg:aspect-auto">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-8 overflow-y-auto">
                <div className="mb-4">
                  <span className="bg-homer-gold text-white px-3 py-1 text-sm font-montserrat font-bold rounded-none">
                    {selectedItem.category.toUpperCase()}
                  </span>
                </div>
                
                <h3 className="font-cinzel text-3xl font-bold text-gray-900 mb-4">
                  {selectedItem.title}
                </h3>
                
                {selectedItem.description && (
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {selectedItem.description}
                  </p>
                )}

                {/* Tags */}
                <div className="mb-6">
                  <h4 className="font-montserrat font-semibold text-gray-900 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded-none font-montserrat"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6 text-gray-600">
                  {selectedItem.likes && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>{selectedItem.likes} likes</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m0 0V7a3 3 0 11-6 0v0M8 7v13a3 3 0 006 0V7" />
                    </svg>
                    <span>{new Date(selectedItem.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  {selectedItem.instagramUrl && (
                    <a 
                      href={selectedItem.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-none font-montserrat font-medium transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      VIEW ON INSTAGRAM
                    </a>
                  )}
                  
                  {selectedItem.productId && (
                    <button className="group flex-1 bg-homer-gold hover:bg-homer-darkGold text-white px-6 py-3 rounded-none font-montserrat font-medium transition-all duration-300 transform hover:scale-105">
                      VIEW PRODUCT
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};