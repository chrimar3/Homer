'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BaseComponentProps } from '@/types';
import { testimonials, testimonialStats, Testimonial } from '@/data/testimonials';

interface TestimonialsProps extends BaseComponentProps {}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  onClick: () => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive, onClick }) => {
  return (
    <div 
      className={`flex-shrink-0 w-full sm:w-80 lg:w-96 p-6 rounded-none shadow-lg transition-all duration-500 cursor-pointer ${
        isActive 
          ? 'bg-white transform scale-105 shadow-luxury-hover' 
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        
        {/* Quote Icon */}
        <div className="mb-4">
          <svg className="w-8 h-8 text-homer-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < testimonial.rating ? 'text-homer-gold fill-current' : 'text-gray-300'}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Comment */}
        <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow">
          "{testimonial.comment}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {testimonial.image ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-homer-gold rounded-full flex items-center justify-center">
              <span className="text-white font-cinzel font-bold text-lg">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="flex-1">
            <p className="font-montserrat font-semibold text-gray-900">{testimonial.name}</p>
            <p className="text-gray-600 text-sm">{testimonial.location}</p>
            {testimonial.productCategory && (
              <p className="text-homer-gold text-xs font-montserrat">{testimonial.productCategory}</p>
            )}
          </div>
          
          {testimonial.verified && (
            <div className="flex items-center gap-1 text-green-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Verified</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Testimonials: React.FC<TestimonialsProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Intersection observer for visibility
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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Get visible testimonials (current + next 2 for desktop)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ testimonial: testimonials[index], index });
    }
    return visible;
  };

  return (
    <section ref={sectionRef} className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-homer-gold font-montserrat tracking-[0.2em] uppercase text-sm mb-4">
            Client Stories
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our
            <span className="block text-homer-gold">Clients Say</span>
          </h2>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-8">
            <div className="text-center">
              <div className="font-cinzel text-3xl font-bold text-homer-gold mb-2">
                {testimonialStats.averageRating}
              </div>
              <p className="text-gray-600 text-sm font-montserrat">Average Rating</p>
            </div>
            
            <div className="text-center">
              <div className="font-cinzel text-3xl font-bold text-homer-gold mb-2">
                {testimonialStats.totalReviews}+
              </div>
              <p className="text-gray-600 text-sm font-montserrat">Happy Clients</p>
            </div>
            
            <div className="text-center">
              <div className="font-cinzel text-3xl font-bold text-homer-gold mb-2">
                {testimonialStats.fiveStarPercentage}%
              </div>
              <p className="text-gray-600 text-sm font-montserrat">Five Star Reviews</p>
            </div>
            
            <div className="text-center">
              <div className="font-cinzel text-3xl font-bold text-homer-gold mb-2">
                {testimonialStats.verifiedCustomers}%
              </div>
              <p className="text-gray-600 text-sm font-montserrat">Verified Purchases</p>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white hover:bg-homer-gold text-homer-gold hover:text-white rounded-full shadow-lg hover:shadow-luxury-hover transition-all duration-300 flex items-center justify-center group"
          >
            <svg 
              className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white hover:bg-homer-gold text-homer-gold hover:text-white rounded-full shadow-lg hover:shadow-luxury-hover transition-all duration-300 flex items-center justify-center group"
          >
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <div 
              className={`flex gap-6 transition-transform duration-700 ease-in-out ${
                isVisible ? '' : 'opacity-0'
              }`}
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {testimonials.concat(testimonials.slice(0, 2)).map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${Math.floor(index / testimonials.length)}`}
                  testimonial={testimonial}
                  isActive={index % testimonials.length === currentIndex}
                  onClick={() => goToSlide(index % testimonials.length)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-homer-gold w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-gray-500 hover:text-homer-gold transition-colors duration-300 text-sm font-montserrat flex items-center gap-2 mx-auto"
          >
            {isAutoPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                PAUSE AUTO-PLAY
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                RESUME AUTO-PLAY
              </>
            )}
          </button>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-none shadow-lg p-8 mt-16 text-center">
          <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Happy Clients?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experience the Homer difference for yourself. Book a consultation today and 
            discover why our clients consistently rate us as the premier luxury jewelry destination.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-homer-gold hover:bg-homer-darkGold text-white px-8 py-4 rounded-none font-montserrat font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-luxury hover:shadow-luxury-hover">
              <span className="flex items-center gap-2">
                BOOK CONSULTATION
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
            
            <button className="group border-2 border-homer-gold text-homer-gold hover:bg-homer-gold hover:text-white px-8 py-4 rounded-none font-montserrat font-medium text-lg transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">
                READ ALL REVIEWS
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
    </section>
  );
};