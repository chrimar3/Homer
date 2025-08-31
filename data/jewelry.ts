import { Product } from '@/types';

export const jewelryProducts: Product[] = [
  {
    id: 'jewelry-1',
    name: 'Diamond Tennis Necklace',
    shortDescription: 'Classic diamond tennis necklace',
    description: 'Exquisite 18k white gold tennis necklace featuring 50 brilliant cut diamonds totaling 5 carats. A timeless piece that embodies elegance and luxury.',
    price: 8500,
    originalPrice: 9500,
    images: [
      '/images/products/jewelry/tennis-necklace-1.jpg',
      '/images/products/jewelry/tennis-necklace-2.jpg',
      '/images/products/jewelry/tennis-necklace-3.jpg',
      '/images/products/jewelry/tennis-necklace-4.jpg'
    ],
    category: 'chains',
    subcategory: 'statement',
    material: '18k White Gold',
    gemstone: 'Diamonds',
    dimensions: '16-18 inches adjustable',
    weight: '15g',
    inStock: true,
    stockQuantity: 3,
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 67,
    tags: ['handcrafted', 'bestseller', 'celebrity-favorite'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Length',
        options: [
          { value: '16-inch', label: '16 inches', price: -200 },
          { value: '18-inch', label: '18 inches', price: 0 },
          { value: '20-inch', label: '20 inches', price: 300 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2-3 weeks',
    care: ['Professional cleaning recommended', 'Store in individual compartment'],
    warranty: '3 years',
    sku: 'JWL-TN-001',
    createdAt: '2024-01-05',
    updatedAt: '2024-03-01'
  },
  {
    id: 'jewelry-2',
    name: 'Emerald Statement Ring',
    shortDescription: '5-carat emerald ring with diamond halo',
    description: 'Spectacular 5-carat Colombian emerald surrounded by brilliant diamonds in 18k yellow gold. A museum-quality piece for the discerning collector.',
    price: 15000,
    images: [
      '/images/products/jewelry/emerald-ring-1.jpg',
      '/images/products/jewelry/emerald-ring-2.jpg',
      '/images/products/jewelry/emerald-ring-3.jpg',
      '/images/products/jewelry/emerald-ring-4.jpg'
    ],
    category: 'rings',
    subcategory: 'statement',
    material: '18k Yellow Gold',
    gemstone: 'Colombian Emerald & Diamonds',
    dimensions: 'Size 6 (resizable)',
    weight: '8g',
    inStock: true,
    stockQuantity: 1,
    featured: true,
    rating: 5.0,
    reviewCount: 12,
    tags: ['handcrafted', 'limited-edition', 'exclusive'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Ring Size',
        options: [
          { value: '5', label: 'Size 5', price: 0 },
          { value: '6', label: 'Size 6', price: 0 },
          { value: '7', label: 'Size 7', price: 0 },
          { value: '8', label: 'Size 8', price: 0 }
        ],
        required: true
      }
    ],
    availability: 'low-stock',
    estimatedDelivery: '3-4 weeks',
    care: ['Avoid harsh chemicals', 'Professional cleaning only'],
    warranty: '5 years',
    sku: 'JWL-ER-002',
    createdAt: '2024-01-12',
    updatedAt: '2024-03-08'
  },
  {
    id: 'jewelry-3',
    name: 'Pearl Drop Earrings',
    shortDescription: 'Tahitian pearl drop earrings',
    description: 'Elegant Tahitian pearl drop earrings with diamond-set hooks in 18k white gold. Perfect for formal occasions and evening wear.',
    price: 3200,
    images: [
      '/images/products/jewelry/pearl-drops-1.jpg',
      '/images/products/jewelry/pearl-drops-2.jpg',
      '/images/products/jewelry/pearl-drops-3.jpg'
    ],
    category: 'earrings',
    subcategory: 'occasion',
    material: '18k White Gold',
    gemstone: 'Tahitian Pearls & Diamonds',
    dimensions: '2 inches drop',
    weight: '6g',
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 34,
    tags: ['handcrafted', 'bridal'],
    customizable: false,
    availability: 'in-stock',
    estimatedDelivery: '1-2 weeks',
    care: ['Clean with soft cloth', 'Store separately'],
    warranty: '2 years',
    sku: 'JWL-PD-003',
    createdAt: '2024-01-18',
    updatedAt: '2024-02-25'
  },
  {
    id: 'jewelry-4',
    name: 'Cuban Link Chain',
    shortDescription: 'Solid gold Cuban link chain',
    description: 'Heavy-duty 14k gold Cuban link chain. A classic piece that never goes out of style, perfect for everyday wear or special occasions.',
    price: 2400,
    originalPrice: 2800,
    images: [
      '/images/products/jewelry/cuban-chain-1.jpg',
      '/images/products/jewelry/cuban-chain-2.jpg',
      '/images/products/jewelry/cuban-chain-3.jpg'
    ],
    category: 'chains',
    subcategory: 'everyday',
    material: '14k Gold',
    dimensions: '20 inches',
    weight: '45g',
    inStock: true,
    stockQuantity: 12,
    bestseller: true,
    rating: 4.7,
    reviewCount: 89,
    tags: ['handcrafted', 'bestseller'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Length',
        options: [
          { value: '18-inch', label: '18 inches', price: -200 },
          { value: '20-inch', label: '20 inches', price: 0 },
          { value: '22-inch', label: '22 inches', price: 300 },
          { value: '24-inch', label: '24 inches', price: 600 }
        ]
      },
      {
        type: 'material',
        label: 'Gold Type',
        options: [
          { value: '14k-yellow', label: '14K Yellow Gold', price: 0 },
          { value: '14k-white', label: '14K White Gold', price: 200 },
          { value: '18k-yellow', label: '18K Yellow Gold', price: 800 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '1-2 weeks',
    care: ['Polish regularly', 'Store in jewelry box'],
    warranty: '2 years',
    sku: 'JWL-CC-004',
    createdAt: '2024-01-08',
    updatedAt: '2024-02-20'
  },
  {
    id: 'jewelry-5',
    name: 'Sapphire Tennis Bracelet',
    shortDescription: 'Blue sapphire and diamond tennis bracelet',
    description: 'Stunning tennis bracelet alternating blue sapphires and diamonds in 18k white gold. Features 15 sapphires and 30 diamonds.',
    price: 6200,
    images: [
      '/images/products/jewelry/sapphire-tennis-1.jpg',
      '/images/products/jewelry/sapphire-tennis-2.jpg',
      '/images/products/jewelry/sapphire-tennis-3.jpg',
      '/images/products/jewelry/sapphire-tennis-4.jpg'
    ],
    category: 'bracelets',
    subcategory: 'statement',
    material: '18k White Gold',
    gemstone: 'Blue Sapphires & Diamonds',
    dimensions: '7 inches (adjustable)',
    weight: '12g',
    inStock: true,
    stockQuantity: 4,
    featured: true,
    rating: 4.9,
    reviewCount: 23,
    tags: ['handcrafted', 'celebrity-favorite'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Bracelet Length',
        options: [
          { value: '6.5-inch', label: '6.5 inches', price: -100 },
          { value: '7-inch', label: '7 inches', price: 0 },
          { value: '7.5-inch', label: '7.5 inches', price: 100 },
          { value: '8-inch', label: '8 inches', price: 200 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2-3 weeks',
    care: ['Professional cleaning recommended'],
    warranty: '3 years',
    sku: 'JWL-ST-005',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-05'
  },
  {
    id: 'jewelry-6',
    name: 'Custom Signet Ring',
    shortDescription: 'Personalized gold signet ring',
    description: 'Classic signet ring in 18k gold with custom engraving. Perfect for family crests, initials, or personal symbols.',
    price: 1200,
    images: [
      '/images/products/jewelry/signet-ring-1.jpg',
      '/images/products/jewelry/signet-ring-2.jpg',
      '/images/products/jewelry/signet-ring-3.jpg'
    ],
    category: 'rings',
    subcategory: 'everyday',
    material: '18k Gold',
    dimensions: 'Size 10',
    weight: '12g',
    inStock: true,
    stockQuantity: 25,
    rating: 4.6,
    reviewCount: 45,
    tags: ['custom', 'handcrafted'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Ring Size',
        options: [
          { value: '8', label: 'Size 8', price: 0 },
          { value: '9', label: 'Size 9', price: 0 },
          { value: '10', label: 'Size 10', price: 0 },
          { value: '11', label: 'Size 11', price: 0 },
          { value: '12', label: 'Size 12', price: 0 }
        ],
        required: true
      },
      {
        type: 'engraving',
        label: 'Engraving',
        options: [
          { value: 'initials', label: 'Initials (3 letters)', price: 150 },
          { value: 'monogram', label: 'Monogram Design', price: 300 },
          { value: 'crest', label: 'Family Crest', price: 500 }
        ],
        required: true
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '3 weeks',
    care: ['Polish regularly', 'Avoid harsh chemicals'],
    warranty: '2 years',
    sku: 'JWL-SR-006',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-28'
  },
  {
    id: 'jewelry-7',
    name: 'Diamond Stud Earrings',
    shortDescription: 'Classic diamond stud earrings',
    description: 'Timeless diamond stud earrings featuring 2-carat total weight brilliant cut diamonds in 18k white gold settings.',
    price: 4500,
    originalPrice: 5000,
    images: [
      '/images/products/jewelry/diamond-studs-1.jpg',
      '/images/products/jewelry/diamond-studs-2.jpg',
      '/images/products/jewelry/diamond-studs-3.jpg'
    ],
    category: 'earrings',
    subcategory: 'everyday',
    material: '18k White Gold',
    gemstone: 'Diamonds (2ct total)',
    weight: '3g',
    inStock: true,
    stockQuantity: 15,
    bestseller: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ['handcrafted', 'bestseller', 'bridal'],
    customizable: true,
    customizationOptions: [
      {
        type: 'gemstone',
        label: 'Diamond Size',
        options: [
          { value: '1ct', label: '1 Carat Total', price: -1500 },
          { value: '2ct', label: '2 Carat Total', price: 0 },
          { value: '3ct', label: '3 Carat Total', price: 2500 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '1 week',
    care: ['Clean regularly', 'Professional checkup annually'],
    warranty: '3 years',
    sku: 'JWL-DS-007',
    createdAt: '2024-01-10',
    updatedAt: '2024-02-15'
  },
  {
    id: 'jewelry-8',
    name: 'Ruby Heart Pendant',
    shortDescription: 'Heart-shaped ruby pendant necklace',
    description: 'Romantic heart-shaped ruby pendant surrounded by diamonds on an 18k gold chain. Perfect for expressing love and affection.',
    price: 2800,
    images: [
      '/images/products/jewelry/ruby-heart-1.jpg',
      '/images/products/jewelry/ruby-heart-2.jpg',
      '/images/products/jewelry/ruby-heart-3.jpg'
    ],
    category: 'pendants',
    subcategory: 'occasion',
    material: '18k Yellow Gold',
    gemstone: 'Ruby & Diamonds',
    dimensions: '18 inch chain',
    weight: '5g',
    inStock: true,
    stockQuantity: 6,
    rating: 4.7,
    reviewCount: 28,
    tags: ['handcrafted', 'bridal'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Chain Length',
        options: [
          { value: '16-inch', label: '16 inches', price: -100 },
          { value: '18-inch', label: '18 inches', price: 0 },
          { value: '20-inch', label: '20 inches', price: 100 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2 weeks',
    care: ['Avoid harsh chemicals', 'Store carefully'],
    warranty: '2 years',
    sku: 'JWL-RH-008',
    createdAt: '2024-01-22',
    updatedAt: '2024-02-18'
  },
  {
    id: 'jewelry-9',
    name: 'Vintage Art Deco Ring',
    shortDescription: 'Vintage-inspired Art Deco diamond ring',
    description: 'Stunning vintage-inspired Art Deco ring featuring geometric patterns with diamonds and sapphire accents in platinum.',
    price: 5800,
    images: [
      '/images/products/jewelry/art-deco-ring-1.jpg',
      '/images/products/jewelry/art-deco-ring-2.jpg',
      '/images/products/jewelry/art-deco-ring-3.jpg',
      '/images/products/jewelry/art-deco-ring-4.jpg'
    ],
    category: 'rings',
    subcategory: 'statement',
    material: 'Platinum',
    gemstone: 'Diamonds & Sapphires',
    dimensions: 'Size 6',
    weight: '6g',
    inStock: true,
    stockQuantity: 2,
    featured: true,
    new: true,
    rating: 4.9,
    reviewCount: 14,
    tags: ['handcrafted', 'limited-edition', 'new-arrival'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Ring Size',
        options: [
          { value: '5', label: 'Size 5', price: 0 },
          { value: '6', label: 'Size 6', price: 0 },
          { value: '7', label: 'Size 7', price: 0 }
        ]
      }
    ],
    availability: 'low-stock',
    estimatedDelivery: '3-4 weeks',
    care: ['Professional cleaning only', 'Handle with care'],
    warranty: '5 years',
    sku: 'JWL-AD-009',
    createdAt: '2024-02-10',
    updatedAt: '2024-03-10'
  },
  {
    id: 'jewelry-10',
    name: 'Gold Hoop Earrings',
    shortDescription: 'Classic gold hoop earrings',
    description: 'Timeless 14k gold hoop earrings in medium size. A versatile piece that complements any outfit, from casual to formal.',
    price: 650,
    images: [
      '/images/products/jewelry/gold-hoops-1.jpg',
      '/images/products/jewelry/gold-hoops-2.jpg'
    ],
    category: 'earrings',
    subcategory: 'everyday',
    material: '14k Gold',
    dimensions: '1.5 inch diameter',
    weight: '4g',
    inStock: true,
    stockQuantity: 25,
    rating: 4.5,
    reviewCount: 78,
    tags: ['handcrafted'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Hoop Size',
        options: [
          { value: 'small', label: 'Small (1 inch)', price: -150 },
          { value: 'medium', label: 'Medium (1.5 inch)', price: 0 },
          { value: 'large', label: 'Large (2 inch)', price: 200 }
        ]
      },
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
    estimatedDelivery: '1 week',
    care: ['Simple cleaning', 'Regular polishing'],
    warranty: '1 year',
    sku: 'JWL-GH-010',
    createdAt: '2024-01-25',
    updatedAt: '2024-02-12'
  },
  {
    id: 'jewelry-11',
    name: 'Aquamarine Cocktail Ring',
    shortDescription: 'Large aquamarine statement ring',
    description: 'Show-stopping cocktail ring featuring a 12-carat aquamarine surrounded by diamonds in 18k white gold. Perfect for special occasions.',
    price: 7500,
    images: [
      '/images/products/jewelry/aquamarine-ring-1.jpg',
      '/images/products/jewelry/aquamarine-ring-2.jpg',
      '/images/products/jewelry/aquamarine-ring-3.jpg'
    ],
    category: 'rings',
    subcategory: 'statement',
    material: '18k White Gold',
    gemstone: 'Aquamarine & Diamonds',
    dimensions: 'Size 7',
    weight: '10g',
    inStock: true,
    stockQuantity: 1,
    featured: true,
    rating: 5.0,
    reviewCount: 8,
    tags: ['handcrafted', 'limited-edition', 'exclusive'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Ring Size',
        options: [
          { value: '6', label: 'Size 6', price: 0 },
          { value: '7', label: 'Size 7', price: 0 },
          { value: '8', label: 'Size 8', price: 0 }
        ]
      }
    ],
    availability: 'low-stock',
    estimatedDelivery: '4-5 weeks',
    care: ['Professional cleaning only', 'Careful handling required'],
    warranty: '3 years',
    sku: 'JWL-AR-011',
    createdAt: '2024-02-05',
    updatedAt: '2024-03-08'
  },
  {
    id: 'jewelry-12',
    name: 'Rose Gold Charm Bracelet',
    shortDescription: 'Customizable rose gold charm bracelet',
    description: 'Beautiful rose gold charm bracelet that can be personalized with meaningful charms. Includes 3 starter charms of your choice.',
    price: 1400,
    images: [
      '/images/products/jewelry/charm-bracelet-1.jpg',
      '/images/products/jewelry/charm-bracelet-2.jpg',
      '/images/products/jewelry/charm-bracelet-3.jpg'
    ],
    category: 'bracelets',
    subcategory: 'everyday',
    material: 'Rose Gold',
    dimensions: '7.5 inches',
    weight: '8g',
    inStock: true,
    stockQuantity: 18,
    rating: 4.6,
    reviewCount: 52,
    tags: ['custom', 'handcrafted'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Bracelet Size',
        options: [
          { value: '6.5-inch', label: '6.5 inches', price: 0 },
          { value: '7-inch', label: '7 inches', price: 0 },
          { value: '7.5-inch', label: '7.5 inches', price: 0 },
          { value: '8-inch', label: '8 inches', price: 50 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2 weeks',
    care: ['Clean charms individually', 'Store flat'],
    warranty: '2 years',
    sku: 'JWL-CB-012',
    createdAt: '2024-01-28',
    updatedAt: '2024-02-20'
  },
  {
    id: 'jewelry-13',
    name: 'Black Diamond Pendant',
    shortDescription: 'Modern black diamond pendant',
    description: 'Contemporary black diamond pendant in geometric design with white gold accents. A modern take on classic elegance.',
    price: 2200,
    images: [
      '/images/products/jewelry/black-diamond-pendant-1.jpg',
      '/images/products/jewelry/black-diamond-pendant-2.jpg'
    ],
    category: 'pendants',
    subcategory: 'statement',
    material: '18k White Gold',
    gemstone: 'Black Diamonds',
    dimensions: '20 inch chain included',
    weight: '6g',
    inStock: true,
    stockQuantity: 8,
    new: true,
    rating: 4.4,
    reviewCount: 19,
    tags: ['handcrafted', 'new-arrival'],
    customizable: false,
    availability: 'in-stock',
    estimatedDelivery: '1-2 weeks',
    care: ['Professional cleaning recommended'],
    warranty: '2 years',
    sku: 'JWL-BD-013',
    createdAt: '2024-02-12',
    updatedAt: '2024-03-01'
  },
  {
    id: 'jewelry-14',
    name: 'Tanzanite Drop Earrings',
    shortDescription: 'Rare tanzanite drop earrings',
    description: 'Exceptional tanzanite drop earrings featuring rare tanzanite gemstones with diamond accents in 18k white gold.',
    price: 4200,
    images: [
      '/images/products/jewelry/tanzanite-drops-1.jpg',
      '/images/products/jewelry/tanzanite-drops-2.jpg',
      '/images/products/jewelry/tanzanite-drops-3.jpg'
    ],
    category: 'earrings',
    subcategory: 'statement',
    material: '18k White Gold',
    gemstone: 'Tanzanite & Diamonds',
    dimensions: '1.5 inch drop',
    weight: '7g',
    inStock: true,
    stockQuantity: 3,
    rating: 4.8,
    reviewCount: 11,
    tags: ['handcrafted', 'limited-edition'],
    customizable: false,
    availability: 'low-stock',
    estimatedDelivery: '3-4 weeks',
    care: ['Handle with extreme care', 'Professional cleaning only'],
    warranty: '3 years',
    sku: 'JWL-TD-014',
    createdAt: '2024-01-30',
    updatedAt: '2024-03-05'
  },
  {
    id: 'jewelry-15',
    name: 'Infinity Symbol Necklace',
    shortDescription: 'Diamond infinity symbol necklace',
    description: 'Elegant infinity symbol pendant set with diamonds on a delicate gold chain. Symbolizes eternal love and connection.',
    price: 1600,
    images: [
      '/images/products/jewelry/infinity-necklace-1.jpg',
      '/images/products/jewelry/infinity-necklace-2.jpg'
    ],
    category: 'pendants',
    subcategory: 'everyday',
    material: '14k Gold',
    gemstone: 'Diamonds',
    dimensions: '18 inch chain',
    weight: '3g',
    inStock: true,
    stockQuantity: 22,
    rating: 4.7,
    reviewCount: 94,
    tags: ['handcrafted', 'bridal'],
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
    estimatedDelivery: '1 week',
    care: ['Clean regularly', 'Store carefully'],
    warranty: '2 years',
    sku: 'JWL-IN-015',
    createdAt: '2024-02-08',
    updatedAt: '2024-02-25'
  },
  {
    id: 'jewelry-16',
    name: 'Vintage Cameo Brooch',
    shortDescription: 'Antique-style cameo brooch',
    description: 'Beautiful vintage-inspired cameo brooch with hand-carved shell cameo in 14k gold setting. A timeless accessory piece.',
    price: 890,
    images: [
      '/images/products/jewelry/cameo-brooch-1.jpg',
      '/images/products/jewelry/cameo-brooch-2.jpg',
      '/images/products/jewelry/cameo-brooch-3.jpg'
    ],
    category: 'pendants',
    subcategory: 'statement',
    material: '14k Gold',
    gemstone: 'Shell Cameo',
    dimensions: '2 x 1.5 inches',
    weight: '10g',
    inStock: true,
    stockQuantity: 5,
    rating: 4.5,
    reviewCount: 16,
    tags: ['handcrafted', 'eco-friendly'],
    customizable: false,
    availability: 'in-stock',
    estimatedDelivery: '1-2 weeks',
    care: ['Handle delicately', 'Avoid moisture'],
    warranty: '1 year',
    sku: 'JWL-CB-016',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-10'
  },
  {
    id: 'jewelry-17',
    name: 'Men\'s Diamond Pinky Ring',
    shortDescription: 'Men\'s diamond pinky ring',
    description: 'Bold men\'s pinky ring featuring a cluster of diamonds in 18k gold. Perfect for the modern gentleman who appreciates luxury.',
    price: 3800,
    images: [
      '/images/products/jewelry/mens-pinky-1.jpg',
      '/images/products/jewelry/mens-pinky-2.jpg',
      '/images/products/jewelry/mens-pinky-3.jpg'
    ],
    category: 'rings',
    subcategory: 'statement',
    material: '18k Gold',
    gemstone: 'Diamonds',
    dimensions: 'Size 8',
    weight: '15g',
    inStock: true,
    stockQuantity: 4,
    rating: 4.7,
    reviewCount: 21,
    tags: ['handcrafted', 'celebrity-favorite'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Ring Size',
        options: [
          { value: '7', label: 'Size 7', price: 0 },
          { value: '8', label: 'Size 8', price: 0 },
          { value: '9', label: 'Size 9', price: 0 },
          { value: '10', label: 'Size 10', price: 0 }
        ]
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2-3 weeks',
    care: ['Professional cleaning recommended'],
    warranty: '2 years',
    sku: 'JWL-MP-017',
    createdAt: '2024-02-18',
    updatedAt: '2024-03-12'
  },
  {
    id: 'jewelry-18',
    name: 'Opal Fire Pendant',
    shortDescription: 'Australian fire opal pendant',
    description: 'Stunning Australian fire opal pendant showcasing natural play of color in 18k gold setting. Each opal is unique.',
    price: 2600,
    images: [
      '/images/products/jewelry/opal-pendant-1.jpg',
      '/images/products/jewelry/opal-pendant-2.jpg',
      '/images/products/jewelry/opal-pendant-3.jpg'
    ],
    category: 'pendants',
    subcategory: 'statement',
    material: '18k Gold',
    gemstone: 'Fire Opal',
    dimensions: '20 inch chain',
    weight: '5g',
    inStock: true,
    stockQuantity: 3,
    new: true,
    rating: 4.6,
    reviewCount: 9,
    tags: ['handcrafted', 'new-arrival', 'eco-friendly'],
    customizable: false,
    availability: 'low-stock',
    estimatedDelivery: '2-3 weeks',
    care: ['Avoid harsh chemicals', 'Store away from heat'],
    warranty: '2 years',
    sku: 'JWL-OF-018',
    createdAt: '2024-02-20',
    updatedAt: '2024-03-10'
  },
  {
    id: 'jewelry-19',
    name: 'Diamond Wedding Band Set',
    shortDescription: 'Matching diamond wedding band set',
    description: 'Beautiful matching wedding band set for couples. Features channel-set diamonds in 18k white gold for both bands.',
    price: 3400,
    images: [
      '/images/products/jewelry/wedding-set-1.jpg',
      '/images/products/jewelry/wedding-set-2.jpg',
      '/images/products/jewelry/wedding-set-3.jpg'
    ],
    category: 'rings',
    subcategory: 'bridal',
    material: '18k White Gold',
    gemstone: 'Diamonds',
    dimensions: 'His & Hers sizes',
    weight: '8g total',
    inStock: true,
    stockQuantity: 12,
    bestseller: true,
    rating: 4.9,
    reviewCount: 76,
    tags: ['handcrafted', 'bestseller', 'bridal'],
    customizable: true,
    customizationOptions: [
      {
        type: 'size',
        label: 'Her Ring Size',
        options: [
          { value: '5', label: 'Size 5', price: 0 },
          { value: '6', label: 'Size 6', price: 0 },
          { value: '7', label: 'Size 7', price: 0 }
        ],
        required: true
      },
      {
        type: 'size',
        label: 'His Ring Size',
        options: [
          { value: '9', label: 'Size 9', price: 0 },
          { value: '10', label: 'Size 10', price: 0 },
          { value: '11', label: 'Size 11', price: 0 }
        ],
        required: true
      }
    ],
    availability: 'in-stock',
    estimatedDelivery: '2-3 weeks',
    care: ['Professional cleaning recommended', 'Annual checkup advised'],
    warranty: '5 years',
    sku: 'JWL-WS-019',
    createdAt: '2024-01-05',
    updatedAt: '2024-02-28'
  },
  {
    id: 'jewelry-20',
    name: 'Luxury Watch Collection',
    shortDescription: 'Premium diamond-set luxury watch',
    description: 'Exquisite luxury timepiece featuring diamonds around the bezel and mother-of-pearl dial in 18k gold case.',
    price: 12500,
    images: [
      '/images/products/jewelry/luxury-watch-1.jpg',
      '/images/products/jewelry/luxury-watch-2.jpg',
      '/images/products/jewelry/luxury-watch-3.jpg',
      '/images/products/jewelry/luxury-watch-4.jpg'
    ],
    category: 'watches',
    subcategory: 'statement',
    material: '18k Gold',
    gemstone: 'Diamonds',
    dimensions: '40mm case',
    weight: '120g',
    inStock: true,
    stockQuantity: 2,
    featured: true,
    rating: 4.8,
    reviewCount: 15,
    tags: ['handcrafted', 'limited-edition', 'exclusive'],
    customizable: true,
    customizationOptions: [
      {
        type: 'material',
        label: 'Case Material',
        options: [
          { value: '18k-yellow', label: '18K Yellow Gold', price: 0 },
          { value: '18k-rose', label: '18K Rose Gold', price: 500 },
          { value: 'platinum', label: 'Platinum', price: 2500 }
        ]
      }
    ],
    availability: 'low-stock',
    estimatedDelivery: '6-8 weeks',
    care: ['Professional servicing required', 'Water resistance certified'],
    warranty: '5 years international warranty',
    sku: 'JWL-LW-020',
    createdAt: '2024-01-20',
    updatedAt: '2024-03-15'
  }
];

export const jewelryCategories = {
  'chains': jewelryProducts.filter(p => p.category === 'chains'),
  'rings': jewelryProducts.filter(p => p.category === 'rings'),
  'earrings': jewelryProducts.filter(p => p.category === 'earrings'),
  'bracelets': jewelryProducts.filter(p => p.category === 'bracelets'),
  'pendants': jewelryProducts.filter(p => p.category === 'pendants'),
  'watches': jewelryProducts.filter(p => p.category === 'watches')
};

export const featuredJewelry = jewelryProducts.filter(p => p.featured);
export const newJewelry = jewelryProducts.filter(p => p.new);
export const bestsellerJewelry = jewelryProducts.filter(p => p.bestseller);
export const bridalJewelry = jewelryProducts.filter(p => p.tags?.includes('bridal'));

export default jewelryProducts;