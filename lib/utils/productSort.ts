import { Product, ProductSort } from '@/types';

/**
 * Sorts products based on provided sort criteria
 * @param products Array of products to sort
 * @param sort Sort criteria object
 * @returns Sorted array of products
 */
export function sortProducts(products: Product[], sort: ProductSort): Product[] {
  const sortedProducts = [...products];

  sortedProducts.sort((a, b) => {
    let comparison = 0;

    switch (sort.field) {
      case 'price':
        comparison = a.price - b.price;
        break;

      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;

      case 'rating':
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        comparison = ratingA - ratingB;
        break;

      case 'newest':
        const dateA = new Date(a.createdAt || '2024-01-01').getTime();
        const dateB = new Date(b.createdAt || '2024-01-01').getTime();
        comparison = dateA - dateB;
        break;

      case 'featured':
        const featuredA = a.featured ? 1 : 0;
        const featuredB = b.featured ? 1 : 0;
        comparison = featuredA - featuredB;
        // Secondary sort by rating for featured items
        if (comparison === 0) {
          const ratingCompare = (b.rating || 0) - (a.rating || 0);
          if (ratingCompare !== 0) return ratingCompare;
          // Tertiary sort by review count
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        }
        break;

      case 'popularity':
        // Sort by review count, then by rating
        const reviewCountA = a.reviewCount || 0;
        const reviewCountB = b.reviewCount || 0;
        comparison = reviewCountA - reviewCountB;
        if (comparison === 0) {
          comparison = (a.rating || 0) - (b.rating || 0);
        }
        break;

      default:
        comparison = 0;
    }

    // Apply direction
    return sort.direction === 'desc' ? -comparison : comparison;
  });

  return sortedProducts;
}

/**
 * Parses sort string into ProductSort object
 * @param sortString String like "price-asc" or "rating-desc"
 * @returns ProductSort object
 */
export function parseSortString(sortString: string): ProductSort {
  const [field, direction] = sortString.split('-') as [ProductSort['field'], ProductSort['direction']];
  
  return {
    field: field || 'featured',
    direction: direction || 'desc'
  };
}

/**
 * Formats ProductSort object into string
 * @param sort ProductSort object
 * @returns Sort string like "price-asc"
 */
export function formatSortString(sort: ProductSort): string {
  return `${sort.field}-${sort.direction}`;
}

/**
 * Gets default sort for a specific category
 * @param category Product category
 * @returns Default ProductSort object for the category
 */
export function getDefaultSort(category?: string): ProductSort {
  // Different categories might have different default sorts
  switch (category) {
    case 'grillz':
      return { field: 'featured', direction: 'desc' };
    case 'jewelry':
      return { field: 'featured', direction: 'desc' };
    default:
      return { field: 'featured', direction: 'desc' };
  }
}

/**
 * Gets available sort options
 * @returns Array of sort option objects
 */
export function getSortOptions() {
  return [
    { value: 'featured-desc', label: 'Featured' },
    { value: 'newest-desc', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'popularity-desc', label: 'Most Popular' }
  ];
}

/**
 * Creates a multi-level sort function for complex sorting
 * @param sortCriteria Array of sort criteria in order of priority
 * @returns Function that can be used with Array.sort()
 */
export function createMultiSort(sortCriteria: ProductSort[]) {
  return (a: Product, b: Product): number => {
    for (const sort of sortCriteria) {
      let comparison = 0;

      switch (sort.field) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
        case 'newest':
          const dateA = new Date(a.createdAt || '2024-01-01').getTime();
          const dateB = new Date(b.createdAt || '2024-01-01').getTime();
          comparison = dateA - dateB;
          break;
        case 'featured':
          comparison = (a.featured ? 1 : 0) - (b.featured ? 1 : 0);
          break;
        case 'popularity':
          comparison = (a.reviewCount || 0) - (b.reviewCount || 0);
          break;
      }

      if (comparison !== 0) {
        return sort.direction === 'desc' ? -comparison : comparison;
      }
    }

    return 0;
  };
}

/**
 * Sorts products with smart defaults based on available data
 * @param products Array of products to sort
 * @param primarySort Primary sort criteria
 * @returns Sorted products with intelligent fallback sorting
 */
export function smartSort(products: Product[], primarySort: ProductSort): Product[] {
  // Create multi-level sort with smart fallbacks
  const sortCriteria: ProductSort[] = [primarySort];

  // Add intelligent secondary sorts based on primary sort
  switch (primarySort.field) {
    case 'price':
      // After price, sort by rating and then by popularity
      sortCriteria.push({ field: 'rating', direction: 'desc' });
      sortCriteria.push({ field: 'popularity', direction: 'desc' });
      break;
    
    case 'name':
      // After name, maintain featured items at top
      sortCriteria.push({ field: 'featured', direction: 'desc' });
      break;
    
    case 'rating':
      // After rating, sort by popularity and then by recency
      sortCriteria.push({ field: 'popularity', direction: 'desc' });
      sortCriteria.push({ field: 'newest', direction: 'desc' });
      break;
    
    case 'newest':
      // After date, sort by featured status and rating
      sortCriteria.push({ field: 'featured', direction: 'desc' });
      sortCriteria.push({ field: 'rating', direction: 'desc' });
      break;
    
    case 'featured':
      // For featured sort, secondary by rating, then by popularity
      sortCriteria.push({ field: 'rating', direction: 'desc' });
      sortCriteria.push({ field: 'popularity', direction: 'desc' });
      break;
    
    case 'popularity':
      // After popularity, sort by rating and featured status
      sortCriteria.push({ field: 'rating', direction: 'desc' });
      sortCriteria.push({ field: 'featured', direction: 'desc' });
      break;
    
    default:
      // Default fallback chain
      sortCriteria.push({ field: 'featured', direction: 'desc' });
      sortCriteria.push({ field: 'rating', direction: 'desc' });
      sortCriteria.push({ field: 'popularity', direction: 'desc' });
  }

  const sortedProducts = [...products];
  sortedProducts.sort(createMultiSort(sortCriteria));
  
  return sortedProducts;
}