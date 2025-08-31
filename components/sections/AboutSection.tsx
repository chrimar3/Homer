'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BaseComponentProps } from '@/types';

interface AboutSectionProps extends BaseComponentProps {}

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  isVisible: boolean;
}

const Counter: React.FC<CounterProps> = ({ 
  end, 
  duration, 
  suffix = '', 
  prefix = '', 
  isVisible 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);
  
  return (
    <span className="font-cinzel text-4xl md:text-5xl font-bold text-homer-gold">
      {prefix}{count}{suffix}
    </span>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { value: 25, suffix: '+', label: 'Years of Experience', description: 'Mastering the art of fine jewelry' },
    { value: 2500, suffix: '+', label: 'Happy Customers', description: 'Worldwide satisfaction' },
    { value: 100, suffix: '%', label: 'Handcrafted', description: 'Every piece is unique' },
    { value: 2, suffix: '', label: 'Luxury Locations', description: 'Athens & Southampton' }
  ];

  return (
    <section ref={sectionRef} className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="col-span-2 relative aspect-[4/3] overflow-hidden rounded-none shadow-luxury">
                <Image
                  src="/images/about/master-craftsman-main.jpg"
                  alt="Master craftsman at work"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 bg-homer-gold text-white px-4 py-2 rounded-none">
                  <p className="font-montserrat font-bold text-sm">MASTER CRAFTSMAN</p>
                </div>
              </div>
              
              {/* Two smaller images */}
              <div className="relative aspect-square overflow-hidden rounded-none shadow-lg">
                <Image
                  src="/images/about/workshop-detail.jpg"
                  alt="Workshop details"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="relative aspect-square overflow-hidden rounded-none shadow-lg">
                <Image
                  src="/images/about/jewelry-close-up.jpg"
                  alt="Jewelry craftsmanship close-up"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 border-4 border-homer-gold opacity-30 rounded-none" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-homer-gold/20 rounded-none" />
          </div>

          {/* Right Side - Content */}
          <div className="lg:pl-8">
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              
              {/* Section Header */}
              <p className="text-homer-gold font-montserrat tracking-[0.2em] uppercase text-sm mb-4">
                Our Legacy
              </p>
              
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Craftsmanship
                <span className="block text-homer-gold">Perfected</span>
              </h2>
              
              <div className="space-y-6 mb-8">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Born from a passion for excellence and rooted in Greek tradition, Homer represents 
                  the pinnacle of luxury jewelry craftsmanship. Every piece tells a story of 
                  dedication, artistry, and uncompromising quality.
                </p>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  From our ateliers in Athens to our showroom in Southampton, we combine centuries-old 
                  techniques with contemporary design, creating jewelry that transcends time and trends.
                </p>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our master craftsmen, each with decades of experience, pour their expertise into 
                  every custom grillz set, every fine jewelry piece, ensuring that when you choose 
                  Homer, you choose a legacy of excellence.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`text-center lg:text-left transform transition-all duration-1000 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <Counter
                      end={stat.value}
                      duration={2000}
                      suffix={stat.suffix}
                      isVisible={isVisible}
                    />
                    <p className="font-montserrat font-semibold text-gray-900 mt-1 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certifications & Awards */}
              <div className="mb-8">
                <h3 className="font-montserrat font-semibold text-gray-900 mb-4">
                  Certifications & Recognition
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-none">
                    <svg className="w-5 h-5 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-montserrat">Master Jeweler Certified</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-none">
                    <svg className="w-5 h-5 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-montserrat">Ethical Sourcing</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-none">
                    <svg className="w-5 h-5 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-montserrat">Lifetime Warranty</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button className="group bg-homer-gold hover:bg-homer-darkGold text-white px-8 py-4 rounded-none font-montserrat font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-luxury hover:shadow-luxury-hover">
                  <span className="flex items-center gap-2">
                    LEARN MORE ABOUT US
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};