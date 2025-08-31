'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { formatPrice, formatDiscountPercentage } from '@/lib/utils/priceFormatter';
import { ProductGallery } from './ProductGallery';
import { ProductOptions } from './ProductOptions';
import { cn } from '@/lib/utils';

interface ProductDetailProps {
  product: Product;
  onAddToCart?: (productId: string, options: Record<string, string>) => void;
  onAddToWishlist?: (productId: string) => void;
  className?: string;
}

/**
 * ProductDetail component displays comprehensive product information
 * Includes gallery, options, pricing, and detailed specifications
 */
export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  className
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [priceAdjustment, setPriceAdjustment] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'care' | 'shipping'>('description');

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const isOutOfStock = !product.inStock || product.availability === 'out-of-stock';
  const isLowStock = product.availability === 'low-stock' || (product.stockQuantity && product.stockQuantity <= 3);
  const finalPrice = product.price + priceAdjustment;

  const handleOptionsChange = (options: Record<string, string>, adjustment: number) => {
    setSelectedOptions(options);
    setPriceAdjustment(adjustment);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, selectedOptions);
    }
  };

  const handleAddToWishlist = () => {
    if (onAddToWishlist) {
      onAddToWishlist(product.id);
    }
  };

  const renderRating = () => {
    if (!product.rating) return null;

    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={cn(
                "w-5 h-5",
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
        <span className="text-sm font-medium text-gray-900">{product.rating}</span>
        {product.reviewCount && (
          <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
        )}
      </div>
    );
  };

  const renderBadges = () => (
    <div className="flex flex-wrap gap-2">
      {product.new && (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          New
        </span>
      )}
      {product.bestseller && (
        <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Bestseller
        </span>
      )}
      {product.featured && (
        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Featured
        </span>
      )}
      {isLowStock && !isOutOfStock && (
        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Low Stock
        </span>
      )}
      {product.tags?.includes('limited-edition') && (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Limited Edition
        </span>
      )}
    </div>
  );

  const renderAvailability = () => {
    if (isOutOfStock) {
      return (
        <div className="flex items-center gap-2 text-red-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Out of Stock</span>
        </div>
      );
    }

    if (isLowStock) {
      return (
        <div className="flex items-center gap-2 text-orange-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Only {product.stockQuantity} left</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 text-green-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">In Stock</span>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {showFullDescription ? product.description : product.shortDescription}
            </p>
            {product.description && product.description !== product.shortDescription && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-amber-600 hover:text-amber-700 font-medium text-sm mt-2"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-4">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.material && (
                <div>
                  <dt className="font-medium text-gray-900">Material</dt>
                  <dd className="mt-1 text-gray-600">{product.material}</dd>
                </div>
              )}
              {product.gemstone && (
                <div>
                  <dt className="font-medium text-gray-900">Gemstone</dt>
                  <dd className="mt-1 text-gray-600">{product.gemstone}</dd>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <dt className="font-medium text-gray-900">Dimensions</dt>
                  <dd className="mt-1 text-gray-600">{product.dimensions}</dd>
                </div>
              )}
              {product.weight && (
                <div>
                  <dt className="font-medium text-gray-900">Weight</dt>
                  <dd className="mt-1 text-gray-600">{product.weight}</dd>
                </div>
              )}
              {product.sku && (
                <div>
                  <dt className="font-medium text-gray-900">SKU</dt>
                  <dd className="mt-1 text-gray-600">{product.sku}</dd>
                </div>
              )}
              {product.warranty && (
                <div>
                  <dt className="font-medium text-gray-900">Warranty</dt>
                  <dd className="mt-1 text-gray-600">{product.warranty}</dd>
                </div>
              )}
            </dl>
          </div>
        );

      case 'care':
        return (
          <div className="space-y-4">
            {product.care && product.care.length > 0 ? (
              <ul className="space-y-2">
                {product.care.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{instruction}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Standard jewelry care instructions apply.</p>
            )}
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Estimated Delivery</h4>
                  <p className="text-gray-600">{product.estimatedDelivery || '2-3 weeks'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-gray-600">On orders over $500</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Secure Packaging</h4>
                  <p className="text-gray-600">Insured and tracked delivery</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("bg-white", className)}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              {renderBadges()}
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                {product.shortDescription && (
                  <p className="text-lg text-gray-600">{product.shortDescription}</p>
                )}
              </div>

              {renderRating()}
              {renderAvailability()}
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                {hasDiscount && (
                  <span className="text-2xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                )}
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(finalPrice)}
                </span>
                {hasDiscount && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    Save {formatDiscountPercentage(product.originalPrice!, product.price)}
                  </span>
                )}
              </div>
              
              {priceAdjustment !== 0 && (
                <div className="text-sm text-gray-600">
                  Base price: {formatPrice(product.price)} + Customizations: {formatPrice(priceAdjustment)}
                </div>
              )}
            </div>

            {/* Product Options */}
            {product.customizable && (
              <div className="border-t border-gray-200 pt-6">
                <ProductOptions
                  product={product}
                  onOptionsChange={handleOptionsChange}
                />
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center gap-4 mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-900">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="block w-20 rounded-md border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  disabled={isOutOfStock}
                >
                  {[...Array(Math.min(10, product.stockQuantity || 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={cn(
                    "flex-1 py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200",
                    isOutOfStock
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500"
                  )}
                >
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className="flex-shrink-0 p-3 border border-gray-300 rounded-md text-gray-600 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
                  title="Add to Wishlist"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { key: 'description', label: 'Description' },
                    { key: 'specifications', label: 'Specifications' },
                    { key: 'care', label: 'Care Instructions' },
                    { key: 'shipping', label: 'Shipping' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as typeof activeTab)}
                      className={cn(
                        "py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
                        activeTab === tab.key
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="py-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};