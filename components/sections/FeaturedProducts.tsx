'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, BaseComponentProps } from '@/types';
import { featuredProducts } from '@/data/products';

interface FeaturedProductsProps extends BaseComponentProps {}

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative bg-white rounded-none shadow-lg hover:shadow-luxury-hover transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
      {/* Product Images */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            } ${imageLoaded ? '' : 'animate-pulse bg-gray-200'}`}
            onLoad={() => setImageLoaded(true)}
          />
        ))}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex gap-3">
            <button
              onClick={() => onQuickView(product)}
              className="bg-white text-homer-gold px-4 py-2 rounded-none font-montserrat font-medium text-sm hover:bg-homer-gold hover:text-white transition-all duration-300 shadow-lg"
            >
              QUICK VIEW
            </button>
            <button
              onClick={() => onAddToCart(product.id)}
              className="bg-homer-gold text-white px-4 py-2 rounded-none font-montserrat font-medium text-sm hover:bg-homer-darkGold transition-all duration-300 shadow-lg"
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Sale Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-montserrat font-bold rounded-none">
            SALE
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-homer-gold text-white px-2 py-1 text-xs font-montserrat font-bold rounded-none">
            FEATURED
          </div>
        )}

        {/* Image Navigation (if multiple images) */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-homer-gold' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-cinzel text-lg font-semibold text-gray-900 group-hover:text-homer-gold transition-colors duration-300">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1">
              <div className="flex text-homer-gold">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-current' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        {/* Material & Details */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.material && (
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-none font-montserrat">
              {product.material}
            </span>
          )}
          {product.gemstone && (
            <span className="inline-block bg-homer-gold/10 text-homer-darkGold px-2 py-1 text-xs rounded-none font-montserrat">
              {product.gemstone}
            </span>
          )}
          {product.size && (
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-none font-montserrat">
              {product.size}
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xl font-bold text-homer-gold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-xs font-montserrat ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ className = '' }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    // Here you would typically open a modal or navigate to product page
    console.log('Quick view:', product.name);
  };

  const handleAddToCart = (productId: string) => {
    // Here you would typically add to cart logic
    console.log('Add to cart:', productId);
  };

  return (
    <section id="featured-products" className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-homer-gold font-montserrat tracking-[0.2em] uppercase text-sm mb-4">
            Handcrafted Excellence
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover our most coveted pieces, each meticulously crafted to embody 
            the perfect fusion of traditional artistry and contemporary luxury
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ 
                animationDelay: `${featuredProducts.indexOf(product) * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <ProductCard
                product={product}
                onQuickView={handleQuickView}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="group bg-homer-gold hover:bg-homer-darkGold text-white px-12 py-4 rounded-none font-montserrat font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-luxury hover:shadow-luxury-hover">
            <span className="flex items-center justify-center gap-2">
              VIEW ALL PRODUCTS
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

      {/* Quick View Modal would go here */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-none">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-cinzel text-2xl font-bold">{selectedProduct.name}</h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Quick view content would go here */}
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              <div className="text-2xl font-cinzel font-bold text-homer-gold">
                ${selectedProduct.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};