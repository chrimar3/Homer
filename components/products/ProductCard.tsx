'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, formatDiscountPercentage } from '@/lib/utils/priceFormatter';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
  showQuickView?: boolean;
  onQuickView?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  onAddToCompare?: (productId: string) => void;
  className?: string;
}

/**
 * ProductCard component displays a product with image, details, and actions
 * Supports both grid and list views with hover effects and quick actions
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  view = 'grid',
  showQuickView = true,
  onQuickView,
  onAddToWishlist,
  onAddToCompare,
  className
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const isOutOfStock = !product.inStock || product.availability === 'out-of-stock';
  const isLowStock = product.availability === 'low-stock' || (product.stockQuantity && product.stockQuantity <= 3);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product.id);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(product.id);
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCompare) {
      onAddToCompare(product.id);
    }
  };

  const handleImageHover = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
  };

  const renderBadges = () => (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
      {product.new && (
        <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
          New
        </span>
      )}
      {product.bestseller && (
        <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
          Bestseller
        </span>
      )}
      {product.featured && (
        <span className="bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded">
          Featured
        </span>
      )}
      {hasDiscount && (
        <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
          -{formatDiscountPercentage(product.originalPrice!, product.price)} OFF
        </span>
      )}
      {isOutOfStock && (
        <span className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
          Out of Stock
        </span>
      )}
      {isLowStock && !isOutOfStock && (
        <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
          Low Stock
        </span>
      )}
    </div>
  );

  const renderQuickActions = () => (
    <div className={cn(
      "absolute top-3 right-3 z-10 flex flex-col gap-2 transition-opacity duration-200",
      isHovered ? "opacity-100" : "opacity-0"
    )}>
      {showQuickView && (
        <button
          onClick={handleQuickView}
          className="bg-white hover:bg-gray-50 text-gray-800 p-2 rounded-full shadow-md transition-colors duration-200"
          title="Quick View"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      )}
      
      {onAddToWishlist && (
        <button
          onClick={handleWishlist}
          className="bg-white hover:bg-gray-50 text-gray-800 p-2 rounded-full shadow-md transition-colors duration-200"
          title="Add to Wishlist"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      )}
      
      {onAddToCompare && (
        <button
          onClick={handleCompare}
          className="bg-white hover:bg-gray-50 text-gray-800 p-2 rounded-full shadow-md transition-colors duration-200"
          title="Add to Compare"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
      )}
    </div>
  );

  const renderRating = () => {
    if (!product.rating) return null;

    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={cn(
                "w-4 h-4",
                index < fullStars
                  ? "text-amber-400 fill-current"
                  : index === fullStars && hasHalfStar
                  ? "text-amber-400"
                  : "text-gray-300"
              )}
              fill={index < fullStars ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          ))}
        </div>
        {product.reviewCount && (
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        )}
      </div>
    );
  };

  if (view === 'list') {
    return (
      <Link href={`/products/${product.id}`} className={cn(
        "group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200",
        className
      )}>
        <div className="flex gap-4 p-4">
          <div className="relative flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
            {!imageError ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-amber-600 transition-colors duration-200">
                {product.name}
              </h3>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  {hasDiscount && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice!)}
                    </span>
                  )}
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </div>
            
            {product.shortDescription && (
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.shortDescription}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {product.material && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {product.material}
                  </span>
                )}
                {product.gemstone && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {product.gemstone}
                  </span>
                )}
              </div>
              
              {renderRating()}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden",
        isOutOfStock && "opacity-75",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {!imageError ? (
            <Image
              src={product.images[currentImageIndex] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
          {renderBadges()}
          {renderQuickActions()}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200">
            {product.name}
          </h3>
          
          {product.shortDescription && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.shortDescription}
            </p>
          )}
          
          <div className="flex items-center justify-between mb-2">
            <div>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through block">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>
            
            {renderRating()}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {product.material && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {product.material}
              </span>
            )}
            {product.gemstone && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {product.gemstone}
              </span>
            )}
          </div>
          
          {product.estimatedDelivery && (
            <p className="text-xs text-gray-500">
              📦 {product.estimatedDelivery}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};