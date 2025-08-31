'use client';

import React from 'react';
import { Location } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface LocationSelectorProps {
  locations: Location[];
  selectedLocation?: Location;
  onSelect: (location: Location) => void;
  className?: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations,
  selectedLocation,
  onSelect,
  className = ''
}) => {
  const formatBusinessHours = (location: Location): string => {
    const today = new Date().getDay();
    const todayHours = location.businessHours.find(bh => bh.dayOfWeek === today);
    
    if (todayHours && !todayHours.closed) {
      return `Today: ${todayHours.openTime} - ${todayHours.closeTime}`;
    }
    
    const mondayHours = location.businessHours.find(bh => bh.dayOfWeek === 1);
    return `Mon-Fri: ${mondayHours?.openTime} - ${mondayHours?.closeTime}`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel text-homer-black mb-4">
          Choose Your Location
        </h2>
        <p className="text-homer-gray-600 max-w-2xl mx-auto">
          Visit us at one of our exclusive locations. Each showroom offers the full Homer experience with personalized service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {locations.map((location) => (
          <Card
            key={location.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-luxury group ${
              selectedLocation?.id === location.id
                ? 'ring-2 ring-homer-gold bg-homer-gold/5 transform scale-105'
                : 'hover:shadow-lg hover:transform hover:scale-102'
            }`}
            onClick={() => onSelect(location)}
            padding="lg"
          >
            {/* Location Image */}
            <div className="aspect-video rounded-lg overflow-hidden mb-6">
              <img
                src={location.image || `/images/locations/${location.id}-default.jpg`}
                alt={`${location.name} storefront`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/locations/default-store.jpg';
                }}
              />
              {selectedLocation?.id === location.id && (
                <div className="absolute inset-0 bg-homer-gold/20 flex items-center justify-center">
                  <div className="bg-white rounded-full p-3">
                    <svg className="w-8 h-8 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Location Info */}
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-cinzel text-homer-black mb-1">
                    {location.name}
                  </h3>
                  <p className="text-homer-gray-600">
                    {location.city}
                  </p>
                </div>
                {location.city === 'Athens' && (
                  <Badge variant="luxury" size="sm">
                    Flagship
                  </Badge>
                )}
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3">
                <svg 
                  className="w-5 h-5 text-homer-gold mt-0.5 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <div>
                  <p className="text-homer-gray-700 text-sm">
                    {location.address}
                  </p>
                  <p className="text-homer-gray-700 text-sm">
                    {location.city}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <svg 
                    className="w-5 h-5 text-homer-gold flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" 
                    />
                  </svg>
                  <span className="text-homer-gray-700 text-sm">
                    {location.phone}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg 
                    className="w-5 h-5 text-homer-gold flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" 
                    />
                    <path 
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" 
                    />
                  </svg>
                  <span className="text-homer-gray-700 text-sm">
                    {location.email}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <svg 
                    className="w-5 h-5 text-homer-gold flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="text-homer-gray-700 text-sm">
                    {formatBusinessHours(location)}
                  </span>
                </div>
              </div>

              {/* Selection Status */}
              <div className={`pt-4 border-t border-homer-gray-200 transition-all duration-200 ${
                selectedLocation?.id === location.id
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              }`}>
                {selectedLocation?.id === location.id ? (
                  <div className="flex items-center justify-center text-homer-gold">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-sm font-medium">Selected Location</span>
                  </div>
                ) : (
                  <div className="text-center text-homer-gray-500 text-sm">
                    Click to select this location
                  </div>
                )}
              </div>

              {/* Map Link */}
              {location.coordinates && (
                <button
                  className="w-full mt-4 text-sm text-homer-gold hover:text-homer-darkGold transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://maps.google.com?q=${location.coordinates!.lat},${location.coordinates!.lng}`,
                      '_blank'
                    );
                  }}
                >
                  View on Google Maps →
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center mt-8 p-6 bg-gradient-to-r from-homer-gold/10 to-homer-lightGold/10 rounded-lg">
        <h3 className="font-cinzel text-lg text-homer-black mb-2">
          Can&apos;t visit in person?
        </h3>
        <p className="text-sm text-homer-gray-600 mb-4">
          We also offer virtual consultations via video call for your convenience. 
          Experience the same personalized service from anywhere in the world.
        </p>
        <button className="text-homer-gold hover:text-homer-darkGold text-sm font-medium">
          Learn about virtual consultations →
        </button>
      </div>
    </div>
  );
};