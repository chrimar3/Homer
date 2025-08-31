import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { GalleryPreview } from '@/components/sections/GalleryPreview';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTASection } from '@/components/sections/CTASection';

/**
 * Homer Luxury Jewelry - Homepage
 * 
 * A stunning luxury homepage showcasing Homer's custom grillz and fine jewelry.
 * Features full-screen hero with animations, featured products with hover effects,
 * craftsmanship story, services, gallery preview, testimonials carousel, and CTA section.
 * 
 * Sections:
 * - HeroSection: Full-screen with animated headline and CTAs
 * - FeaturedProducts: Grid of 6 products with hover effects and quick view
 * - AboutSection: Split layout with images, stats counters, and craftsmanship story
 * - ServicesSection: Three service cards (Grillz, Fine Jewelry, Consultations)
 * - GalleryPreview: Instagram-style grid with hover overlays
 * - Testimonials: Carousel with auto-play and rating display
 * - CTASection: Booking banner with location info (Athens & Southampton)
 * 
 * @returns {JSX.Element} Complete luxury homepage
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full screen with background video/images */}
      <HeroSection />
      
      {/* Featured Products - 6 product grid with hover effects */}
      <FeaturedProducts />
      
      {/* About/Craftsmanship Section - Split layout with animated counters */}
      <AboutSection />
      
      {/* Services Section - Three service cards with hover animations */}
      <ServicesSection />
      
      {/* Gallery Preview - Instagram-style grid */}
      <GalleryPreview />
      
      {/* Testimonials - Carousel with auto-play */}
      <Testimonials />
      
      {/* CTA Section - Booking banner with locations */}
      <CTASection />
    </div>
  );
}
