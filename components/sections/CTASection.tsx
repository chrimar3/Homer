'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BaseComponentProps } from '@/types';

interface CTASectionProps extends BaseComponentProps {}

interface LocationInfo {
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  mapUrl: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<'athens' | 'southampton'>('athens');
  const sectionRef = useRef<HTMLElement>(null);

  const locations: Record<'athens' | 'southampton', LocationInfo> = {
    athens: {
      name: 'Homer Athens',
      city: 'Athens, Greece',
      address: 'Kolonaki Square 15, Athens 106 73, Greece',
      phone: '+30 210 123 4567',
      email: 'athens@homer-luxury.com',
      hours: 'Mon-Sat: 10:00-20:00 | Sun: 12:00-18:00',
      image: '/images/locations/athens-showroom.jpg',
      mapUrl: 'https://maps.google.com/?q=Kolonaki+Square+Athens'
    },
    southampton: {
      name: 'Homer Southampton',
      city: 'Southampton, NY',
      address: '45 Main Street, Southampton, NY 11968, USA',
      phone: '+1 631 555 0123',
      email: 'southampton@homer-luxury.com',
      hours: 'Mon-Sat: 10:00-19:00 | Sun: 11:00-17:00',
      image: '/images/locations/southampton-showroom.jpg',
      mapUrl: 'https://maps.google.com/?q=45+Main+Street+Southampton+NY'
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  const currentLocation = locations[selectedLocation];

  return (
    <section ref={sectionRef} className={`py-20 bg-gradient-dark text-white overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Banner */}
        <div className="relative bg-gradient-luxury rounded-none shadow-luxury-hover p-12 mb-16 overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20">
              <svg viewBox="0 0 60 60" fill="currentColor">
                <polygon points="30,0 37,18 60,18 42,30 49,48 30,39 11,48 18,30 0,18 23,18" />
              </svg>
            </div>
            <div className="absolute top-32 right-20 w-16 h-16 rotate-45">
              <svg viewBox="0 0 60 60" fill="currentColor">
                <polygon points="30,0 37,18 60,18 42,30 49,48 30,39 11,48 18,30 0,18 23,18" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-32 w-12 h-12 rotate-12">
              <svg viewBox="0 0 60 60" fill="currentColor">
                <polygon points="30,0 37,18 60,18 42,30 49,48 30,39 11,48 18,30 0,18 23,18" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 text-center">
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              
              <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Ready to Create Your
                <span className="block text-yellow-300">Masterpiece?</span>
              </h2>
              
              <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                Book a private consultation with our master jewelers and begin your journey 
                to owning a truly exceptional piece of luxury jewelry
              </p>

              {/* Main CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <button className="group bg-white text-homer-gold hover:bg-gray-100 px-12 py-5 rounded-none font-montserrat font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-luxury-hover min-w-[280px]">
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m0 0V7a3 3 0 11-6 0v0M8 7v13a3 3 0 006 0V7" />
                    </svg>
                    BOOK CONSULTATION
                    <svg 
                      className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>

                <button className="group border-3 border-white hover:border-yellow-300 text-white hover:text-yellow-300 px-12 py-5 rounded-none font-montserrat font-bold text-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10 hover:bg-white/20 min-w-[280px]">
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    CALL NOW
                    <svg 
                      className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="font-cinzel text-2xl md:text-3xl font-bold text-yellow-300 mb-1">48hrs</div>
                  <p className="text-white/80 text-sm font-montserrat">Response Time</p>
                </div>
                <div className="text-center">
                  <div className="font-cinzel text-2xl md:text-3xl font-bold text-yellow-300 mb-1">Free</div>
                  <p className="text-white/80 text-sm font-montserrat">Consultation</p>
                </div>
                <div className="text-center">
                  <div className="font-cinzel text-2xl md:text-3xl font-bold text-yellow-300 mb-1">25+ Yrs</div>
                  <p className="text-white/80 text-sm font-montserrat">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left - Location Selection */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            
            <h3 className="font-cinzel text-3xl md:text-4xl font-bold mb-8">
              Visit Our
              <span className="block text-homer-lightGold">Luxury Showrooms</span>
            </h3>

            {/* Location Tabs */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setSelectedLocation('athens')}
                className={`px-6 py-3 rounded-none font-montserrat font-medium transition-all duration-300 ${
                  selectedLocation === 'athens'
                    ? 'bg-homer-gold text-white shadow-luxury'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Athens, Greece
              </button>
              <button
                onClick={() => setSelectedLocation('southampton')}
                className={`px-6 py-3 rounded-none font-montserrat font-medium transition-all duration-300 ${
                  selectedLocation === 'southampton'
                    ? 'bg-homer-gold text-white shadow-luxury'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Southampton, NY
              </button>
            </div>

            {/* Location Details */}
            <div className="bg-white/5 backdrop-blur-sm rounded-none p-8 border border-white/10">
              <h4 className="font-cinzel text-2xl font-bold text-homer-lightGold mb-6">
                {currentLocation.name}
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-homer-lightGold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-white font-montserrat">{currentLocation.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-homer-lightGold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${currentLocation.phone}`} className="text-white hover:text-homer-lightGold transition-colors duration-300 font-montserrat">
                    {currentLocation.phone}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-homer-lightGold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${currentLocation.email}`} className="text-white hover:text-homer-lightGold transition-colors duration-300 font-montserrat">
                    {currentLocation.email}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-homer-lightGold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white font-montserrat">{currentLocation.hours}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <a
                  href={currentLocation.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 bg-homer-gold hover:bg-homer-darkGold text-white px-6 py-3 rounded-none font-montserrat font-medium text-center transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    GET DIRECTIONS
                  </span>
                </a>

                <button className="group flex-1 border-2 border-white hover:border-homer-lightGold text-white hover:text-homer-lightGold px-6 py-3 rounded-none font-montserrat font-medium transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m0 0V7a3 3 0 11-6 0v0M8 7v13a3 3 0 006 0V7" />
                    </svg>
                    SCHEDULE VISIT
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right - Location Image */}
          <div className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="relative aspect-[4/3] rounded-none overflow-hidden shadow-luxury-hover group">
              <Image
                src={currentLocation.image}
                alt={`${currentLocation.name} showroom`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Floating Info */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-none shadow-lg">
                <p className="font-cinzel font-bold text-homer-gold text-lg mb-1">
                  {currentLocation.name}
                </p>
                <p className="text-gray-700 text-sm font-montserrat">
                  {currentLocation.city}
                </p>
              </div>

              {/* Play button overlay for virtual tour */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/20 backdrop-blur-sm border-2 border-white w-20 h-20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mt-16 text-center">
          <h3 className="font-cinzel text-2xl font-bold text-white mb-8">
            Multiple Ways to Connect
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-none p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-homer-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="font-montserrat font-semibold text-white mb-2">Live Chat</h4>
              <p className="text-white/70 text-sm mb-4">Instant assistance with our jewelry experts</p>
              <button className="text-homer-lightGold hover:text-white font-montserrat text-sm font-medium">
                Start Chat →
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-none p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-homer-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-montserrat font-semibold text-white mb-2">Virtual Consultation</h4>
              <p className="text-white/70 text-sm mb-4">Face-to-face meeting from anywhere</p>
              <button className="text-homer-lightGold hover:text-white font-montserrat text-sm font-medium">
                Book Video Call →
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-none p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-homer-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-montserrat font-semibold text-white mb-2">WhatsApp</h4>
              <p className="text-white/70 text-sm mb-4">Quick questions and updates</p>
              <button className="text-homer-lightGold hover:text-white font-montserrat text-sm font-medium">
                Message Us →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};