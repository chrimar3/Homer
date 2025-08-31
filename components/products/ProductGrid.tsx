'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  view?: 'grid' | 'list';
  columns?: 2 | 3 | 4 | 5;
  showQuickView?: boolean;
  onQuickView?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  onAddToCompare?: (productId: string) => void;
  className?: string;
}

/**
 * ProductGrid component displays a grid or list of products with loading states
 * Supports responsive layouts and different column configurations
 */
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  view = 'grid',
  columns = 3,
  showQuickView = true,
  onQuickView,
  onAddToWishlist,
  onAddToCompare,
  className
}) => {
  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded mb-3 w-3/4" />
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-20" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500 max-w-sm">
        We couldn't find any products matching your current filters. Try adjusting your search criteria or browse our featured collections.
      </p>
    </div>
  );

  // Grid column classes based on column prop
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 5:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (loading) {
    return (
      <div className={cn(
        view === 'grid' 
          ? `grid ${getGridCols()} gap-6`
          : 'flex flex-col gap-4',
        className
      )}>
        {[...Array(view === 'grid' ? columns * 2 : 6)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={cn(
        view === 'grid' 
          ? `grid ${getGridCols()}`
          : 'flex flex-col',
        className
      )}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={cn(
      view === 'grid' 
        ? `grid ${getGridCols()} gap-6`
        : 'flex flex-col gap-4',
      className
    )}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          view={view}
          showQuickView={showQuickView}
          onQuickView={onQuickView}
          onAddToWishlist={onAddToWishlist}
          onAddToCompare={onAddToCompare}
        />
      ))}
    </div>
  );
};

// Product grid with pagination support
interface ProductGridWithPaginationProps extends ProductGridProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export const ProductGridWithPagination: React.FC<ProductGridWithPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  ...gridProps
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const Pagination = () => {
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      const showEllipsis = totalPages > 7;

      if (!showEllipsis) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Show pages 2-5, then ellipsis, then last page
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push('...');
        }
      } else if (currentPage >= totalPages - 3) {
        // Show first page, ellipsis, then last 4 pages
        pages.push('...');
        for (let i = Math.max(totalPages - 4, 2); i <= totalPages - 1; i++) {
          pages.push(i);
        }
      } else {
        // Show first, ellipsis, current-1, current, current+1, ellipsis, last
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
      }

      // Always show last page (if not already included)
      if (totalPages > 1 && pages[pages.length - 1] !== totalPages) {
        pages.push(totalPages);
      }

      return pages;
    };

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startItem}</span> to{' '}
              <span className="font-medium">{endItem}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>

              {getPageNumbers().map((page, index) => {
                if (page === '...') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                    >
                      ...
                    </span>
                  );
                }

                const pageNumber = page as number;
                const isCurrentPage = pageNumber === currentPage;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={cn(
                      "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
                      isCurrentPage
                        ? "z-10 bg-amber-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        : "text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <ProductGrid {...gridProps} />
      {totalPages > 1 && <Pagination />}
    </div>
  );
};