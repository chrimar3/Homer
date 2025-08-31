'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface RelatedProductsProps {
  products: Product[];
  currentProductId?: string;
  title?: string;
  maxProducts?: number;
  onQuickView?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  onAddToCompare?: (productId: string) => void;
  className?: string;
}

/**
 * RelatedProducts component displays a horizontal scrolling carousel of related products
 * Includes navigation arrows and responsive design
 */
export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  currentProductId,
  title = 'Related Products',
  maxProducts = 8,
  onQuickView,
  onAddToWishlist,
  onAddToCompare,
  className
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter out current product and limit results
  const filteredProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, maxProducts);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollButtons();
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [filteredProducts.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const newScrollLeft = scrollContainerRef.current.scrollLeft + 
      (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  if (!filteredProducts || filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className={cn("bg-white", className)}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          
          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                "p-2 rounded-full border transition-colors duration-200",
                canScrollLeft
                  ? "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              )}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                "p-2 rounded-full border transition-colors duration-200",
                canScrollRight
                  ? "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              )}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-64 sm:w-72"
              >
                <ProductCard
                  product={product}
                  view="grid"
                  onQuickView={onQuickView}
                  onAddToWishlist={onAddToWishlist}
                  onAddToCompare={onAddToCompare}
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays for visual scroll indication */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          )}
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center mt-4 sm:hidden">
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(filteredProducts.length / 2) }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact version for sidebars or smaller spaces
export const CompactRelatedProducts: React.FC<{
  products: Product[];
  currentProductId?: string;
  title?: string;
  maxProducts?: number;
  className?: string;
}> = ({
  products,
  currentProductId,
  title = 'You might also like',
  maxProducts = 4,
  className
}) => {
  const filteredProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, maxProducts);

  if (!filteredProducts || filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className={cn("bg-gray-50 rounded-lg p-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="flex gap-3">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                {product.name}
              </h4>
              <p className="text-lg font-bold text-amber-600">
                ${product.price.toLocaleString()}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Grid version for dedicated sections
export const RelatedProductsGrid: React.FC<{
  products: Product[];
  currentProductId?: string;
  title?: string;
  maxProducts?: number;
  columns?: 2 | 3 | 4;
  onQuickView?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  onAddToCompare?: (productId: string) => void;
  className?: string;
}> = ({
  products,
  currentProductId,
  title = 'Related Products',
  maxProducts = 8,
  columns = 4,
  onQuickView,
  onAddToWishlist,
  onAddToCompare,
  className
}) => {
  const filteredProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, maxProducts);

  if (!filteredProducts || filteredProducts.length === 0) {
    return null;
  }

  const getGridCols = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className={cn("bg-white", className)}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
        
        <div className={cn(`grid ${getGridCols()} gap-6`)}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              view="grid"
              onQuickView={onQuickView}
              onAddToWishlist={onAddToWishlist}
              onAddToCompare={onAddToCompare}
            />
          ))}
        </div>
      </div>
    </div>
  );
};