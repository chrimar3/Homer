import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe.js with publishable key
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);