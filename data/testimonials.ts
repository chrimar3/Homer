export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  verified: boolean;
  date: string;
  productCategory?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    location: 'Atlanta, GA',
    rating: 5,
    comment: 'The custom grillz exceeded all my expectations. The craftsmanship is absolutely incredible, and the diamonds are flawless. Homer delivered exactly what I envisioned.',
    image: '/images/testimonials/marcus-j.jpg',
    verified: true,
    date: '2024-08-15',
    productCategory: 'Grillz'
  },
  {
    id: '2',
    name: 'Sophia Mitchell',
    location: 'Southampton, NY',
    rating: 5,
    comment: 'My engagement ring is a true masterpiece. The attention to detail and quality is unmatched. Every time I look at it, I\'m amazed by the beauty.',
    image: '/images/testimonials/sophia-m.jpg',
    verified: true,
    date: '2024-08-12',
    productCategory: 'Rings'
  },
  {
    id: '3',
    name: 'David Rodriguez',
    location: 'Miami, FL',
    rating: 5,
    comment: 'The Cuban chain I ordered is pure luxury. The weight, the finish, everything about it screams quality. Worth every penny.',
    verified: true,
    date: '2024-08-08',
    productCategory: 'Chains'
  },
  {
    id: '4',
    name: 'Isabella Chen',
    location: 'Los Angeles, CA',
    rating: 5,
    comment: 'Homer created the most beautiful tennis bracelet for my anniversary. The emeralds are stunning and the craftsmanship is exceptional.',
    image: '/images/testimonials/isabella-c.jpg',
    verified: true,
    date: '2024-08-05',
    productCategory: 'Bracelets'
  },
  {
    id: '5',
    name: 'James Thompson',
    location: 'Athens, Greece',
    rating: 5,
    comment: 'Working with Homer was an amazing experience. They understood my vision perfectly and delivered beyond expectations. Truly luxury redefined.',
    verified: true,
    date: '2024-07-28',
    productCategory: 'Custom'
  },
  {
    id: '6',
    name: 'Aria Williams',
    location: 'New York, NY',
    rating: 4,
    comment: 'Beautiful pearl earrings with impeccable quality. The consultation process was thorough and professional. Highly recommend!',
    image: '/images/testimonials/aria-w.jpg',
    verified: true,
    date: '2024-07-22',
    productCategory: 'Earrings'
  },
  {
    id: '7',
    name: 'Alexander Papadopoulos',
    location: 'Athens, Greece',
    rating: 5,
    comment: 'Η ποιότητα είναι εξαιρετική! The custom pendant they made for me is absolutely perfect. True Greek craftsmanship meets modern luxury.',
    verified: true,
    date: '2024-07-18',
    productCategory: 'Pendants'
  },
  {
    id: '8',
    name: 'Rachel Goldman',
    location: 'Southampton, NY',
    rating: 5,
    comment: 'The entire experience was seamless from consultation to delivery. My custom piece is exactly what I dreamed of. Homer is the best!',
    image: '/images/testimonials/rachel-g.jpg',
    verified: true,
    date: '2024-07-10',
    productCategory: 'Custom'
  }
];

export const testimonialStats = {
  averageRating: 4.9,
  totalReviews: 247,
  fiveStarPercentage: 92,
  verifiedCustomers: 98
};

export default testimonials;