'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BaseComponentProps } from '@/types';

interface HeroSectionProps extends BaseComponentProps {}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/images/hero/hero-grillz-main.jpg',
    '/images/hero/hero-jewelry-collection.jpg',
    '/images/hero/hero-craftsmanship.jpg'
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-change background images
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('featured-products');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Homer Luxury Jewelry ${index + 1}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div 
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Pre-headline */}
          <p className="text-homer-lightGold text-sm sm:text-base lg:text-lg font-montserrat tracking-[0.2em] uppercase mb-4 animate-fade-in">
            Est. Athens & Southampton
          </p>

          {/* Main Headline */}
          <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>
              LUXURY
            </span>
            <span 
              className="block text-homer-gold animate-slide-up bg-gradient-to-r from-homer-gold to-homer-lightGold bg-clip-text text-transparent"
              style={{ animationDelay: '0.6s' }}
            >
              REDEFINED
            </span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-gray-200 text-lg sm:text-xl lg:text-2xl font-montserrat max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.9s' }}
          >
            Handcrafted custom grillz and fine jewelry where 
            <span className="text-homer-lightGold font-medium"> Greek artistry </span>
            meets modern luxury
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up"
            style={{ animationDelay: '1.2s' }}
          >
            <button className="group bg-homer-gold hover:bg-homer-darkGold text-white px-8 py-4 rounded-none font-montserrat font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-luxury hover:shadow-luxury-hover min-w-[200px]">
              <span className="flex items-center justify-center gap-2">
                SHOP COLLECTION
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            <button className="group border-2 border-white hover:border-homer-gold text-white hover:text-homer-gold px-8 py-4 rounded-none font-montserrat font-medium text-lg transition-all duration-300 transform hover:scale-105 min-w-[200px] backdrop-blur-sm bg-white/5 hover:bg-white/10">
              <span className="flex items-center justify-center gap-2">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m0 0V7a3 3 0 11-6 0v0M8 7v13a3 3 0 006 0V7" />
                </svg>
                BOOK CONSULTATION
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer"
        onClick={scrollToNext}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToNext()}
      >
        <div className="flex flex-col items-center text-white hover:text-homer-gold transition-colors duration-300">
          <span className="text-sm font-montserrat mb-2 tracking-wide">SCROLL</span>
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-homer-gold w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Show hero image ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 text-homer-gold/30 animate-pulse">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
          <polygon points="30,0 37,18 60,18 42,30 49,48 30,39 11,48 18,30 0,18 23,18" />
        </svg>
      </div>
      
      <div className="absolute top-1/3 right-12 text-homer-gold/20 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg width="40" height="40" viewBox="0 0 60 60" fill="currentColor">
          <polygon points="30,0 37,18 60,18 42,30 49,48 30,39 11,48 18,30 0,18 23,18" />
        </svg>
      </div>
    </section>
  );
};