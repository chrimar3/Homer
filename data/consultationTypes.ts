import { ConsultationType } from '@/types';

/**
 * Available consultation types for Homer jewelry appointments
 * Each type includes duration, pricing, and feature details
 */
export const consultationTypes: ConsultationType[] = [
  {
    id: 'design-consultation',
    name: 'Design Consultation',
    description: 'Personalized design session for custom jewelry pieces. Work with our master craftsmen to create your unique vision.',
    duration: 90,
    price: 150,
    icon: '🎨',
    features: [
      'One-on-one with master designer',
      'Sketch concepts and CAD previews',
      'Material and gemstone selection',
      'Pricing estimate for custom piece',
      'Timeline and process overview'
    ],
    popular: true
  },
  {
    id: 'sizing-fitting',
    name: 'Sizing & Fitting',
    description: 'Professional sizing and fitting service for rings, bracelets, and chains. Ensure perfect comfort and fit.',
    duration: 30,
    price: 50,
    icon: '📏',
    features: [
      'Professional ring sizing',
      'Bracelet and chain adjustments',
      'Comfort fit recommendations',
      'Complimentary cleaning',
      'Fit guarantee'
    ]
  },
  {
    id: 'general-consultation',
    name: 'General Consultation',
    description: 'Explore our collections, learn about care and maintenance, or discuss any jewelry-related questions.',
    duration: 45,
    price: 75,
    icon: '💎',
    features: [
      'Collection overview',
      'Care and maintenance tips',
      'Authentication services',
      'Appraisal guidance',
      'Investment recommendations'
    ]
  },
  {
    id: 'repair-assessment',
    name: 'Repair Assessment',
    description: 'Professional evaluation of jewelry repair needs with detailed assessment and cost estimates.',
    duration: 60,
    price: 100,
    icon: '🔧',
    features: [
      'Detailed damage assessment',
      'Repair options and techniques',
      'Cost estimates and timelines',
      'Restoration recommendations',
      'Preventive care advice'
    ]
  },
  {
    id: 'investment-consultation',
    name: 'Investment Consultation',
    description: 'Expert guidance on jewelry as investment, market trends, and portfolio diversification strategies.',
    duration: 75,
    price: 200,
    icon: '📈',
    features: [
      'Market analysis and trends',
      'Investment-grade piece selection',
      'Portfolio diversification advice',
      'Authentication and certification',
      'Resale value assessment'
    ]
  },
  {
    id: 'virtual-consultation',
    name: 'Virtual Consultation',
    description: 'Remote consultation via video call for international clients or convenience. All services available virtually.',
    duration: 60,
    price: 125,
    icon: '💻',
    features: [
      'HD video consultation',
      'Screen sharing for designs',
      'Digital catalog presentation',
      'Shipping and logistics planning',
      'Follow-up appointment booking'
    ]
  }
];

/**
 * Get consultation type by ID
 */
export const getConsultationTypeById = (id: string): ConsultationType | undefined => {
  return consultationTypes.find(type => type.id === id);
};

/**
 * Get popular consultation types
 */
export const getPopularConsultationTypes = (): ConsultationType[] => {
  return consultationTypes.filter(type => type.popular);
};

/**
 * Get consultation types sorted by price
 */
export const getConsultationTypesByPrice = (ascending: boolean = true): ConsultationType[] => {
  return [...consultationTypes].sort((a, b) => 
    ascending ? a.price - b.price : b.price - a.price
  );
};

/**
 * Get consultation types by duration range
 */
export const getConsultationTypesByDuration = (
  minDuration: number, 
  maxDuration?: number
): ConsultationType[] => {
  return consultationTypes.filter(type => {
    if (maxDuration) {
      return type.duration >= minDuration && type.duration <= maxDuration;
    }
    return type.duration >= minDuration;
  });
};