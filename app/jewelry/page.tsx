'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Metadata } from 'next';
import { ProductGrid, ProductGridWithPagination } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSort, MobileProductSort } from '@/components/products/ProductSort';
import { jewelryProducts } from '@/data/jewelry';
import { generateFilterOptions } from '@/lib/utils/productFilters';
import { filterProducts, searchProducts } from '@/lib/utils/productFilters';
import { sortProducts, smartSort } from '@/lib/utils/productSort';
import { ProductFilter, ProductSort as ProductSortType, Product } from '@/types';

// export const metadata: Metadata = {
//   title: 'Fine Jewelry Collection | Homer Jewelry',
//   description: 'Explore our exquisite collection of fine jewelry including rings, necklaces, bracelets, and earrings. Luxury craftsmanship with premium materials.',
//   keywords: ['fine jewelry', 'luxury jewelry', 'diamond rings', 'gold necklaces', 'precious stones'],
//   openGraph: {
//     title: 'Fine Jewelry Collection | Homer Jewelry',
//     description: 'Premium fine jewelry with diamonds, gold, and precious stones. Exceptional craftsmanship.',
//     images: ['/images/categories/jewelry.jpg']
//   }
// };

interface JewelryPageState {
  filters: ProductFilter;
  sort: ProductSortType;
  search: string;
  view: 'grid' | 'list';
  currentPage: number;
  itemsPerPage: number;
  showFilters: boolean;
  selectedCategory: string;
}

/**
 * Jewelry catalog page with advanced filtering, sorting, and pagination
 * Displays the complete collection of fine jewelry products
 */
export default function JewelryPage() {
  const [state, setState] = useState<JewelryPageState>({
    filters: {},
    sort: { field: 'featured', direction: 'desc' },
    search: '',
    view: 'grid',
    currentPage: 1,
    itemsPerPage: 12,
    showFilters: false,
    selectedCategory: 'all'
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Generate available filter options from the jewelry products
  const availableFilters = useMemo(() => {
    return generateFilterOptions(jewelryProducts);
  }, []);

  // Apply filters, search, and sorting
  const processedProducts = useMemo(() => {
    let products = [...jewelryProducts];

    // Apply category filter if selected
    if (state.selectedCategory !== 'all') {
      products = products.filter(product => product.category === state.selectedCategory);
    }

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
  }, [state.filters, state.search, state.sort, state.selectedCategory]);

  // Paginate results
  const paginatedProducts = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return processedProducts.slice(startIndex, endIndex);
  }, [processedProducts, state.currentPage, state.itemsPerPage]);

  const totalPages = Math.ceil(processedProducts.length / state.itemsPerPage);

  const updateState = (updates: Partial<JewelryPageState>) => {
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

  const handleCategoryChange = (category: string) => {
    updateState({ selectedCategory: category, filters: {} });
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

  const categories = [
    { id: 'all', name: 'All Jewelry', count: jewelryProducts.length },
    { id: 'rings', name: 'Rings', count: jewelryProducts.filter(p => p.category === 'rings').length },
    { id: 'chains', name: 'Necklaces', count: jewelryProducts.filter(p => p.category === 'chains').length },
    { id: 'earrings', name: 'Earrings', count: jewelryProducts.filter(p => p.category === 'earrings').length },
    { id: 'bracelets', name: 'Bracelets', count: jewelryProducts.filter(p => p.category === 'bracelets').length },
    { id: 'pendants', name: 'Pendants', count: jewelryProducts.filter(p => p.category === 'pendants').length },
    { id: 'watches', name: 'Watches', count: jewelryProducts.filter(p => p.category === 'watches').length }
  ];

  const featuredCollections = [
    {
      title: 'Bridal Collection',
      description: 'Timeless pieces for your special day',
      products: jewelryProducts.filter(p => p.tags?.includes('bridal')).length,
      image: '/images/collections/bridal.jpg',
      filter: { tags: ['bridal'] }
    },
    {
      title: 'Statement Pieces',
      description: 'Bold designs that make an impact',
      products: jewelryProducts.filter(p => p.subcategory === 'statement').length,
      image: '/images/collections/statement.jpg',
      filter: { subcategory: ['statement'] }
    },
    {
      title: 'Everyday Luxury',
      description: 'Elegant pieces for daily wear',
      products: jewelryProducts.filter(p => p.subcategory === 'everyday').length,
      image: '/images/collections/everyday.jpg',
      filter: { subcategory: ['everyday'] }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fine Jewelry Collection
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover exquisite jewelry crafted with the finest materials and exceptional attention to detail. 
              From timeless classics to contemporary designs.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold">{jewelryProducts.length}+</div>
                <div className="text-blue-100 text-sm">Pieces Available</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold">Premium</div>
                <div className="text-blue-100 text-sm">Materials</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold">Lifetime</div>
                <div className="text-blue-100 text-sm">Warranty</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold">Expert</div>
                <div className="text-blue-100 text-sm">Craftsmanship</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                    state.selectedCategory === category.id
                      ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
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
                  placeholder="Search jewelry..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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

              {/* Quick Filters */}
              <div className="flex gap-2 overflow-x-auto">
                {['featured', 'new', 'bestseller'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleFiltersChange({
                      ...state.filters,
                      [filter]: state.filters[filter as keyof ProductFilter] ? undefined : true
                    })}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      state.filters[filter as keyof ProductFilter]
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
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
            {/* Active Filters Display */}
            {(Object.keys(state.filters).length > 0 || state.search || state.selectedCategory !== 'all') && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Active Filters:</h3>
                  <button
                    onClick={() => updateState({ filters: {}, search: '', selectedCategory: 'all' })}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {state.selectedCategory !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Category: {categories.find(c => c.id === state.selectedCategory)?.name}
                      <button
                        onClick={() => handleCategoryChange('all')}
                        className="ml-1 text-purple-600 hover:text-purple-700"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {state.search && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Search: "{state.search}"
                      <button
                        onClick={() => handleSearchChange('')}
                        className="ml-1 text-blue-600 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {Object.entries(state.filters).map(([key, value]) => {
                    if (!value) return null;
                    const displayValue = Array.isArray(value) ? value.join(', ') : value.toString();
                    return (
                      <span key={key} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {key}: {displayValue}
                        <button
                          onClick={() => handleFiltersChange({ ...state.filters, [key]: undefined })}
                          className="ml-1 text-gray-600 hover:text-gray-700"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a8.966 8.966 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jewelry found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => updateState({ filters: {}, search: '', selectedCategory: 'all' })}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    Clear all filters
                  </button>
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    View all jewelry
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
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
              >
                Apply Filters ({processedProducts.length} results)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Collections Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Collections</h2>
            <p className="text-lg text-gray-600">Curated collections for every occasion</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleFiltersChange(collection.filter)}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-medium opacity-90">{collection.products} pieces</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600">{collection.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}