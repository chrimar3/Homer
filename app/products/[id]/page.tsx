'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/products/ProductDetail';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { grillzProducts } from '@/data/grillz';
import { jewelryProducts } from '@/data/jewelry';
import { Product } from '@/types';

/**
 * Dynamic product detail page that displays individual product information
 * Supports both grillz and jewelry products with related product suggestions
 */
export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Find the product from all available products
  const product = useMemo(() => {
    const allProducts = [...grillzProducts, ...jewelryProducts];
    return allProducts.find(p => p.id === productId);
  }, [productId]);

  // Get related products from the same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    
    const allProducts = [...grillzProducts, ...jewelryProducts];
    return allProducts
      .filter(p => 
        p.id !== product.id && 
        (p.category === product.category || 
         p.material === product.material ||
         p.gemstone === product.gemstone)
      )
      .slice(0, 12);
  }, [product]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [productId]);

  // Handle product not found
  if (!isLoading && !product) {
    notFound();
  }

  const handleAddToCart = (productId: string, options: Record<string, string>) => {
    setSelectedOptions(options);
    // Implement cart functionality
    console.log('Adding to cart:', { productId, options });
    
    // Show success message or redirect
    // You could implement a toast notification here
    alert(`${product?.name} added to cart!`);
  };

  const handleAddToWishlist = (productId: string) => {
    // Implement wishlist functionality
    console.log('Adding to wishlist:', productId);
    alert(`${product?.name} added to wishlist!`);
  };

  const handleQuickView = (productId: string) => {
    // Navigate to the product page
    router.push(`/products/${productId}`);
  };

  const handleAddToCompare = (productId: string) => {
    // Implement compare functionality
    console.log('Adding to compare:', productId);
    alert('Product added to comparison list!');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Loading skeleton */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            {/* Image skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-16 h-16 bg-gray-200 rounded-md" />
                ))}
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
              
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
              
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4" />
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/6" />
                <div className="flex gap-4">
                  <div className="h-12 bg-gray-200 rounded flex-1" />
                  <div className="h-12 w-12 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null; // This will be handled by notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => router.push('/')}
              className="hover:text-gray-900 transition-colors duration-200"
            >
              Home
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <button
              onClick={() => router.push(product.category === 'grillz' ? '/grillz' : '/jewelry')}
              className="hover:text-gray-900 transition-colors duration-200 capitalize"
            >
              {product.category === 'grillz' ? 'Grillz' : 'Jewelry'}
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Product Features Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lifetime Warranty</h3>
              <p className="text-gray-600">
                All our products come with comprehensive lifetime warranty coverage
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Complimentary insured shipping on all orders over $500
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Craftsmanship</h3>
              <p className="text-gray-600">
                Handcrafted by master artisans using traditional techniques
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          currentProductId={product.id}
          title="You Might Also Like"
          maxProducts={8}
          onQuickView={handleQuickView}
          onAddToWishlist={handleAddToWishlist}
          onAddToCompare={handleAddToCompare}
        />
      )}

      {/* Trust Indicators */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose Homer?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We've been crafting exceptional jewelry for over a decade, 
              trusted by celebrities and jewelry enthusiasts worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">10+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">50k+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">100+</div>
              <div className="text-gray-300">Celebrity Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">4.9★</div>
              <div className="text-gray-300">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error Boundary for handling product not found
export function generateStaticParams() {
  const allProducts = [...grillzProducts, ...jewelryProducts];
  return allProducts.map((product) => ({
    id: product.id,
  }));
}