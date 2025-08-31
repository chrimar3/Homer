/**
 * Product components index file for easy imports
 * Exports all product-related components from a single entry point
 */

// Core product components
export { ProductCard } from './ProductCard';
export { ProductGrid, ProductGridWithPagination } from './ProductGrid';
export { ProductFilters } from './ProductFilters';
export { ProductSort, MobileProductSort, CompactProductSort } from './ProductSort';

// Product detail components
export { ProductDetail } from './ProductDetail';
export { ProductGallery } from './ProductGallery';
export { ProductOptions } from './ProductOptions';

// Related product components
export { 
  RelatedProducts, 
  CompactRelatedProducts, 
  RelatedProductsGrid 
} from './RelatedProducts';

// Re-export types for convenience
export type {
  Product,
  ProductFilter,
  ProductSort as ProductSortType,
  ProductCustomization,
  ProductCustomizationOption,
  ProductListOptions,
  ProductListResult,
  FilterOption,
  ProductViewState
} from '@/types';