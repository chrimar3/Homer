'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BaseComponentProps } from '@/types';

interface ServicesSection extends BaseComponentProps {}

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
  price: string;
  duration: string;
  popular?: boolean;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative bg-white rounded-none shadow-lg hover:shadow-luxury-hover transition-all duration-700 transform hover:-translate-y-4 overflow-hidden ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ 
        animationDelay: `${index * 0.2}s`,
        animationFillMode: 'both'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 bg-homer-gold text-white px-3 py-1 text-xs font-montserrat font-bold rounded-none z-10">
          MOST POPULAR
        </div>
      )}

      {/* Service Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Icon Overlay */}
        <div className="absolute bottom-4 left-4 p-3 bg-homer-gold rounded-none shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="text-white w-6 h-6">
            {service.icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="mb-4">
          <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-2 group-hover:text-homer-gold transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {service.description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-6">
          <ul className="space-y-2">
            {service.features.map((feature, featureIndex) => (
              <li 
                key={featureIndex}
                className={`flex items-center text-gray-700 transition-all duration-300 ${
                  isHovered ? 'translate-x-1' : ''
                }`}
                style={{ transitionDelay: `${featureIndex * 0.1}s` }}
              >
                <svg 
                  className="w-4 h-4 text-homer-gold mr-3 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-sm font-montserrat">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & Duration */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-none">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-montserrat mb-1">Starting At</p>
            <p className="font-cinzel text-xl font-bold text-homer-gold">{service.price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-montserrat mb-1">Duration</p>
            <p className="font-montserrat text-sm font-semibold text-gray-700">{service.duration}</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full group bg-homer-gold hover:bg-homer-darkGold text-white py-3 px-6 rounded-none font-montserrat font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-luxury-hover">
          <span className="flex items-center justify-center gap-2">
            BOOK CONSULTATION
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-2 h-full bg-homer-gold transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSection> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const services: Service[] = [
    {
      id: 'custom-grillz',
      title: 'Custom Grillz',
      description: 'Handcrafted gold and diamond grillz designed to your exact specifications. Each piece is a unique expression of your style and personality.',
      features: [
        'Digital smile impression',
        '14k or 18k gold options',
        'Premium diamond setting',
        'Perfect custom fit',
        'Lifetime warranty',
        'Complimentary cleaning'
      ],
      image: '/images/services/custom-grillz-service.jpg',
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      price: '$2,500',
      duration: '2-3 weeks',
      popular: true
    },
    {
      id: 'fine-jewelry',
      title: 'Fine Jewelry',
      description: 'Exquisite handcrafted jewelry pieces including rings, necklaces, bracelets, and earrings using the finest materials and gemstones.',
      features: [
        'Premium gemstone selection',
        'Master craftsman creation',
        'Custom design options',
        'Authentic certifications',
        'Luxury presentation box',
        'Professional appraisal'
      ],
      image: '/images/services/fine-jewelry-service.jpg',
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      price: '$1,200',
      duration: '3-4 weeks',
    },
    {
      id: 'consultations',
      title: 'VIP Consultations',
      description: 'Private one-on-one consultations with our master jewelers to discuss your vision and create truly bespoke pieces.',
      features: [
        'Private showroom access',
        'Master jeweler consultation',
        'Design concept development',
        'Material & stone selection',
        'Progress updates',
        'White-glove service'
      ],
      image: '/images/services/vip-consultation-service.jpg',
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
      ),
      price: 'Complimentary',
      duration: '60-90 minutes',
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  return (
    <section ref={sectionRef} className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-homer-gold font-montserrat tracking-[0.2em] uppercase text-sm mb-4">
            Premium Services
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Luxury
            <span className="block text-homer-gold">Experience</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            From custom grillz to fine jewelry, we offer comprehensive luxury services 
            tailored to your unique style and preferences
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-none shadow-lg p-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-4">
              Why Choose Homer?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-homer-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-montserrat font-semibold text-gray-900 mb-2">Quality Guarantee</h4>
                <p className="text-gray-600 text-sm">Every piece comes with our lifetime quality guarantee</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-homer-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-montserrat font-semibold text-gray-900 mb-2">Expert Craftsmanship</h4>
                <p className="text-gray-600 text-sm">25+ years of master-level jewelry creation</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-homer-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-montserrat font-semibold text-gray-900 mb-2">Personalized Service</h4>
                <p className="text-gray-600 text-sm">One-on-one attention for every client</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Ready to create your masterpiece? Book a consultation today and let our master craftsmen 
              bring your vision to life.
            </p>
            
            <button className="group bg-homer-gold hover:bg-homer-darkGold text-white px-12 py-4 rounded-none font-montserrat font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-luxury hover:shadow-luxury-hover">
              <span className="flex items-center justify-center gap-2">
                SCHEDULE CONSULTATION
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m0 0V7a3 3 0 11-6 0v0M8 7v13a3 3 0 006 0V7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};