'use client';

import React, { useState } from 'react';
import { Location } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface LocationMapProps {
  locations: Location[];
  selectedLocation?: string;
  onLocationSelect?: (locationId: string) => void;
  className?: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  locations,
  selectedLocation,
  onLocationSelect,
  className = ''
}) => {
  const [activeLocation, setActiveLocation] = useState<string>(
    selectedLocation || locations[0]?.id || ''
  );

  const handleLocationClick = (locationId: string) => {
    setActiveLocation(locationId);
    onLocationSelect?.(locationId);
  };

  const openInMaps = (location: Location) => {
    if (location.coordinates) {
      window.open(
        `https://maps.google.com?q=${location.coordinates.lat},${location.coordinates.lng}`,
        '_blank'
      );
    } else {
      // Fallback to address search
      const query = encodeURIComponent(`${location.address}, ${location.city}`);
      window.open(`https://maps.google.com/maps?q=${query}`, '_blank');
    }
  };

  const openDirections = (location: Location) => {
    if (location.coordinates) {
      window.open(
        `https://maps.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`,
        '_blank'
      );
    } else {
      const query = encodeURIComponent(`${location.address}, ${location.city}`);
      window.open(`https://maps.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
    }
  };

  const activeLocationData = locations.find(loc => loc.id === activeLocation);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-cinzel text-homer-black mb-4">
          Find Us
        </h2>
        <p className="text-homer-gray-600 max-w-2xl mx-auto">
          Visit our exclusive showrooms in Athens and Southampton. Each location offers the complete Homer experience with expert guidance.
        </p>
      </div>

      {/* Location Selector */}
      <div className="flex justify-center">
        <div className="inline-flex bg-homer-gray-100 rounded-lg p-1">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location.id)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeLocation === location.id
                  ? 'bg-homer-gold text-white shadow-sm'
                  : 'text-homer-gray-700 hover:text-homer-gold hover:bg-white'
              }`}
            >
              {location.city}
              {location.city === 'Athens' && (
                <Badge variant="luxury" size="xs" className="ml-2">
                  Flagship
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Map and Details */}
      {activeLocationData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card variant="outlined" padding="lg">
            <div className="aspect-video bg-homer-gray-100 rounded-lg relative overflow-hidden">
              {/* Embedded Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-homer-gold/20 to-homer-lightGold/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-homer-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg 
                      className="w-8 h-8 text-homer-gold" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-homer-black mb-2">
                    {activeLocationData.name}
                  </h4>
                  <p className="text-homer-gray-600 text-sm">
                    {activeLocationData.address}
                  </p>
                  <p className="text-homer-gray-600 text-sm">
                    {activeLocationData.city}
                  </p>
                </div>
              </div>

              {/* Interactive Map Overlay */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/50 flex items-center justify-center transition-opacity duration-200">
                <Button
                  variant="luxury"
                  onClick={() => openInMaps(activeLocationData)}
                  className="transform scale-110"
                >
                  📍 View in Google Maps
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                variant="luxury"
                onClick={() => openDirections(activeLocationData)}
                leftIcon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                }
                fullWidth
              >
                Get Directions
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => openInMaps(activeLocationData)}
                leftIcon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                }
                fullWidth
              >
                View on Map
              </Button>
            </div>
          </Card>

          {/* Location Details */}
          <Card variant="luxury" padding="xl">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h3 className="text-2xl font-cinzel text-homer-black mb-2">
                  {activeLocationData.name}
                </h3>
                <p className="text-homer-gray-600">
                  {activeLocationData.city === 'Athens' 
                    ? 'Our flagship store in the heart of historic Athens' 
                    : 'Luxury jewelry destination in the prestigious Hamptons'
                  }
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 text-homer-gold flex-shrink-0 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-homer-black mb-1">Address</h4>
                    <p className="text-homer-gray-700">
                      {activeLocationData.address}
                    </p>
                    <p className="text-homer-gray-700">
                      {activeLocationData.city}
                    </p>
                    {activeLocationData.coordinates && (
                      <p className="text-homer-gray-500 text-sm">
                        {activeLocationData.coordinates.lat.toFixed(4)}, {activeLocationData.coordinates.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 text-homer-gold flex-shrink-0 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-homer-black mb-1">Phone</h4>
                    <a 
                      href={`tel:${activeLocationData.phone}`}
                      className="text-homer-gold hover:text-homer-darkGold transition-colors"
                    >
                      {activeLocationData.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 text-homer-gold flex-shrink-0 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-homer-black mb-1">Email</h4>
                    <a 
                      href={`mailto:${activeLocationData.email}`}
                      className="text-homer-gold hover:text-homer-darkGold transition-colors"
                    >
                      {activeLocationData.email}
                    </a>
                  </div>
                </div>

                {/* Business Hours Summary */}
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 text-homer-gold flex-shrink-0 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-homer-black mb-1">Hours Today</h4>
                    {(() => {
                      const today = new Date().getDay();
                      const todayHours = activeLocationData.businessHours.find(bh => bh.dayOfWeek === today);
                      
                      if (todayHours && !todayHours.closed) {
                        const formatTime = (time: string) => {
                          const [hours, minutes] = time.split(':').map(Number);
                          const period = hours >= 12 ? 'PM' : 'AM';
                          const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
                          return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
                        };
                        
                        return (
                          <p className="text-homer-gray-700">
                            {formatTime(todayHours.openTime)} - {formatTime(todayHours.closeTime)}
                          </p>
                        );
                      } else {
                        return (
                          <p className="text-homer-gray-500">Closed Today</p>
                        );
                      }
                    })()}
                    <button 
                      onClick={() => window.location.href = '/contact#hours'}
                      className="text-homer-gold hover:text-homer-darkGold text-sm underline"
                    >
                      View all hours →
                    </button>
                  </div>
                </div>
              </div>

              {/* Special Features */}
              <div className="border-t border-homer-gray-200 pt-6">
                <h4 className="font-semibold text-homer-black mb-3">Location Features</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-homer-gray-700">Private Consultation Rooms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-homer-gray-700">On-site Repair Services</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-homer-gray-700">Custom Design Studio</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-homer-gray-700">VIP Appointment Lounge</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-homer-gray-700">Complimentary Valet Parking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-homer-gray-700">Wheelchair Accessible</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-homer-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="luxury"
                    onClick={() => window.location.href = `/book-consultation?location=${activeLocationData.id}`}
                    leftIcon={
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    }
                    fullWidth
                  >
                    Book Appointment
                  </Button>
                  
                  <Button
                    variant="secondary"
                    onClick={() => window.location.href = `tel:${activeLocationData.phone}`}
                    leftIcon={
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    }
                    fullWidth
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Transportation & Parking Info */}
      {activeLocationData && (
        <Card variant="outlined" padding="lg">
          <h4 className="text-xl font-cinzel text-homer-black mb-4 text-center">
            Getting to {activeLocationData.name}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Parking */}
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h5 className="font-semibold text-homer-black mb-2">Parking</h5>
              <p className="text-homer-gray-600 text-sm">
                {activeLocationData.city === 'Athens' 
                  ? 'Complimentary valet parking available. Street parking nearby.'
                  : 'Free parking lot. Additional street parking available.'
                }
              </p>
            </div>

            {/* Public Transport */}
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h5 className="font-semibold text-homer-black mb-2">Public Transport</h5>
              <p className="text-homer-gray-600 text-sm">
                {activeLocationData.city === 'Athens' 
                  ? 'Metro: Panepistimio station (2 min walk). Multiple bus routes nearby.'
                  : 'Hampton Jitney stop 0.3 miles away. LIRR Westhampton station (15 min drive).'
                }
              </p>
            </div>

            {/* Accessibility */}
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 4a1 1 0 000 2h12a1 1 0 100-2H4zm0 4a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
                </svg>
              </div>
              <h5 className="font-semibold text-homer-black mb-2">Accessibility</h5>
              <p className="text-homer-gray-600 text-sm">
                Wheelchair accessible entrance. Elevator access to all floors. Accessible parking spaces available.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};