'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Metadata } from 'next';
import { ProductGrid, ProductGridWithPagination } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSort, MobileProductSort } from '@/components/products/ProductSort';
import { grillzProducts } from '@/data/grillz';
import { generateFilterOptions } from '@/lib/utils/productFilters';
import { filterProducts, searchProducts } from '@/lib/utils/productFilters';
import { sortProducts, smartSort } from '@/lib/utils/productSort';
import { ProductFilter, ProductSort as ProductSortType, Product } from '@/types';

// export const metadata: Metadata = {
//   title: 'Custom Grillz | Homer Jewelry',
//   description: 'Discover our exclusive collection of handcrafted gold and diamond grillz. Custom designs, premium materials, and exceptional craftsmanship.',
//   keywords: ['grillz', 'custom grillz', 'gold grillz', 'diamond grillz', 'luxury jewelry'],
//   openGraph: {
//     title: 'Custom Grillz Collection | Homer Jewelry',
//     description: 'Premium handcrafted grillz with diamonds and gold. Custom designs available.',
//     images: ['/images/categories/grillz.jpg']
//   }
// };

interface GrillzPageState {
  filters: ProductFilter;
  sort: ProductSortType;
  search: string;
  view: 'grid' | 'list';
  currentPage: number;
  itemsPerPage: number;
  showFilters: boolean;
}

/**
 * Grillz catalog page with advanced filtering, sorting, and pagination
 * Displays the complete collection of custom grillz products
 */
export default function GrillzPage() {
  const [state, setState] = useState<GrillzPageState>({
    filters: {},
    sort: { field: 'featured', direction: 'desc' },
    search: '',
    view: 'grid',
    currentPage: 1,
    itemsPerPage: 12,
    showFilters: false
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Generate available filter options from the grillz products
  const availableFilters = useMemo(() => {
    return generateFilterOptions(grillzProducts);
  }, []);

  // Apply filters, search, and sorting
  const processedProducts = useMemo(() => {
    let products = [...grillzProducts];

    // Apply search
    if (state.search) {
      products = searchProducts(products, state.search);
    }

    // Apply filters
    if (Object.keys(state.filters).length > 0) {
      products = filterProducts(products, state.filters);
    }

    // Apply sorting
    products = smartSort(products, state.sort);

    return products;
  }, [state.filters, state.search, state.sort]);

  // Paginate results
  const paginatedProducts = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return processedProducts.slice(startIndex, endIndex);
  }, [processedProducts, state.currentPage, state.itemsPerPage]);

  const totalPages = Math.ceil(processedProducts.length / state.itemsPerPage);

  const updateState = (updates: Partial<GrillzPageState>) => {
    setState(prev => ({ ...prev, ...updates, currentPage: 1 }));
  };

  const handleFiltersChange = (filters: ProductFilter) => {
    updateState({ filters });
  };

  const handleSortChange = (sort: ProductSortType) => {
    updateState({ sort });
  };

  const handleSearchChange = (search: string) => {
    updateState({ search });
  };

  const handleViewChange = (view: 'grid' | 'list') => {
    updateState({ view });
  };

  const handlePageChange = (page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  };

  const toggleFilters = () => {
    setState(prev => ({ ...prev, showFilters: !prev.showFilters }));
  };

  const handleQuickView = (productId: string) => {
    // Implement quick view modal
    console.log('Quick view:', productId);
  };

  const handleAddToWishlist = (productId: string) => {
    // Implement wishlist functionality
    console.log('Add to wishlist:', productId);
  };

  const handleAddToCompare = (productId: string) => {
    // Implement compare functionality
    console.log('Add to compare:', productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 to-amber-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Custom Grillz Collection
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto">
              Handcrafted luxury grillz featuring premium materials and exceptional craftsmanship. 
              Express your unique style with our custom designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{grillzProducts.length}+</div>
                <div className="text-amber-100">Designs Available</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-amber-100">Custom Made</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">2-4</div>
                <div className="text-amber-100">Week Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={state.search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search grillz..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
                {state.search && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Category Navigation */}
              <div className="flex gap-2 overflow-x-auto">
                {['all', 'top', 'bottom', 'full-set'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFiltersChange({
                      ...state.filters,
                      subcategory: category === 'all' ? undefined : [category]
                    })}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      (category === 'all' && !state.filters.subcategory) ||
                      (state.filters.subcategory?.includes(category))
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Sort and View Controls */}
            <div className="hidden lg:block">
              <ProductSort
                sort={state.sort}
                onSortChange={handleSortChange}
                view={state.view}
                onViewChange={handleViewChange}
                totalProducts={processedProducts.length}
              />
            </div>

            {/* Mobile Sort and Filter Controls */}
            <div className="lg:hidden">
              <MobileProductSort
                sort={state.sort}
                onSortChange={handleSortChange}
                totalProducts={processedProducts.length}
                onOpenFilters={toggleFilters}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <ProductFilters
                filters={state.filters}
                onFiltersChange={handleFiltersChange}
                availableFilters={availableFilters}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGridWithPagination
              products={paginatedProducts}
              loading={isLoading}
              view={state.view}
              columns={3}
              showQuickView={true}
              onQuickView={handleQuickView}
              onAddToWishlist={handleAddToWishlist}
              onAddToCompare={handleAddToCompare}
              currentPage={state.currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={state.itemsPerPage}
              totalItems={processedProducts.length}
            />

            {/* No Results */}
            {!isLoading && processedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.045-5.9-2.757L2 12l4.1 0.243A7.996 7.996 0 0012 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No grillz found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => updateState({ filters: {}, search: '' })}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
                  >
                    Clear all filters
                  </button>
                  <button
                    onClick={() => handleSearchChange('')}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {state.showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleFilters} />
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={toggleFilters}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <ProductFilters
                filters={state.filters}
                onFiltersChange={handleFiltersChange}
                availableFilters={availableFilters}
              />
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={toggleFilters}
                className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200"
              >
                Apply Filters ({processedProducts.length} results)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Categories Section */}
      <div className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Style</h2>
            <p className="text-lg text-gray-600">Find the perfect grillz for your style</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Top Grillz',
                description: 'Classic upper teeth grillz',
                count: grillzProducts.filter(p => p.subcategory === 'top').length,
                image: '/images/categories/grillz-top.jpg'
              },
              {
                title: 'Bottom Grillz',
                description: 'Lower teeth statement pieces',
                count: grillzProducts.filter(p => p.subcategory === 'bottom').length,
                image: '/images/categories/grillz-bottom.jpg'
              },
              {
                title: 'Full Sets',
                description: 'Complete top and bottom sets',
                count: grillzProducts.filter(p => p.subcategory === 'full-set').length,
                image: '/images/categories/grillz-full.jpg'
              }
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => handleFiltersChange({ subcategory: [category.title.toLowerCase().split(' ')[0]] })}
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                    <p className="text-sm opacity-90">{category.count} products</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}