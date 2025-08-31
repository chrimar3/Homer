'use client';

import React, { useState } from 'react';
import { ContactFormData, ContactFormValidation } from '@/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ContactFormProps {
  onSubmit: (formData: ContactFormData) => Promise<void>;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  className = ''
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    location: '',
    interestedServices: []
  });

  const [validation, setValidation] = useState<ContactFormValidation>({
    isValid: false,
    errors: {}
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Appointment Booking' },
    { value: 'custom-design', label: 'Custom Design' },
    { value: 'repair', label: 'Jewelry Repair' },
    { value: 'sizing', label: 'Sizing & Fitting' },
    { value: 'collection', label: 'Collection Information' },
    { value: 'investment', label: 'Investment Consultation' },
    { value: 'shipping', label: 'Shipping & Returns' },
    { value: 'press', label: 'Press & Media' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'other', label: 'Other' }
  ];

  const locationOptions = [
    { value: 'athens', label: 'Athens Flagship' },
    { value: 'southampton', label: 'Southampton' },
    { value: 'online', label: 'Online/Virtual' },
    { value: 'other', label: 'Other Location' }
  ];

  const serviceOptions = [
    'Custom Design',
    'Jewelry Repair',
    'Sizing & Fitting',
    'Authentication',
    'Appraisal',
    'Investment Consultation',
    'Personal Shopping',
    'Styling Services'
  ];

  // Validation function
  const validateForm = (data: ContactFormData): ContactFormValidation => {
    const errors: { [K in keyof ContactFormData]?: string } = {};

    // Name validation
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided must be valid)
    if (data.phone && data.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    // Subject validation
    if (!data.subject) {
      errors.subject = 'Please select a subject';
    }

    // Message validation
    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (data.message.length > 2000) {
      errors.message = 'Message must be less than 2000 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const updateFormData = (updates: Partial<ContactFormData>) => {
    const newFormData = { ...formData, ...updates };
    setFormData(newFormData);
    setValidation(validateForm(newFormData));
  };

  const handleServiceToggle = (service: string, checked: boolean) => {
    const currentServices = formData.interestedServices || [];
    let newServices;
    
    if (checked) {
      newServices = [...currentServices, service];
    } else {
      newServices = currentServices.filter(s => s !== service);
    }
    
    updateFormData({ interestedServices: newServices });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalValidation = validateForm(formData);
    setValidation(finalValidation);
    
    if (!finalValidation.isValid) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error (you might want to show an error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      preferredContact: 'email',
      location: '',
      interestedServices: []
    });
    setValidation({ isValid: false, errors: {} });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card variant="luxury" padding="xl" className={className}>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-2xl font-cinzel text-homer-black mb-4">
              Thank You!
            </h3>
            <p className="text-homer-gray-600 mb-6">
              Your message has been sent successfully. We&apos;ll respond to your inquiry within 24 hours.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-homer-gray-600">
              <strong>Next Steps:</strong>
            </p>
            <ul className="text-sm text-homer-gray-600 space-y-2 text-left max-w-md mx-auto">
              <li>✅ We&apos;ve received your inquiry about: <strong>{subjectOptions.find(opt => opt.value === formData.subject)?.label}</strong></li>
              <li>📧 Check your email for an immediate confirmation</li>
              <li>👥 Our team will review and respond within 24 hours</li>
              {formData.preferredContact === 'phone' && formData.phone && (
                <li>📞 We&apos;ll call you at {formData.phone} during business hours</li>
              )}
            </ul>
          </div>
          
          <div className="pt-6 border-t border-homer-gray-200">
            <Button
              variant="luxury"
              onClick={resetForm}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="luxury" padding="xl" className={className}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-cinzel text-homer-black mb-4">
            Contact Us
          </h2>
          <p className="text-homer-gray-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            error={validation.errors.name}
            placeholder="Enter your full name"
            required
            fullWidth
          />
          
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            error={validation.errors.email}
            placeholder="Enter your email address"
            required
            fullWidth
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number (Optional)"
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            error={validation.errors.phone}
            placeholder="Enter your phone number"
            fullWidth
          />
          
          <Select
            label="Subject"
            value={formData.subject}
            onChange={(e) => updateFormData({ subject: e.target.value })}
            options={subjectOptions}
            placeholder="Select a subject"
            error={validation.errors.subject}
            required
            fullWidth
          />
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-homer-gray-700 mb-3">
            Preferred Contact Method
          </label>
          <div className="flex space-x-6">
            <Radio
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === 'email'}
              onChange={(e) => updateFormData({ preferredContact: e.target.value as 'email' | 'phone' })}
              label="Email"
            />
            <Radio
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === 'phone'}
              onChange={(e) => updateFormData({ preferredContact: e.target.value as 'email' | 'phone' })}
              label="Phone"
            />
          </div>
        </div>

        {/* Location Interest */}
        <Select
          label="Location Interest (Optional)"
          value={formData.location || ''}
          onChange={(e) => updateFormData({ location: e.target.value })}
          options={locationOptions}
          placeholder="Select a location"
          fullWidth
        />

        {/* Services Interest */}
        <div>
          <label className="block text-sm font-medium text-homer-gray-700 mb-3">
            Interested Services (Optional)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {serviceOptions.map((service) => (
              <Checkbox
                key={service}
                checked={formData.interestedServices?.includes(service) || false}
                onChange={(e) => handleServiceToggle(service, e.target.checked)}
                label={service}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Message */}
        <Textarea
          label="Message"
          value={formData.message}
          onChange={(e) => updateFormData({ message: e.target.value })}
          error={validation.errors.message}
          placeholder="Tell us about your inquiry, requirements, or any questions you have..."
          rows={6}
          required
          fullWidth
          helperText={`${formData.message.length}/2000 characters`}
        />

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            variant="luxury"
            size="lg"
            loading={isSubmitting}
            disabled={!validation.isValid || isSubmitting}
            className="min-w-48"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </Button>
        </div>

        {/* Privacy Notice */}
        <div className="text-center text-xs text-homer-gray-500 pt-4 border-t border-homer-gray-200">
          <p>
            By submitting this form, you agree to our{' '}
            <a href="/privacy" className="text-homer-gold hover:text-homer-darkGold underline">
              Privacy Policy
            </a>.
            We respect your privacy and will never share your information with third parties.
          </p>
        </div>
      </form>
    </Card>
  );
};