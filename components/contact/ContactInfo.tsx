'use client';

import React from 'react';
import { Location } from '@/types';
import { Card } from '@/components/ui/Card';

interface ContactInfoProps {
  locations: Location[];
  className?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  locations,
  className = ''
}) => {
  const formatBusinessHours = (location: Location): string[] => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Group consecutive days with same hours
    const hoursGroups: { days: string[]; hours: string }[] = [];
    
    location.businessHours.forEach(bh => {
      const dayName = daysOfWeek[bh.dayOfWeek];
      const hoursText = bh.closed ? 'Closed' : `${bh.openTime} - ${bh.closeTime}`;
      
      // Find existing group with same hours
      const existingGroup = hoursGroups.find(group => group.hours === hoursText);
      if (existingGroup) {
        existingGroup.days.push(dayName);
      } else {
        hoursGroups.push({ days: [dayName], hours: hoursText });
      }
    });
    
    return hoursGroups.map(group => {
      if (group.days.length === 1) {
        return `${group.days[0]}: ${group.hours}`;
      } else if (group.days.length === 2) {
        return `${group.days.join(' & ')}: ${group.hours}`;
      } else {
        return `${group.days[0]} - ${group.days[group.days.length - 1]}: ${group.hours}`;
      }
    });
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-cinzel text-homer-black mb-4">
          Visit Our Showrooms
        </h2>
        <p className="text-homer-gray-600 max-w-2xl mx-auto">
          Experience our collections in person at our exclusive locations. Each showroom offers personalized service and the complete Homer experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {locations.map((location) => (
          <Card key={location.id} variant="luxury" padding="xl" hover>
            {/* Location Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-homer-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-8 h-8 text-homer-gold" 
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
              </div>
              <h3 className="text-2xl font-cinzel text-homer-black mb-2">
                {location.name}
              </h3>
              <p className="text-homer-gray-600">
                {location.city === 'Athens' ? 'Our flagship store in the heart of Athens' : 'Luxury shopping destination in the Hamptons'}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-homer-gold flex-shrink-0 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path 
                      fillRule="evenodd" 
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-homer-black mb-1">Address</h4>
                  <p className="text-homer-gray-700">
                    {location.address}
                  </p>
                  <p className="text-homer-gray-700">
                    {location.city}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-homer-gold flex-shrink-0 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path 
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" 
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-homer-black mb-1">Phone</h4>
                  <a 
                    href={`tel:${location.phone}`}
                    className="text-homer-gold hover:text-homer-darkGold transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-homer-gold flex-shrink-0 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path 
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" 
                    />
                    <path 
                      d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" 
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-homer-black mb-1">Email</h4>
                  <a 
                    href={`mailto:${location.email}`}
                    className="text-homer-gold hover:text-homer-darkGold transition-colors"
                  >
                    {location.email}
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-homer-gold flex-shrink-0 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-homer-black mb-2">Business Hours</h4>
                  <div className="space-y-1">
                    {formatBusinessHours(location).map((hoursLine, index) => (
                      <p key={index} className="text-homer-gray-700 text-sm">
                        {hoursLine}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timezone */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-homer-gold flex-shrink-0 mt-1">
                  <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-homer-black mb-1">Timezone</h4>
                  <p className="text-homer-gray-700 text-sm">
                    {location.timezone.replace('_', ' ').replace('/', ' / ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-homer-gray-200">
              {location.coordinates && (
                <button
                  onClick={() => {
                    window.open(
                      `https://maps.google.com?q=${location.coordinates!.lat},${location.coordinates!.lng}`,
                      '_blank'
                    );
                  }}
                  className="flex-1 bg-homer-gold text-white py-3 px-4 rounded-lg hover:bg-homer-darkGold transition-colors text-sm font-medium"
                >
                  📍 Get Directions
                </button>
              )}
              
              <button
                onClick={() => window.location.href = `/book-consultation?location=${location.id}`}
                className="flex-1 bg-white border-2 border-homer-gold text-homer-gold py-3 px-4 rounded-lg hover:bg-homer-gold hover:text-white transition-colors text-sm font-medium"
              >
                📅 Book Appointment
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Contact Options */}
      <div className="text-center bg-homer-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-cinzel text-homer-black mb-4">
          Other Ways to Connect
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Virtual Consultation */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <h4 className="font-semibold text-homer-black mb-2">Virtual Consultation</h4>
            <p className="text-homer-gray-600 text-sm mb-4">
              Connect with our experts via video call from anywhere in the world
            </p>
            <button className="text-homer-gold hover:text-homer-darkGold text-sm font-medium">
              Schedule Virtual Meeting →
            </button>
          </div>

          {/* WhatsApp */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h4 className="font-semibold text-homer-black mb-2">WhatsApp Support</h4>
            <p className="text-homer-gray-600 text-sm mb-4">
              Get instant answers to your questions via WhatsApp messaging
            </p>
            <button className="text-homer-gold hover:text-homer-darkGold text-sm font-medium">
              Message on WhatsApp →
            </button>
          </div>

          {/* Live Chat */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-homer-black mb-2">Live Chat</h4>
            <p className="text-homer-gray-600 text-sm mb-4">
              Chat with our customer service team in real-time during business hours
            </p>
            <button className="text-homer-gold hover:text-homer-darkGold text-sm font-medium">
              Start Live Chat →
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h4 className="font-semibold text-red-900 mb-2">Emergency Services</h4>
        <p className="text-red-700 text-sm mb-3">
          For urgent jewelry repairs, insurance claims, or lost items, contact our emergency line 24/7
        </p>
        <a 
          href="tel:+1-800-HOMER-24" 
          className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          +1 (800) HOMER-24
        </a>
      </div>
    </div>
  );
};