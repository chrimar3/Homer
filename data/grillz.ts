import { Product } from '@/types';

export const grillzProducts: Product[] = [
  {
    id: 'grillz-1',
    name: 'Diamond Top Grillz',
    shortDescription: 'Premium diamond-encrusted top grillz',
    description: 'Handcrafted 18k gold top grillz featuring premium VS1 diamonds. Each tooth is meticulously set with diamonds for maximum brilliance and luxury.',
    price: 2500,
    originalPrice: 3000,
    images: [
      '/images/products/grillz/diamond-top-1.jpg',
      '/images/products/grillz/diamond-top-2.jpg',
      '/images/products/grillz/diamond-top-3.jpg',
      '/images/products/grillz/diamond-top-4.jpg'
    ],
    category: 'grillz',
    subcategory: 'top',
    material: '18k Gold',
    gemstone: 'VS1 Diamonds',
    weight: '12g',
    inStock: true,
    stockQuantity: 5,
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 47,
    tags: ['custom', 'handcrafted', 'bestseller', 'celebrity-favorite'],
    customizable: true,
    customizationOptions: [
      {
        type: 'material',
        label: 'Material',
        options: [
          { value: '14k-gold', label: '14K Gold', price: -500 },
          { value: '18k-gold', label: '18K Gold', price: 0 },
          { value: '18k-white-gold', label: '18K White Gold', price: 200 }
        ],
        required: true
      },
      {
        type: 'gemstone',
        label: 'Diamonds',
        options: [
          { value: 'vs1', label: 'VS1 Diamonds', price: 0 },
          { value: 'vvs', label: 'VVS Diamonds', price: 800 },
          { value: 'flawless', label: 'Flawless Diamonds', price: 1500 }
        ],
        required: true
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2-3 weeks',
    care: ['Store in protective case', 'Clean with soft brush', 'Avoid harsh chemicals'],
    warranty: '2 years',
    sku: 'GRZ-DT-001',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-01'
  },
  {
    id: 'grillz-2',
    name: 'Gold Bottom Grillz',
    shortDescription: 'Classic solid gold bottom grillz',
    description: 'Sleek and sophisticated 14k gold bottom grillz with high-polish finish. Perfect for those seeking luxury without diamonds.',
    price: 1200,
    images: [
      '/images/products/grillz/gold-bottom-1.jpg',
      '/images/products/grillz/gold-bottom-2.jpg',
      '/images/products/grillz/gold-bottom-3.jpg'
    ],
    category: 'grillz',
    subcategory: 'bottom',
    material: '14k Gold',
    weight: '8g',
    inStock: true,
    stockQuantity: 12,
    featured: true,
    rating: 4.7,
    reviewCount: 32,
    tags: ['custom', 'handcrafted'],
    customizable: true,
    customizationOptions: [
      {
        type: 'material',
        label: 'Material',
        options: [
          { value: '10k-gold', label: '10K Gold', price: -300 },
          { value: '14k-gold', label: '14K Gold', price: 0 },
          { value: '18k-gold', label: '18K Gold', price: 400 }
        ],
        required: true
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '1-2 weeks',
    care: ['Store in protective case', 'Clean with soft cloth', 'Polish regularly'],
    warranty: '1 year',
    sku: 'GRZ-GB-002',
    createdAt: '2024-01-20',
    updatedAt: '2024-02-15'
  },
  {
    id: 'grillz-3',
    name: 'Ruby & Diamond Full Set',
    shortDescription: 'Luxury ruby and diamond full grillz set',
    description: 'Exquisite full set grillz featuring alternating rubies and diamonds set in 18k gold. A true statement piece for the discerning client.',
    price: 4800,
    originalPrice: 5500,
    images: [
      '/images/products/grillz/ruby-diamond-full-1.jpg',
      '/images/products/grillz/ruby-diamond-full-2.jpg',
      '/images/products/grillz/ruby-diamond-full-3.jpg',
      '/images/products/grillz/ruby-diamond-full-4.jpg'
    ],
    category: 'grillz',
    subcategory: 'full-set',
    material: '18k Gold',
    gemstone: 'Rubies & Diamonds',
    weight: '22g',
    inStock: true,
    stockQuantity: 2,
    featured: true,
    new: true,
    rating: 5.0,
    reviewCount: 8,
    tags: ['custom', 'handcrafted', 'limited-edition', 'exclusive'],
    customizable: true,
    customizationOptions: [
      {
        type: 'gemstone',
        label: 'Gemstone Combination',
        options: [
          { value: 'ruby-diamond', label: 'Ruby & Diamond', price: 0 },
          { value: 'sapphire-diamond', label: 'Sapphire & Diamond', price: 200 },
          { value: 'emerald-diamond', label: 'Emerald & Diamond', price: 400 }
        ],
        required: true
      }
    ],
    availability: 'low-stock',
    estimatedDelivery: '3-4 weeks',
    care: ['Professional cleaning recommended', 'Store separately', 'Handle with care'],
    warranty: '3 years',
    sku: 'GRZ-RDF-003',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-10'
  },
  {
    id: 'grillz-4',
    name: 'Iced Out Top & Bottom Set',
    shortDescription: 'Full diamond coverage top and bottom grillz',
    description: 'Complete iced-out experience with our top and bottom grillz set. Every surface covered in brilliant diamonds for maximum shine.',
    price: 5200,
    images: [
      '/images/products/grillz/iced-out-set-1.jpg',
      '/images/products/grillz/iced-out-set-2.jpg',
      '/images/products/grillz/iced-out-set-3.jpg'
    ],
    category: 'grillz',
    subcategory: 'full-set',
    material: '18k Gold',
    gemstone: 'VS Diamonds',
    weight: '20g',
    inStock: true,
    stockQuantity: 3,
    bestseller: true,
    rating: 4.8,
    reviewCount: 23,
    tags: ['custom', 'handcrafted', 'bestseller', 'celebrity-favorite'],
    customizable: false,
    availability: 'in-stock',
    estimatedDelivery: '2-3 weeks',
    care: ['Professional cleaning recommended', 'Store in individual cases'],
    warranty: '2 years',
    sku: 'GRZ-IO-004',
    createdAt: '2024-01-10',
    updatedAt: '2024-02-28'
  },
  {
    id: 'grillz-5',
    name: 'Rose Gold Diamond Fangs',
    shortDescription: 'Custom rose gold vampire fang grillz',
    description: 'Edgy vampire fang design in rose gold with diamond accents. Perfect for making a bold statement.',
    price: 1800,
    images: [
      '/images/products/grillz/rose-gold-fangs-1.jpg',
      '/images/products/grillz/rose-gold-fangs-2.jpg'
    ],
    category: 'grillz',
    subcategory: 'top',
    material: 'Rose Gold',
    gemstone: 'Diamonds',
    weight: '6g',
    inStock: true,
    stockQuantity: 8,
    new: true,
    rating: 4.6,
    reviewCount: 15,
    tags: ['custom', 'handcrafted', 'new-arrival'],
    customizable: true,
    customizationOptions: [
      {
        type: 'material',
        label: 'Material',
        options: [
          { value: 'rose-gold', label: 'Rose Gold', price: 0 },
          { value: 'white-gold', label: 'White Gold', price: 100 },
          { value: 'yellow-gold', label: 'Yellow Gold', price: 0 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '1-2 weeks',
    care: ['Clean gently', 'Store properly'],
    warranty: '1 year',
    sku: 'GRZ-RGF-005',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-05'
  },
  {
    id: 'grillz-6',
    name: 'White Gold Bottom with Sapphires',
    shortDescription: 'Elegant white gold grillz with blue sapphires',
    description: 'Sophisticated white gold bottom grillz featuring carefully selected blue sapphires for a unique and elegant look.',
    price: 2200,
    images: [
      '/images/products/grillz/white-gold-sapphire-1.jpg',
      '/images/products/grillz/white-gold-sapphire-2.jpg',
      '/images/products/grillz/white-gold-sapphire-3.jpg'
    ],
    category: 'grillz',
    subcategory: 'bottom',
    material: 'White Gold',
    gemstone: 'Blue Sapphires',
    weight: '10g',
    inStock: true,
    stockQuantity: 6,
    rating: 4.9,
    reviewCount: 12,
    tags: ['custom', 'handcrafted', 'exclusive'],
    customizable: true,
    customizationOptions: [
      {
        type: 'gemstone',
        label: 'Sapphire Color',
        options: [
          { value: 'blue', label: 'Blue Sapphire', price: 0 },
          { value: 'pink', label: 'Pink Sapphire', price: 200 },
          { value: 'yellow', label: 'Yellow Sapphire', price: 150 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2-3 weeks',
    care: ['Professional cleaning recommended'],
    warranty: '2 years',
    sku: 'GRZ-WGS-006',
    createdAt: '2024-01-25',
    updatedAt: '2024-02-20'
  },
  {
    id: 'grillz-7',
    name: 'Emerald Cut Diamond Singles',
    shortDescription: 'Individual emerald cut diamond teeth',
    description: 'Premium individual grillz featuring emerald cut diamonds. Can be worn on specific teeth for a subtle yet luxurious look.',
    price: 650,
    images: [
      '/images/products/grillz/emerald-singles-1.jpg',
      '/images/products/grillz/emerald-singles-2.jpg'
    ],
    category: 'grillz',
    subcategory: 'top',
    material: '14k Gold',
    gemstone: 'Emerald Cut Diamonds',
    weight: '2g',
    inStock: true,
    stockQuantity: 15,
    rating: 4.5,
    reviewCount: 28,
    tags: ['custom', 'handcrafted'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Tooth Position',
        options: [
          { value: 'front', label: 'Front Tooth', price: 0 },
          { value: 'canine', label: 'Canine', price: 50 },
          { value: 'premolar', label: 'Premolar', price: 25 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '1 week',
    care: ['Clean regularly', 'Store safely'],
    warranty: '1 year',
    sku: 'GRZ-ECS-007',
    createdAt: '2024-02-05',
    updatedAt: '2024-02-25'
  },
  {
    id: 'grillz-8',
    name: 'Platinum Diamond Bridge',
    shortDescription: 'Luxury platinum bridge grillz',
    description: 'Ultra-premium platinum grillz with a bridge design connecting front teeth. Features the finest diamonds in an architectural setting.',
    price: 6500,
    images: [
      '/images/products/grillz/platinum-bridge-1.jpg',
      '/images/products/grillz/platinum-bridge-2.jpg',
      '/images/products/grillz/platinum-bridge-3.jpg',
      '/images/products/grillz/platinum-bridge-4.jpg'
    ],
    category: 'grillz',
    subcategory: 'top',
    material: 'Platinum',
    gemstone: 'VVS Diamonds',
    weight: '15g',
    inStock: true,
    stockQuantity: 1,
    featured: true,
    rating: 5.0,
    reviewCount: 4,
    tags: ['custom', 'handcrafted', 'limited-edition', 'exclusive'],
    customizable: false,
    availability: 'low-stock',
    estimatedDelivery: '4-6 weeks',
    care: ['Professional cleaning only', 'Special storage required'],
    warranty: '5 years',
    sku: 'GRZ-PDB-008',
    createdAt: '2024-01-30',
    updatedAt: '2024-03-08'
  },
  {
    id: 'grillz-9',
    name: 'Gold Honeycomb Design',
    shortDescription: 'Geometric honeycomb pattern grillz',
    description: 'Modern geometric design featuring a honeycomb pattern cut into solid gold. A contemporary take on classic grillz.',
    price: 1600,
    images: [
      '/images/products/grillz/honeycomb-1.jpg',
      '/images/products/grillz/honeycomb-2.jpg',
      '/images/products/grillz/honeycomb-3.jpg'
    ],
    category: 'grillz',
    subcategory: 'top',
    material: '14k Gold',
    weight: '9g',
    inStock: true,
    stockQuantity: 7,
    new: true,
    rating: 4.4,
    reviewCount: 18,
    tags: ['custom', 'handcrafted', 'new-arrival'],
    customizable: true,
    customizationOptions: [
      {
        type: 'material',
        label: 'Gold Type',
        options: [
          { value: '14k-yellow', label: '14K Yellow Gold', price: 0 },
          { value: '14k-white', label: '14K White Gold', price: 100 },
          { value: '14k-rose', label: '14K Rose Gold', price: 50 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2 weeks',
    care: ['Regular cleaning', 'Careful handling'],
    warranty: '1 year',
    sku: 'GRZ-HC-009',
    createdAt: '2024-02-10',
    updatedAt: '2024-03-01'
  },
  {
    id: 'grillz-10',
    name: 'Diamond Dust Full Mouth',
    shortDescription: 'Full mouth coverage with diamond dust finish',
    description: 'Complete upper and lower grillz with innovative diamond dust coating that provides all-over sparkle and brilliance.',
    price: 3800,
    originalPrice: 4200,
    images: [
      '/images/products/grillz/diamond-dust-full-1.jpg',
      '/images/products/grillz/diamond-dust-full-2.jpg',
      '/images/products/grillz/diamond-dust-full-3.jpg'
    ],
    category: 'grillz',
    subcategory: 'full-set',
    material: '18k Gold',
    gemstone: 'Diamond Dust',
    weight: '18g',
    inStock: true,
    stockQuantity: 4,
    bestseller: true,
    rating: 4.7,
    reviewCount: 34,
    tags: ['custom', 'handcrafted', 'bestseller'],
    customizable: false,
    availability: 'in-stock',
    estimatedDelivery: '2-3 weeks',
    care: ['Specialized cleaning required', 'Professional maintenance'],
    warranty: '2 years',
    sku: 'GRZ-DDF-010',
    createdAt: '2024-01-18',
    updatedAt: '2024-02-22'
  },
  {
    id: 'grillz-11',
    name: 'Open Face Diamond Top',
    shortDescription: 'Open face design with diamond accents',
    description: 'Unique open face design that frames your natural smile while adding diamond accents for subtle luxury.',
    price: 1400,
    images: [
      '/images/products/grillz/open-face-1.jpg',
      '/images/products/grillz/open-face-2.jpg'
    ],
    category: 'grillz',
    subcategory: 'top',
    material: '14k Gold',
    gemstone: 'Diamonds',
    weight: '5g',
    inStock: true,
    stockQuantity: 10,
    rating: 4.3,
    reviewCount: 22,
    tags: ['custom', 'handcrafted'],
    customizable: true,
    customizationOptions: [
      {
        type: 'engraving',
        label: 'Custom Engraving',
        options: [
          { value: 'none', label: 'No Engraving', price: 0 },
          { value: 'initials', label: 'Initials', price: 150 },
          { value: 'name', label: 'Full Name', price: 250 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '1-2 weeks',
    care: ['Gentle cleaning', 'Regular maintenance'],
    warranty: '1 year',
    sku: 'GRZ-OF-011',
    createdAt: '2024-02-08',
    updatedAt: '2024-02-28'
  },
  {
    id: 'grillz-12',
    name: 'Vintage Style Gold Bottom',
    shortDescription: 'Classic vintage-inspired bottom grillz',
    description: 'Timeless vintage design with intricate engravings and classic gold finish. Perfect for those who appreciate traditional craftsmanship.',
    price: 1100,
    images: [
      '/images/products/grillz/vintage-bottom-1.jpg',
      '/images/products/grillz/vintage-bottom-2.jpg',
      '/images/products/grillz/vintage-bottom-3.jpg'
    ],
    category: 'grillz',
    subcategory: 'bottom',
    material: '14k Gold',
    weight: '7g',
    inStock: true,
    stockQuantity: 9,
    rating: 4.6,
    reviewCount: 16,
    tags: ['custom', 'handcrafted'],
    customizable: true,
    customizationOptions: [
      {
        type: 'engraving',
        label: 'Engraving Style',
        options: [
          { value: 'classic', label: 'Classic Pattern', price: 0 },
          { value: 'custom', label: 'Custom Design', price: 200 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2 weeks',
    care: ['Polish regularly', 'Store properly'],
    warranty: '1 year',
    sku: 'GRZ-VB-012',
    createdAt: '2024-01-22',
    updatedAt: '2024-02-18'
  },
  {
    id: 'grillz-13',
    name: 'Rainbow Gemstone Full Set',
    shortDescription: 'Multicolored gemstone full grillz set',
    description: 'Vibrant full set featuring a rainbow of precious gemstones including rubies, sapphires, emeralds, and diamonds.',
    price: 7200,
    images: [
      '/images/products/grillz/rainbow-full-1.jpg',
      '/images/products/grillz/rainbow-full-2.jpg',
      '/images/products/grillz/rainbow-full-3.jpg',
      '/images/products/grillz/rainbow-full-4.jpg'
    ],
    category: 'grillz',
    subcategory: 'full-set',
    material: '18k Gold',
    gemstone: 'Mixed Precious Stones',
    weight: '24g',
    inStock: true,
    stockQuantity: 1,
    featured: true,
    rating: 4.9,
    reviewCount: 6,
    tags: ['custom', 'handcrafted', 'limited-edition', 'exclusive'],
    customizable: false,
    availability: 'low-stock',
    estimatedDelivery: '4-5 weeks',
    care: ['Professional cleaning only', 'Specialized care required'],
    warranty: '3 years',
    sku: 'GRZ-RF-013',
    createdAt: '2024-02-12',
    updatedAt: '2024-03-12'
  },
  {
    id: 'grillz-14',
    name: 'Minimalist Single Diamond',
    shortDescription: 'Subtle single diamond grillz',
    description: 'Elegant minimalist design featuring a single brilliant cut diamond on one tooth. Perfect for those preferring understated luxury.',
    price: 450,
    images: [
      '/images/products/grillz/minimalist-single-1.jpg',
      '/images/products/grillz/minimalist-single-2.jpg'
    ],
    category: 'grillz',
    subcategory: 'top',
    material: '14k Gold',
    gemstone: 'Single Diamond',
    weight: '1.5g',
    inStock: true,
    stockQuantity: 20,
    rating: 4.4,
    reviewCount: 35,
    tags: ['custom', 'handcrafted'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Diamond Size',
        options: [
          { value: '0.25ct', label: '0.25 Carat', price: 0 },
          { value: '0.5ct', label: '0.5 Carat', price: 300 },
          { value: '1ct', label: '1 Carat', price: 800 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '1 week',
    care: ['Simple cleaning', 'Safe storage'],
    warranty: '1 year',
    sku: 'GRZ-MS-014',
    createdAt: '2024-02-18',
    updatedAt: '2024-03-02'
  },
  {
    id: 'grillz-15',
    name: 'Custom Logo Grillz',
    shortDescription: 'Personalized logo or symbol grillz',
    description: 'Express your identity with custom logo or symbol grillz. We can recreate any design in premium gold with optional diamond accents.',
    price: 1800,
    images: [
      '/images/products/grillz/custom-logo-1.jpg',
      '/images/products/grillz/custom-logo-2.jpg',
      '/images/products/grillz/custom-logo-3.jpg'
    ],
    category: 'grillz',
    subcategory: 'top',
    material: '14k Gold',
    weight: '8g',
    inStock: true,
    stockQuantity: 100,
    rating: 4.8,
    reviewCount: 52,
    tags: ['custom', 'handcrafted', 'bestseller'],
    customizable: true,
    customizationOptions: [
      {
        type: 'engraving',
        label: 'Design Type',
        options: [
          { value: 'logo', label: 'Business Logo', price: 0 },
          { value: 'initials', label: 'Initials', price: -200 },
          { value: 'symbol', label: 'Custom Symbol', price: 100 }
        ],
        required: true
      },
      {
        type: 'gemstone',
        label: 'Add Diamonds',
        options: [
          { value: 'none', label: 'No Diamonds', price: 0 },
          { value: 'accent', label: 'Diamond Accents', price: 500 },
          { value: 'full', label: 'Full Diamond Setting', price: 1200 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '3-4 weeks',
    care: ['Custom care instructions provided'],
    warranty: '2 years',
    sku: 'GRZ-CL-015',
    createdAt: '2024-01-28',
    updatedAt: '2024-03-05'
  }
];

export const grillzCategories = {
  'top': grillzProducts.filter(p => p.subcategory === 'top'),
  'bottom': grillzProducts.filter(p => p.subcategory === 'bottom'),
  'full-set': grillzProducts.filter(p => p.subcategory === 'full-set')
};

export const featuredGrillz = grillzProducts.filter(p => p.featured);
export const newGrillz = grillzProducts.filter(p => p.new);
export const bestsellerGrillz = grillzProducts.filter(p => p.bestseller);

export default grillzProducts;