import { Product } from '@/types';

export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Grillz Set',
    description: 'Handcrafted 18k gold grillz with premium diamonds',
    price: 2500,
    originalPrice: 3000,
    images: [
      '/images/products/grillz-diamond-1.jpg',
      '/images/products/grillz-diamond-2.jpg',
      '/images/products/grillz-diamond-3.jpg'
    ],
    category: 'Grillz',
    material: '18k Gold',
    gemstone: 'Diamonds',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 47
  },
  {
    id: '2',
    name: 'Custom Gold Chain',
    description: 'Luxury Cuban link chain in solid 14k gold',
    price: 1800,
    images: [
      '/images/products/chain-cuban-1.jpg',
      '/images/products/chain-cuban-2.jpg'
    ],
    category: 'Chains',
    material: '14k Gold',
    size: '22 inches',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 32
  },
  {
    id: '3',
    name: 'Emerald Tennis Bracelet',
    description: 'Exquisite emerald and diamond tennis bracelet',
    price: 4200,
    originalPrice: 4800,
    images: [
      '/images/products/bracelet-emerald-1.jpg',
      '/images/products/bracelet-emerald-2.jpg'
    ],
    category: 'Bracelets',
    material: '18k White Gold',
    gemstone: 'Emeralds & Diamonds',
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewCount: 23
  },
  {
    id: '4',
    name: 'Sapphire Statement Ring',
    description: 'Bold sapphire ring with diamond accents',
    price: 3600,
    images: [
      '/images/products/ring-sapphire-1.jpg',
      '/images/products/ring-sapphire-2.jpg'
    ],
    category: 'Rings',
    material: '18k Gold',
    gemstone: 'Sapphire & Diamonds',
    size: 'Made to order',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 18
  },
  {
    id: '5',
    name: 'Pearl Drop Earrings',
    description: 'Elegant Tahitian pearl earrings with gold setting',
    price: 1400,
    images: [
      '/images/products/earrings-pearl-1.jpg',
      '/images/products/earrings-pearl-2.jpg'
    ],
    category: 'Earrings',
    material: '14k Gold',
    gemstone: 'Tahitian Pearls',
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 29
  },
  {
    id: '6',
    name: 'Custom Pendant',
    description: 'Personalized gold pendant with engraving',
    price: 890,
    images: [
      '/images/products/pendant-custom-1.jpg',
      '/images/products/pendant-custom-2.jpg'
    ],
    category: 'Pendants',
    material: '14k Gold',
    size: 'Custom',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 41
  }
];

export const productCategories = [
  {
    id: 'grillz',
    name: 'Custom Grillz',
    description: 'Handcrafted gold and diamond grillz',
    image: '/images/categories/grillz.jpg',
    count: 24
  },
  {
    id: 'chains',
    name: 'Gold Chains',
    description: 'Luxury chains and necklaces',
    image: '/images/categories/chains.jpg',
    count: 18
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
    count: 15
  },
  {
    id: 'earrings',
    name: 'Earrings',
    description: 'Pearl and diamond earrings',
    image: '/images/categories/earrings.jpg',
    count: 21
  },
  {
    id: 'pendants',
    name: 'Pendants',
    description: 'Custom and luxury pendants',
    image: '/images/categories/pendants.jpg',
    count: 12
  }
];

export default featuredProducts;