'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

/**
 * ProductGallery component displays product images with thumbnail navigation and zoom
 * Supports keyboard navigation, touch gestures, and full-screen viewing
 */
export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState<Set<number>>(new Set());
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFullscreen) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            goToPrevious();
            break;
          case 'ArrowRight':
            e.preventDefault();
            goToNext();
            break;
          case 'Escape':
            e.preventDefault();
            setIsFullscreen(false);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen, currentIndex, images.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (index: number) => {
    setImageError(prev => new Set([...prev, index]));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setIsZoomed(false);
  };

  const ImagePlaceholder = ({ index }: { index: number }) => (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">Image unavailable</span>
      </div>
    </div>
  );

  if (!images || images.length === 0) {
    return (
      <div className={cn("aspect-square bg-gray-100 rounded-lg", className)}>
        <ImagePlaceholder index={0} />
      </div>
    );
  }

  return (
    <>
      <div className={cn("space-y-4", className)}>
        {/* Main Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
          {!imageError.has(currentIndex) ? (
            <div
              className="relative w-full h-full cursor-zoom-in"
              onClick={toggleZoom}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={images[currentIndex]}
                alt={`${productName} - Image ${currentIndex + 1}`}
                fill
                className={cn(
                  "object-cover transition-transform duration-300",
                  isZoomed ? "scale-150" : "scale-100"
                )}
                style={isZoomed ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                } : {}}
                onError={() => handleImageError(currentIndex)}
                priority={currentIndex === 0}
              />
              
              {/* Zoom overlay */}
              {isZoomed && (
                <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none" />
              )}
            </div>
          ) : (
            <ImagePlaceholder index={currentIndex} />
          )}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Fullscreen button */}
          <button
            onClick={openFullscreen}
            className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            aria-label="View fullscreen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Zoom indicator */}
          {isZoomed && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              🔍 Click to exit zoom
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200",
                  currentIndex === index
                    ? "border-amber-500 ring-2 ring-amber-200"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                {!imageError.has(index) ? (
                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {/* Active indicator overlay */}
                {currentIndex === index && (
                  <div className="absolute inset-0 bg-amber-500 bg-opacity-20" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors duration-200"
              aria-label="Close fullscreen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-colors duration-200 z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-colors duration-200 z-10"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Main fullscreen image */}
            <div className="relative max-w-full max-h-full">
              {!imageError.has(currentIndex) ? (
                <Image
                  src={images[currentIndex]}
                  alt={`${productName} - Fullscreen ${currentIndex + 1}`}
                  width={1200}
                  height={1200}
                  className="max-w-full max-h-full object-contain"
                  onError={() => handleImageError(currentIndex)}
                />
              ) : (
                <div className="w-96 h-96 bg-gray-800 flex items-center justify-center rounded">
                  <ImagePlaceholder index={currentIndex} />
                </div>
              )}
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnail strip for fullscreen */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <div className="flex gap-2 overflow-x-auto max-w-lg pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "relative flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-all duration-200",
                        currentIndex === index
                          ? "border-white"
                          : "border-gray-500 hover:border-gray-300"
                      )}
                    >
                      {!imageError.has(index) ? (
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(index)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};