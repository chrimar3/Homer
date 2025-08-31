'use client';

import React from 'react';
import { BookingFormData, BookingValidation } from '@/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';

interface BookingFormProps {
  formData: Partial<BookingFormData>;
  validation: BookingValidation;
  onUpdateData: (updates: Partial<BookingFormData>) => void;
  className?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  validation,
  onUpdateData,
  className = ''
}) => {
  const communicationOptions = [
    { value: 'in-person', label: 'In-Person Visit' },
    { value: 'video', label: 'Video Call' },
    { value: 'phone', label: 'Phone Call' }
  ];

  const recurringOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-cinzel text-homer-black mb-4">
          Your Information
        </h2>
        <p className="text-homer-gray-600 max-w-2xl mx-auto">
          Please provide your contact details so we can confirm your appointment and send you important updates.
        </p>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-lg shadow-sm border border-homer-gray-200 p-6">
        <h3 className="text-xl font-cinzel text-homer-black mb-6 flex items-center">
          <svg 
            className="w-5 h-5 text-homer-gold mr-3" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
              clipRule="evenodd" 
            />
          </svg>
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            value={formData.firstName || ''}
            onChange={(e) => onUpdateData({ firstName: e.target.value })}
            error={validation.errors.firstName}
            placeholder="Enter your first name"
            required
            fullWidth
          />
          
          <Input
            label="Last Name"
            value={formData.lastName || ''}
            onChange={(e) => onUpdateData({ lastName: e.target.value })}
            error={validation.errors.lastName}
            placeholder="Enter your last name"
            required
            fullWidth
          />
          
          <Input
            label="Email Address"
            type="email"
            value={formData.email || ''}
            onChange={(e) => onUpdateData({ email: e.target.value })}
            error={validation.errors.email}
            placeholder="Enter your email address"
            required
            fullWidth
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => onUpdateData({ phone: e.target.value })}
            error={validation.errors.phone}
            placeholder="Enter your phone number"
            required
            fullWidth
          />
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="bg-white rounded-lg shadow-sm border border-homer-gray-200 p-6">
        <h3 className="text-xl font-cinzel text-homer-black mb-6 flex items-center">
          <svg 
            className="w-5 h-5 text-homer-gold mr-3" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
              clipRule="evenodd" 
            />
          </svg>
          Communication Preferences
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-homer-gray-700 mb-3">
              Preferred Communication Method
            </label>
            <div className="space-y-2">
              {communicationOptions.map((option) => (
                <Radio
                  key={option.value}
                  name="communicationType"
                  value={option.value}
                  checked={formData.communicationType === option.value}
                  onChange={(e) => onUpdateData({ 
                    communicationType: e.target.value as 'in-person' | 'video' | 'phone' 
                  })}
                  label={option.label}
                />
              ))}
            </div>
            {validation.errors.communicationType && (
              <p className="text-red-600 text-sm mt-1">
                {validation.errors.communicationType}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="bg-white rounded-lg shadow-sm border border-homer-gray-200 p-6">
        <h3 className="text-xl font-cinzel text-homer-black mb-6 flex items-center">
          <svg 
            className="w-5 h-5 text-homer-gold mr-3" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" 
              clipRule="evenodd" 
            />
          </svg>
          Additional Information
        </h3>
        
        <Textarea
          label="Special Requests or Notes (Optional)"
          value={formData.specialRequests || ''}
          onChange={(e) => onUpdateData({ specialRequests: e.target.value })}
          error={validation.errors.specialRequests}
          placeholder="Any specific requirements, questions, or information you'd like us to know..."
          rows={4}
          fullWidth
          helperText="Maximum 500 characters"
        />
      </div>

      {/* Recurring Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-homer-gray-200 p-6">
        <h3 className="text-xl font-cinzel text-homer-black mb-6 flex items-center">
          <svg 
            className="w-5 h-5 text-homer-gold mr-3" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" 
              clipRule="evenodd" 
            />
          </svg>
          Recurring Appointments
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            checked={formData.recurring || false}
            onChange={(e) => onUpdateData({ 
              recurring: e.target.checked,
              recurringFrequency: e.target.checked ? 'monthly' : undefined
            })}
            label="Schedule recurring appointments"
            description="Perfect for regular maintenance, check-ups, or ongoing design consultations"
          />
          
          {formData.recurring && (
            <div className="ml-6 pt-4 border-t border-homer-gray-200">
              <Select
                label="Frequency"
                value={formData.recurringFrequency || ''}
                onChange={(e) => onUpdateData({ recurringFrequency: e.target.value as any })}
                options={recurringOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                placeholder="Select frequency"
                error={validation.errors.recurringFrequency}
                fullWidth
              />
            </div>
          )}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow-sm border border-homer-gray-200 p-6">
        <h3 className="text-xl font-cinzel text-homer-black mb-6 flex items-center">
          <svg 
            className="w-5 h-5 text-homer-gold mr-3" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          Notifications & Reminders
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-homer-black mb-3">Confirmation</h4>
            <div className="space-y-2">
              <Checkbox
                checked={formData.emailConfirmation !== false}
                onChange={(e) => onUpdateData({ emailConfirmation: e.target.checked })}
                label="Email confirmation"
                description="Receive booking confirmation and details via email"
              />
              
              <Checkbox
                checked={formData.smsConfirmation || false}
                onChange={(e) => onUpdateData({ smsConfirmation: e.target.checked })}
                label="SMS confirmation"
                description="Receive booking confirmation via text message"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-homer-black mb-3">Appointment Reminders</h4>
            <div className="space-y-2">
              <Checkbox
                checked={formData.reminderPreferences?.email24h !== false}
                onChange={(e) => onUpdateData({ 
                  reminderPreferences: {
                    ...formData.reminderPreferences,
                    email24h: e.target.checked
                  }
                })}
                label="Email reminder (24 hours before)"
                description="Get an email reminder one day before your appointment"
              />
              
              <Checkbox
                checked={formData.reminderPreferences?.sms1h || false}
                onChange={(e) => onUpdateData({ 
                  reminderPreferences: {
                    ...formData.reminderPreferences,
                    sms1h: e.target.checked
                  }
                })}
                label="SMS reminder (1 hour before)"
                description="Get a text message reminder one hour before your appointment"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="text-center text-sm text-homer-gray-500">
        <p>
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-homer-gold hover:text-homer-darkGold underline">
            Privacy Policy
          </a>
          {' '}and{' '}
          <a href="/terms" className="text-homer-gold hover:text-homer-darkGold underline">
            Terms of Service
          </a>.
          We will only use your information to process your appointment and send relevant communications.
        </p>
      </div>
    </div>
  );
};