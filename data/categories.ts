import { ProductCategory, FilterOption } from '@/types';

export const productCategories: ProductCategory[] = [
  {
    id: 'grillz',
    name: 'Custom Grillz',
    description: 'Handcrafted gold and diamond grillz',
    image: '/images/categories/grillz.jpg',
    count: 28
  },
  {
    id: 'chains',
    name: 'Gold Chains',
    description: 'Luxury chains and necklaces',
    image: '/images/categories/chains.jpg',
    count: 24
  },
  {
    id: 'rings',
    name: 'Fine Rings',
    description: 'Statement and engagement rings',
    image: '/images/categories/rings.jpg',
    count: 32
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    description: 'Tennis and charm bracelets',
    image: '/images/categories/bracelets.jpg',
    count: 18
  },
  {
    id: 'earrings',
    name: 'Earrings',
    description: 'Pearl and diamond earrings',
    image: '/images/categories/earrings.jpg',
    count: 22
  },
  {
    id: 'pendants',
    name: 'Pendants',
    description: 'Custom and luxury pendants',
    image: '/images/categories/pendants.jpg',
    count: 15
  },
  {
    id: 'watches',
    name: 'Luxury Watches',
    description: 'High-end timepieces',
    image: '/images/categories/watches.jpg',
    count: 12
  },
  {
    id: 'cufflinks',
    name: 'Cufflinks',
    description: 'Elegant accessories',
    image: '/images/categories/cufflinks.jpg',
    count: 8
  }
];

export const grillzSubcategories: FilterOption[] = [
  { value: 'top', label: 'Top Grillz', count: 12 },
  { value: 'bottom', label: 'Bottom Grillz', count: 10 },
  { value: 'full-set', label: 'Full Set', count: 6 }
];

export const jewelrySubcategories: FilterOption[] = [
  { value: 'statement', label: 'Statement Pieces', count: 15 },
  { value: 'everyday', label: 'Everyday Wear', count: 22 },
  { value: 'occasion', label: 'Special Occasion', count: 18 },
  { value: 'bridal', label: 'Bridal Collection', count: 12 }
];

export const materials: FilterOption[] = [
  { value: '10k-gold', label: '10K Gold', count: 24 },
  { value: '14k-gold', label: '14K Gold', count: 42 },
  { value: '18k-gold', label: '18K Gold', count: 38 },
  { value: '24k-gold', label: '24K Gold', count: 8 },
  { value: 'white-gold', label: 'White Gold', count: 28 },
  { value: 'rose-gold', label: 'Rose Gold', count: 22 },
  { value: 'platinum', label: 'Platinum', count: 15 },
  { value: 'silver', label: 'Sterling Silver', count: 18 },
  { value: 'titanium', label: 'Titanium', count: 6 }
];

export const gemstones: FilterOption[] = [
  { value: 'diamonds', label: 'Diamonds', count: 48 },
  { value: 'emerald', label: 'Emerald', count: 12 },
  { value: 'ruby', label: 'Ruby', count: 10 },
  { value: 'sapphire', label: 'Sapphire', count: 14 },
  { value: 'pearls', label: 'Pearls', count: 16 },
  { value: 'topaz', label: 'Topaz', count: 8 },
  { value: 'amethyst', label: 'Amethyst', count: 6 },
  { value: 'opal', label: 'Opal', count: 4 },
  { value: 'tanzanite', label: 'Tanzanite', count: 3 },
  { value: 'aquamarine', label: 'Aquamarine', count: 5 }
];

export const priceRanges: FilterOption[] = [
  { value: '0-500', label: 'Under $500', count: 18 },
  { value: '500-1000', label: '$500 - $1,000', count: 24 },
  { value: '1000-2500', label: '$1,000 - $2,500', count: 32 },
  { value: '2500-5000', label: '$2,500 - $5,000', count: 28 },
  { value: '5000-10000', label: '$5,000 - $10,000', count: 16 },
  { value: '10000+', label: '$10,000+', count: 12 }
];

export const availabilityOptions: FilterOption[] = [
  { value: 'in-stock', label: 'In Stock', count: 98 },
  { value: 'low-stock', label: 'Low Stock', count: 12 },
  { value: 'pre-order', label: 'Pre-Order', count: 8 },
  { value: 'out-of-stock', label: 'Out of Stock', count: 4 }
];

export const sortOptions = [
  { value: 'featured-desc', label: 'Featured' },
  { value: 'newest-desc', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'popularity-desc', label: 'Most Popular' }
];

export const tags: FilterOption[] = [
  { value: 'custom', label: 'Custom Made', count: 45 },
  { value: 'handcrafted', label: 'Handcrafted', count: 38 },
  { value: 'limited-edition', label: 'Limited Edition', count: 12 },
  { value: 'bestseller', label: 'Bestseller', count: 28 },
  { value: 'new-arrival', label: 'New Arrival', count: 18 },
  { value: 'exclusive', label: 'Exclusive', count: 8 },
  { value: 'celebrity-favorite', label: 'Celebrity Favorite', count: 15 },
  { value: 'eco-friendly', label: 'Eco-Friendly', count: 6 }
];