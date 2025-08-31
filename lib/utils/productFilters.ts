import { Product, ProductFilter, ProductListResult, FilterOption } from '@/types';

/**
 * Filters products based on provided filter criteria
 * @param products Array of products to filter
 * @param filters Filter criteria object
 * @returns Filtered array of products
 */
export function filterProducts(products: Product[], filters: ProductFilter): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(product.category)) {
        return false;
      }
    }

    // Subcategory filter
    if (filters.subcategory && filters.subcategory.length > 0) {
      if (!product.subcategory || !filters.subcategory.includes(product.subcategory)) {
        return false;
      }
    }

    // Material filter
    if (filters.material && filters.material.length > 0) {
      if (!product.material || !filters.material.some(material => 
        product.material?.toLowerCase().includes(material.toLowerCase())
      )) {
        return false;
      }
    }

    // Gemstone filter
    if (filters.gemstone && filters.gemstone.length > 0) {
      if (!product.gemstone || !filters.gemstone.some(gemstone => 
        product.gemstone?.toLowerCase().includes(gemstone.toLowerCase())
      )) {
        return false;
      }
    }

    // Price range filter
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    // Availability filter
    if (filters.availability && filters.availability.length > 0) {
      const productAvailability = product.availability || (product.inStock ? 'in-stock' : 'out-of-stock');
      if (!filters.availability.includes(productAvailability)) {
        return false;
      }
    }

    // Featured filter
    if (filters.featured !== undefined) {
      if (product.featured !== filters.featured) {
        return false;
      }
    }

    // New filter
    if (filters.new !== undefined) {
      if (product.new !== filters.new) {
        return false;
      }
    }

    // Bestseller filter
    if (filters.bestseller !== undefined) {
      if (product.bestseller !== filters.bestseller) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating !== undefined) {
      if (!product.rating || product.rating < filters.rating) {
        return false;
      }
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      if (!product.tags || !filters.tags.some(tag => product.tags?.includes(tag))) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Searches products based on query string
 * @param products Array of products to search
 * @param query Search query
 * @returns Filtered array of products matching the search
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query || query.trim() === '') {
    return products;
  }

  const searchTerm = query.toLowerCase().trim();
  
  return products.filter(product => {
    // Search in name
    if (product.name.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in description
    if (product.description?.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in short description
    if (product.shortDescription?.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in category
    if (product.category.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in subcategory
    if (product.subcategory?.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in material
    if (product.material?.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in gemstone
    if (product.gemstone?.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in tags
    if (product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))) {
      return true;
    }

    return false;
  });
}

/**
 * Generates filter options from products array
 * @param products Array of products to generate filters from
 * @returns Object containing available filter options with counts
 */
export function generateFilterOptions(products: Product[]): {
  categories: FilterOption[];
  materials: FilterOption[];
  gemstones: FilterOption[];
  subcategories: FilterOption[];
  tags: FilterOption[];
  priceRange: { min: number; max: number };
} {
  const categories: Record<string, number> = {};
  const materials: Record<string, number> = {};
  const gemstones: Record<string, number> = {};
  const subcategories: Record<string, number> = {};
  const tags: Record<string, number> = {};
  let minPrice = Infinity;
  let maxPrice = 0;

  products.forEach(product => {
    // Count categories
    categories[product.category] = (categories[product.category] || 0) + 1;

    // Count subcategories
    if (product.subcategory) {
      subcategories[product.subcategory] = (subcategories[product.subcategory] || 0) + 1;
    }

    // Count materials
    if (product.material) {
      materials[product.material] = (materials[product.material] || 0) + 1;
    }

    // Count gemstones
    if (product.gemstone) {
      gemstones[product.gemstone] = (gemstones[product.gemstone] || 0) + 1;
    }

    // Count tags
    if (product.tags) {
      product.tags.forEach(tag => {
        tags[tag] = (tags[tag] || 0) + 1;
      });
    }

    // Track price range
    minPrice = Math.min(minPrice, product.price);
    maxPrice = Math.max(maxPrice, product.price);
  });

  return {
    categories: Object.entries(categories).map(([value, count]) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
      count
    })).sort((a, b) => b.count - a.count),

    materials: Object.entries(materials).map(([value, count]) => ({
      value: value.toLowerCase().replace(/\s+/g, '-'),
      label: value,
      count
    })).sort((a, b) => b.count - a.count),

    gemstones: Object.entries(gemstones).map(([value, count]) => ({
      value: value.toLowerCase().replace(/\s+/g, '-'),
      label: value,
      count
    })).sort((a, b) => b.count - a.count),

    subcategories: Object.entries(subcategories).map(([value, count]) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' '),
      count
    })).sort((a, b) => b.count - a.count),

    tags: Object.entries(tags).map(([value, count]) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' '),
      count
    })).sort((a, b) => b.count - a.count),

    priceRange: {
      min: minPrice === Infinity ? 0 : minPrice,
      max: maxPrice
    }
  };
}

/**
 * Checks if any filters are currently active
 * @param filters ProductFilter object
 * @returns Boolean indicating if any filters are active
 */
export function hasActiveFilters(filters: ProductFilter): boolean {
  return !!(
    (filters.category && filters.category.length > 0) ||
    (filters.subcategory && filters.subcategory.length > 0) ||
    (filters.material && filters.material.length > 0) ||
    (filters.gemstone && filters.gemstone.length > 0) ||
    (filters.availability && filters.availability.length > 0) ||
    (filters.tags && filters.tags.length > 0) ||
    filters.priceRange ||
    filters.featured !== undefined ||
    filters.new !== undefined ||
    filters.bestseller !== undefined ||
    filters.rating !== undefined
  );
}

/**
 * Clears all active filters
 * @returns Empty ProductFilter object
 */
export function clearAllFilters(): ProductFilter {
  return {};
}

/**
 * Counts the number of active filters
 * @param filters ProductFilter object
 * @returns Number of active filters
 */
export function getActiveFilterCount(filters: ProductFilter): number {
  let count = 0;
  
  if (filters.category && filters.category.length > 0) count++;
  if (filters.subcategory && filters.subcategory.length > 0) count++;
  if (filters.material && filters.material.length > 0) count++;
  if (filters.gemstone && filters.gemstone.length > 0) count++;
  if (filters.availability && filters.availability.length > 0) count++;
  if (filters.tags && filters.tags.length > 0) count++;
  if (filters.priceRange) count++;
  if (filters.featured !== undefined) count++;
  if (filters.new !== undefined) count++;
  if (filters.bestseller !== undefined) count++;
  if (filters.rating !== undefined) count++;

  return count;
}

/**
 * Parses price range string into min/max values
 * @param priceRangeString String like "1000-2500" or "10000+"
 * @returns Object with min and max values
 */
export function parsePriceRange(priceRangeString: string): { min: number; max: number } | null {
  if (!priceRangeString) return null;

  if (priceRangeString.includes('+')) {
    const min = parseInt(priceRangeString.replace('+', ''));
    return { min, max: Infinity };
  }

  if (priceRangeString.includes('-')) {
    const [minStr, maxStr] = priceRangeString.split('-');
    return {
      min: parseInt(minStr) || 0,
      max: parseInt(maxStr) || Infinity
    };
  }

  return null;
}

/**
 * Formats filter options for display
 * @param options Array of filter options
 * @param selectedValues Array of selected values
 * @returns Formatted options with selection status
 */
export function formatFilterOptions(options: FilterOption[], selectedValues: string[] = []) {
  return options.map(option => ({
    ...option,
    selected: selectedValues.includes(option.value),
    disabled: option.count === 0
  }));
}