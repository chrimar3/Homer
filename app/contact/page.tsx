'use client';

import React, { useState } from 'react';
import { ContactFormData } from '@/types';
import { locations } from '@/data/availability';

// Import contact components
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { BusinessHoursDisplay } from '@/components/contact/BusinessHours';
import { LocationMap } from '@/components/contact/LocationMap';

import { Button } from '@/components/ui/Button';
import { Tabs, TabItem } from '@/components/ui/Tabs';

/**
 * Main contact page with multiple ways to get in touch
 * Features: Contact form, location info, business hours, interactive map
 */
export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('contact');
  const [selectedLocation, setSelectedLocation] = useState<string>(locations[0]?.id || '');

  const handleContactSubmit = async (formData: ContactFormData): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would send this data to your backend
    console.log('Contact form submitted:', formData);
    
    // The form component handles the success state internally
  };

  const tabs: TabItem[] = [
    {
      id: 'contact',
      label: 'Send Message',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )
    },
    {
      id: 'locations',
      label: 'Our Locations',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'hours',
      label: 'Store Hours',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'map',
      label: 'Find Us',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-homer-gold/10 to-homer-lightGold/10">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-cinzel text-homer-black mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-homer-gray-600 max-w-3xl mx-auto mb-8">
            We&apos;d love to hear from you. Whether you have questions about our collections, need expert advice, 
            or want to schedule a consultation, our team is here to help.
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Button
              variant="luxury"
              size="lg"
              onClick={() => window.location.href = '/book-consultation'}
              leftIcon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              }
            >
              Book Consultation
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = 'tel:+302103614292'}
              leftIcon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              }
            >
              Call Athens Store
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setActiveTab('contact')}
              leftIcon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              }
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-12">
            <Tabs
              items={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              variant="luxury"
              size="lg"
              fullWidth={false}
              className="justify-center"
            />
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'contact' && (
              <div className="max-w-4xl mx-auto">
                <ContactForm onSubmit={handleContactSubmit} />
              </div>
            )}

            {activeTab === 'locations' && (
              <ContactInfo locations={locations} />
            )}

            {activeTab === 'hours' && (
              <BusinessHoursDisplay locations={locations} />
            )}

            {activeTab === 'map' && (
              <LocationMap
                locations={locations}
                selectedLocation={selectedLocation}
                onLocationSelect={setSelectedLocation}
              />
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-cinzel text-homer-black mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-homer-gray-600">
                Quick answers to common questions about our services and appointments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-homer-black mb-2">
                    How far in advance should I book?
                  </h3>
                  <p className="text-homer-gray-700 text-sm">
                    We recommend booking 1-2 weeks in advance for regular consultations. For custom design projects or special occasions, booking 3-4 weeks ahead ensures the best availability.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-homer-black mb-2">
                    What should I bring to my appointment?
                  </h3>
                  <p className="text-homer-gray-700 text-sm">
                    Bring any existing jewelry pieces you&apos;d like to discuss, inspiration photos for custom designs, and your ID. We&apos;ll provide everything else you need.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-homer-black mb-2">
                    Do you offer virtual consultations?
                  </h3>
                  <p className="text-homer-gray-700 text-sm">
                    Yes! We offer comprehensive virtual consultations via video call. You&apos;ll receive the same expert guidance and personalized service from anywhere in the world.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-homer-black mb-2">
                    Can I reschedule my appointment?
                  </h3>
                  <p className="text-homer-gray-700 text-sm">
                    Absolutely. You can reschedule up to 24 hours before your appointment without any fees. Just call us or use the link in your confirmation email.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-homer-black mb-2">
                    Is there parking available?
                  </h3>
                  <p className="text-homer-gray-700 text-sm">
                    Both locations offer convenient parking. Athens provides complimentary valet service, while Southampton has a dedicated parking lot for customers.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-homer-black mb-2">
                    What languages do you speak?
                  </h3>
                  <p className="text-homer-gray-700 text-sm">
                    Our Athens team is fluent in Greek and English. Our Southampton location serves customers in English, with translation services available upon request.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-homer-gray-600 mb-4">
                Have other questions? We&apos;re here to help.
              </p>
              <Button
                variant="luxury"
                onClick={() => setActiveTab('contact')}
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div className="bg-red-50 border-t border-red-200">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h3 className="font-semibold text-red-900 mb-2">
              Emergency Jewelry Services
            </h3>
            <p className="text-red-700 text-sm mb-3">
              For urgent repairs, insurance claims, or lost items, our 24/7 emergency line is available
            </p>
            <a 
              href="tel:+1-800-HOMER-24" 
              className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              📞 +1 (800) HOMER-24
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}