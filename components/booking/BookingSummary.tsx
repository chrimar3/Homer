'use client';

import React from 'react';
import { BookingFormData, ConsultationType, Location, TimeSlot } from '@/types';
import { formatDate, formatTimeRange } from '@/lib/utils/dateHelpers';
import { formatCurrency, calculateBookingPrice } from '@/lib/utils/bookingHelpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface BookingSummaryProps {
  formData: BookingFormData;
  consultationType: ConsultationType;
  location: Location;
  timeSlot: TimeSlot;
  className?: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  formData,
  consultationType,
  location,
  timeSlot,
  className = ''
}) => {
  const totalPrice = calculateBookingPrice(consultationType, location, formData.recurring);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-cinzel text-homer-black mb-4">
          Review Your Appointment
        </h2>
        <p className="text-homer-gray-600">
          Please review all details before confirming your booking
        </p>
      </div>

      {/* Appointment Details */}
      <Card variant="luxury" padding="lg">
        <div className="space-y-6">
          {/* Service & Price */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-cinzel text-homer-black mb-2">
                {consultationType.name}
              </h3>
              <p className="text-homer-gray-600 text-sm mb-3">
                {consultationType.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-homer-gray-600">
                <span>⏱️ {consultationType.duration} minutes</span>
                <span>{consultationType.icon} {consultationType.features.length} benefits</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-homer-gold">
                {formatCurrency(totalPrice)}
              </div>
              {formData.recurring && (
                <Badge variant="success" size="sm" className="mt-1">
                  5% Recurring Discount Applied
                </Badge>
              )}
            </div>
          </div>

          <hr className="border-homer-gray-200" />

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-homer-black mb-2 flex items-center">
                <svg className="w-4 h-4 text-homer-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Date & Time
              </h4>
              <p className="text-homer-gray-700">
                {formatDate(formData.date, 'full')}
              </p>
              <p className="text-homer-gray-700">
                {formatTimeRange(timeSlot.startTime, timeSlot.endTime)}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-homer-black mb-2 flex items-center">
                <svg className="w-4 h-4 text-homer-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Location
              </h4>
              <p className="text-homer-gray-700 font-medium">
                {location.name}
              </p>
              <p className="text-homer-gray-600 text-sm">
                {location.address}, {location.city}
              </p>
              <p className="text-homer-gray-600 text-sm">
                📞 {location.phone}
              </p>
            </div>
          </div>

          <hr className="border-homer-gray-200" />

          {/* Customer Information */}
          <div>
            <h4 className="font-semibold text-homer-black mb-3 flex items-center">
              <svg className="w-4 h-4 text-homer-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-homer-gray-700">
                  <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </p>
                <p className="text-homer-gray-700">
                  <strong>Email:</strong> {formData.email}
                </p>
                <p className="text-homer-gray-700">
                  <strong>Phone:</strong> {formData.phone}
                </p>
              </div>
              <div>
                <p className="text-homer-gray-700">
                  <strong>Communication:</strong> {formData.communicationType === 'in-person' ? 'In-Person Visit' : formData.communicationType === 'video' ? 'Video Call' : 'Phone Call'}
                </p>
                {formData.recurring && (
                  <p className="text-homer-gray-700">
                    <strong>Recurring:</strong> {formData.recurringFrequency} appointments
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {formData.specialRequests && (
            <>
              <hr className="border-homer-gray-200" />
              <div>
                <h4 className="font-semibold text-homer-black mb-2 flex items-center">
                  <svg className="w-4 h-4 text-homer-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Special Requests
                </h4>
                <p className="text-homer-gray-700 bg-homer-gray-50 p-3 rounded">
                  {formData.specialRequests}
                </p>
              </div>
            </>
          )}

          {/* Notification Preferences */}
          <hr className="border-homer-gray-200" />
          <div>
            <h4 className="font-semibold text-homer-black mb-3 flex items-center">
              <svg className="w-4 h-4 text-homer-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              Notification Preferences
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-homer-gray-600 mb-1">Confirmation:</p>
                <div className="space-y-1">
                  {formData.emailConfirmation && (
                    <p className="text-sm text-homer-gray-700">✅ Email confirmation</p>
                  )}
                  {formData.smsConfirmation && (
                    <p className="text-sm text-homer-gray-700">✅ SMS confirmation</p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-homer-gray-600 mb-1">Reminders:</p>
                <div className="space-y-1">
                  {formData.reminderPreferences.email24h && (
                    <p className="text-sm text-homer-gray-700">✅ Email reminder (24h)</p>
                  )}
                  {formData.reminderPreferences.sms1h && (
                    <p className="text-sm text-homer-gray-700">✅ SMS reminder (1h)</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Price Breakdown */}
      <Card variant="outlined" padding="lg">
        <h4 className="font-semibold text-homer-black mb-4">Price Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-homer-gray-700">Base consultation fee</span>
            <span className="text-homer-gray-700">{formatCurrency(consultationType.price)}</span>
          </div>
          
          {location.id === 'southampton' && (
            <div className="flex justify-between">
              <span className="text-homer-gray-600 text-sm">Location premium (Southampton)</span>
              <span className="text-homer-gray-600 text-sm">+{formatCurrency(consultationType.price * 0.1)}</span>
            </div>
          )}
          
          {formData.recurring && (
            <div className="flex justify-between">
              <span className="text-green-600 text-sm">Recurring discount (5%)</span>
              <span className="text-green-600 text-sm">-{formatCurrency((consultationType.price * (location.id === 'southampton' ? 1.1 : 1)) * 0.05)}</span>
            </div>
          )}
          
          <hr className="border-homer-gray-200" />
          
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-homer-black">Total</span>
            <span className="text-homer-gold">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </Card>

      {/* Important Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-medium text-blue-900 mb-2">Important Information</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Please arrive 10 minutes early for your appointment</li>
          <li>• Bring any existing jewelry pieces you&apos;d like to discuss</li>
          <li>• Cancellations must be made at least 24 hours in advance</li>
          <li>• You&apos;ll receive confirmation details via your preferred method</li>
          {formData.recurring && (
            <li>• Recurring appointments will be automatically scheduled based on your selected frequency</li>
          )}
        </ul>
      </div>
    </div>
  );
};