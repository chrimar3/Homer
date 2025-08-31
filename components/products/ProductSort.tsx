'use client';

import React from 'react';
import { ProductSort as ProductSortType } from '@/types';
import { cn } from '@/lib/utils';

interface ProductSortProps {
  sort: ProductSortType;
  onSortChange: (sort: ProductSortType) => void;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  totalProducts: number;
  className?: string;
}

/**
 * ProductSort component provides sorting and view controls for product listings
 * Includes dropdown for sort options and toggle for grid/list view
 */
export const ProductSort: React.FC<ProductSortProps> = ({
  sort,
  onSortChange,
  view,
  onViewChange,
  totalProducts,
  className
}) => {
  const sortOptions = [
    { value: 'featured-desc', label: 'Featured' },
    { value: 'newest-desc', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'popularity-desc', label: 'Most Popular' }
  ];

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-') as [ProductSortType['field'], ProductSortType['direction']];
    onSortChange({ field, direction });
  };

  const getCurrentSortValue = () => {
    return `${sort.field}-${sort.direction}`;
  };

  const getCurrentSortLabel = () => {
    const currentSort = sortOptions.find(option => option.value === getCurrentSortValue());
    return currentSort?.label || 'Featured';
  };

  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border-b border-gray-200 pb-4",
      className
    )}>
      {/* Results Count */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-700">
          <span className="font-medium">{totalProducts}</span> product{totalProducts !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Sort and View Controls */}
      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={getCurrentSortValue()}
            onChange={(e) => handleSortChange(e.target.value)}
            className="block rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center rounded-md border border-gray-300 bg-white">
          <button
            onClick={() => onViewChange('grid')}
            className={cn(
              "p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-l-md transition-colors duration-200",
              view === 'grid'
                ? "bg-amber-600 text-white"
                : "text-gray-700 hover:bg-gray-50"
            )}
            title="Grid view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={cn(
              "p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-r-md transition-colors duration-200 border-l border-gray-300",
              view === 'list'
                ? "bg-amber-600 text-white"
                : "text-gray-700 hover:bg-gray-50"
            )}
            title="List view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Mobile-optimized sort component
export const MobileProductSort: React.FC<{
  sort: ProductSortType;
  onSortChange: (sort: ProductSortType) => void;
  totalProducts: number;
  onOpenFilters?: () => void;
}> = ({ sort, onSortChange, totalProducts, onOpenFilters }) => {
  const sortOptions = [
    { value: 'featured-desc', label: 'Featured' },
    { value: 'newest-desc', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'popularity-desc', label: 'Most Popular' }
  ];

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-') as [ProductSortType['field'], ProductSortType['direction']];
    onSortChange({ field, direction });
  };

  const getCurrentSortValue = () => {
    return `${sort.field}-${sort.direction}`;
  };

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        {onOpenFilters && (
          <button
            onClick={onOpenFilters}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
            Filters
          </button>
        )}
        
        <p className="text-sm text-gray-600">
          {totalProducts} result{totalProducts !== 1 ? 's' : ''}
        </p>
      </div>

      <select
        value={getCurrentSortValue()}
        onChange={(e) => handleSortChange(e.target.value)}
        className="block rounded-md border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Compact sort component for smaller spaces
export const CompactProductSort: React.FC<{
  sort: ProductSortType;
  onSortChange: (sort: ProductSortType) => void;
  showLabel?: boolean;
}> = ({ sort, onSortChange, showLabel = true }) => {
  const sortOptions = [
    { value: 'featured-desc', label: 'Featured' },
    { value: 'newest-desc', label: 'Newest' },
    { value: 'price-asc', label: 'Price ↑' },
    { value: 'price-desc', label: 'Price ↓' },
    { value: 'rating-desc', label: 'Rating' },
    { value: 'popularity-desc', label: 'Popular' }
  ];

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-') as [ProductSortType['field'], ProductSortType['direction']];
    onSortChange({ field, direction });
  };

  const getCurrentSortValue = () => {
    return `${sort.field}-${sort.direction}`;
  };

  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort:</span>
      )}
      <select
        value={getCurrentSortValue()}
        onChange={(e) => handleSortChange(e.target.value)}
        className="block rounded-md border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};