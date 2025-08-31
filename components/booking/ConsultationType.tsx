'use client';

import React from 'react';
import { ConsultationType } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils/bookingHelpers';

interface ConsultationTypeSelectorProps {
  consultationTypes: ConsultationType[];
  selectedType?: ConsultationType;
  onSelect: (consultationType: ConsultationType) => void;
  className?: string;
}

export const ConsultationTypeSelector: React.FC<ConsultationTypeSelectorProps> = ({
  consultationTypes,
  selectedType,
  onSelect,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel text-homer-black mb-4">
          Select Your Consultation
        </h2>
        <p className="text-homer-gray-600 max-w-2xl mx-auto">
          Choose the type of consultation that best meets your needs. Our expert team will provide personalized service tailored to your requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultationTypes.map((consultationType) => (
          <Card
            key={consultationType.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-luxury group ${
              selectedType?.id === consultationType.id
                ? 'ring-2 ring-homer-gold bg-homer-gold/5'
                : 'hover:shadow-lg'
            }`}
            onClick={() => onSelect(consultationType)}
            padding="lg"
          >
            <div className="text-center space-y-4">
              {/* Icon and Popular Badge */}
              <div className="flex items-center justify-center space-x-2 mb-3">
                <span className="text-4xl" role="img" aria-label={consultationType.name}>
                  {consultationType.icon}
                </span>
                {consultationType.popular && (
                  <Badge variant="luxury" size="sm">
                    Popular
                  </Badge>
                )}
              </div>

              {/* Title and Price */}
              <div>
                <h3 className="text-xl font-cinzel text-homer-black mb-2">
                  {consultationType.name}
                </h3>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <span className="text-2xl font-bold text-homer-gold">
                    {formatCurrency(consultationType.price)}
                  </span>
                  <span className="text-sm text-homer-gray-500">
                    · {consultationType.duration} min
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-homer-gray-600 text-sm leading-relaxed">
                {consultationType.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-homer-gray-700 uppercase tracking-wide">
                  Includes
                </h4>
                <ul className="space-y-1">
                  {consultationType.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-xs text-homer-gray-600 flex items-center">
                      <svg 
                        className="w-3 h-3 text-homer-gold mr-2 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {consultationType.features.length > 3 && (
                    <li className="text-xs text-homer-gray-500 italic">
                      +{consultationType.features.length - 3} more benefits
                    </li>
                  )}
                </ul>
              </div>

              {/* Selection Indicator */}
              <div className={`pt-4 transition-all duration-200 ${
                selectedType?.id === consultationType.id
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              }`}>
                {selectedType?.id === consultationType.id ? (
                  <div className="flex items-center justify-center text-homer-gold">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-sm font-medium">Selected</span>
                  </div>
                ) : (
                  <div className="text-homer-gray-500 text-sm">
                    Click to select
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Help Text */}
      <div className="text-center mt-8 p-4 bg-homer-gold/10 rounded-lg">
        <p className="text-sm text-homer-gray-600">
          <strong>Need help choosing?</strong> All consultations include personalized attention from our expert team. 
          You can always upgrade or modify your service during the appointment.
        </p>
        <p className="text-xs text-homer-gray-500 mt-2">
          * Prices may vary based on location and specific requirements
        </p>
      </div>
    </div>
  );
};