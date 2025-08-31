export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  featured: boolean;
  tags: string[];
  likes?: number;
  date: string;
  instagramUrl?: string;
  productId?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Diamond Grillz Masterpiece',
    description: 'Custom 18k gold grillz with flawless diamonds',
    image: '/images/gallery/grillz-diamond-showcase.jpg',
    category: 'Grillz',
    featured: true,
    tags: ['diamonds', '18k-gold', 'custom', 'luxury'],
    likes: 324,
    date: '2024-08-20',
    instagramUrl: 'https://instagram.com/p/homer-grillz-1',
    productId: '1'
  },
  {
    id: '2',
    title: 'Emerald Tennis Excellence',
    description: 'Stunning emerald and diamond tennis bracelet',
    image: '/images/gallery/bracelet-emerald-detail.jpg',
    category: 'Bracelets',
    featured: true,
    tags: ['emeralds', 'diamonds', 'tennis-bracelet', 'luxury'],
    likes: 289,
    date: '2024-08-18',
    instagramUrl: 'https://instagram.com/p/homer-bracelet-1',
    productId: '3'
  },
  {
    id: '3',
    title: 'Cuban Chain Perfection',
    description: 'Heavy 14k gold Cuban link chain',
    image: '/images/gallery/chain-cuban-lifestyle.jpg',
    category: 'Chains',
    featured: true,
    tags: ['cuban-link', '14k-gold', 'chain', 'heavy'],
    likes: 412,
    date: '2024-08-15',
    instagramUrl: 'https://instagram.com/p/homer-chain-1',
    productId: '2'
  },
  {
    id: '4',
    title: 'Sapphire Statement',
    description: 'Bold sapphire ring with diamond accents',
    image: '/images/gallery/ring-sapphire-close.jpg',
    category: 'Rings',
    featured: true,
    tags: ['sapphire', 'diamonds', 'statement-ring', '18k-gold'],
    likes: 267,
    date: '2024-08-12',
    instagramUrl: 'https://instagram.com/p/homer-ring-1',
    productId: '4'
  },
  {
    id: '5',
    title: 'Pearl Elegance',
    description: 'Tahitian pearl earrings in gold setting',
    image: '/images/gallery/earrings-pearl-beauty.jpg',
    category: 'Earrings',
    featured: false,
    tags: ['tahitian-pearls', '14k-gold', 'earrings', 'elegant'],
    likes: 198,
    date: '2024-08-10',
    instagramUrl: 'https://instagram.com/p/homer-earrings-1',
    productId: '5'
  },
  {
    id: '6',
    title: 'Custom Pendant Art',
    description: 'Personalized gold pendant with intricate engraving',
    image: '/images/gallery/pendant-custom-detail.jpg',
    category: 'Pendants',
    featured: false,
    tags: ['custom', 'engraving', '14k-gold', 'personalized'],
    likes: 156,
    date: '2024-08-08',
    instagramUrl: 'https://instagram.com/p/homer-pendant-1',
    productId: '6'
  },
  {
    id: '7',
    title: 'Craftsmanship Behind the Scenes',
    description: 'Master jeweler at work in Homer atelier',
    image: '/images/gallery/workshop-craftsmanship.jpg',
    category: 'Behind the Scenes',
    featured: true,
    tags: ['craftsmanship', 'workshop', 'handmade', 'artisan'],
    likes: 445,
    date: '2024-08-05',
    instagramUrl: 'https://instagram.com/p/homer-workshop-1'
  },
  {
    id: '8',
    title: 'Luxury Collection Display',
    description: 'Curated selection of Homer\'s finest pieces',
    image: '/images/gallery/collection-luxury-display.jpg',
    category: 'Collections',
    featured: true,
    tags: ['collection', 'luxury', 'display', 'finest'],
    likes: 378,
    date: '2024-08-02',
    instagramUrl: 'https://instagram.com/p/homer-collection-1'
  },
  {
    id: '9',
    title: 'Diamond Setting Process',
    description: 'Precision diamond setting in progress',
    image: '/images/gallery/diamond-setting-process.jpg',
    category: 'Behind the Scenes',
    featured: false,
    tags: ['diamonds', 'setting', 'precision', 'process'],
    likes: 234,
    date: '2024-07-30',
    instagramUrl: 'https://instagram.com/p/homer-process-1'
  },
  {
    id: '10',
    title: 'Gold Polishing Mastery',
    description: 'Final polish bringing gold to mirror finish',
    image: '/images/gallery/gold-polishing-master.jpg',
    category: 'Behind the Scenes',
    featured: false,
    tags: ['gold', 'polishing', 'finish', 'mastery'],
    likes: 189,
    date: '2024-07-28',
    instagramUrl: 'https://instagram.com/p/homer-polish-1'
  },
  {
    id: '11',
    title: 'Exclusive VIP Consultation',
    description: 'Private consultation session with client',
    image: '/images/gallery/vip-consultation-room.jpg',
    category: 'Services',
    featured: false,
    tags: ['consultation', 'vip', 'private', 'service'],
    likes: 167,
    date: '2024-07-25',
    instagramUrl: 'https://instagram.com/p/homer-consultation-1'
  },
  {
    id: '12',
    title: 'Athens Showroom',
    description: 'Our beautiful showroom in Athens, Greece',
    image: '/images/gallery/athens-showroom-interior.jpg',
    category: 'Locations',
    featured: true,
    tags: ['athens', 'showroom', 'greece', 'location'],
    likes: 301,
    date: '2024-07-22',
    instagramUrl: 'https://instagram.com/p/homer-athens-1'
  }
];

export const galleryCategories = [
  { name: 'All', count: galleryItems.length },
  { name: 'Grillz', count: galleryItems.filter(item => item.category === 'Grillz').length },
  { name: 'Chains', count: galleryItems.filter(item => item.category === 'Chains').length },
  { name: 'Rings', count: galleryItems.filter(item => item.category === 'Rings').length },
  { name: 'Bracelets', count: galleryItems.filter(item => item.category === 'Bracelets').length },
  { name: 'Earrings', count: galleryItems.filter(item => item.category === 'Earrings').length },
  { name: 'Pendants', count: galleryItems.filter(item => item.category === 'Pendants').length },
  { name: 'Behind the Scenes', count: galleryItems.filter(item => item.category === 'Behind the Scenes').length }
];

export const featuredGalleryItems = galleryItems.filter(item => item.featured);

export default galleryItems;