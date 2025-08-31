'use client';

import React from 'react';
import { BookingFormData, ConsultationType, Location, TimeSlot } from '@/types';
import { formatDate, formatTimeRange } from '@/lib/utils/dateHelpers';
import { formatCurrency, calculateBookingPrice } from '@/lib/utils/bookingHelpers';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface BookingConfirmationProps {
  confirmationNumber: string;
  formData: BookingFormData;
  consultationType: ConsultationType;
  location: Location;
  timeSlot: TimeSlot;
  onNewBooking?: () => void;
  onPrintReceipt?: () => void;
  className?: string;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  confirmationNumber,
  formData,
  consultationType,
  location,
  timeSlot,
  onNewBooking,
  onPrintReceipt,
  className = ''
}) => {
  const totalPrice = calculateBookingPrice(consultationType, location, formData.recurring);

  const addToCalendar = () => {
    const startDate = new Date(`${formData.date}T${timeSlot.startTime}:00`);
    const endDate = new Date(`${formData.date}T${timeSlot.endTime}:00`);
    
    const event = {
      title: `Homer Jewelry - ${consultationType.name}`,
      description: `Appointment at ${location.name}. Confirmation: ${confirmationNumber}`,
      location: `${location.address}, ${location.city}`,
      startDate: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      endDate: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const shareBooking = async () => {
    const shareData = {
      title: 'Homer Jewelry Appointment',
      text: `I have an appointment at Homer Jewelry on ${formatDate(formData.date, 'full')} at ${formatTimeRange(timeSlot.startTime, timeSlot.endTime)}. Confirmation: ${confirmationNumber}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareData.text);
      alert('Booking details copied to clipboard!');
    }
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Success Header */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-cinzel text-homer-black mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-xl text-homer-gray-600 mb-2">
          Thank you for choosing Homer Jewelry
        </p>
        
        <div className="flex items-center justify-center space-x-2">
          <span className="text-homer-gray-500">Confirmation Number:</span>
          <Badge variant="luxury" size="lg" className="font-mono">
            {confirmationNumber}
          </Badge>
        </div>
      </div>

      {/* Appointment Details Card */}
      <Card variant="luxury" padding="xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-cinzel text-homer-black mb-2">
            Your Appointment Details
          </h2>
          <p className="text-homer-gray-600">
            We&apos;ve sent confirmation details to {formData.email}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Service Details */}
            <div className="bg-homer-gold/10 rounded-lg p-6">
              <h3 className="font-semibold text-homer-black mb-3 flex items-center">
                <span className="text-2xl mr-3">{consultationType.icon}</span>
                {consultationType.name}
              </h3>
              <p className="text-homer-gray-700 text-sm mb-4">
                {consultationType.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-homer-gray-600">Duration: {consultationType.duration} minutes</span>
                <span className="text-2xl font-bold text-homer-gold">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <h4 className="font-semibold text-homer-black mb-3">Customer Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-homer-gray-600">Name:</span> {formData.firstName} {formData.lastName}</p>
                <p><span className="text-homer-gray-600">Email:</span> {formData.email}</p>
                <p><span className="text-homer-gray-600">Phone:</span> {formData.phone}</p>
                <p><span className="text-homer-gray-600">Communication:</span> {
                  formData.communicationType === 'in-person' ? 'In-Person Visit' :
                  formData.communicationType === 'video' ? 'Video Call' : 'Phone Call'
                }</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Date & Time */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-homer-black mb-3 flex items-center">
                <svg className="w-5 h-5 text-homer-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Date & Time
              </h4>
              <p className="text-lg font-medium text-homer-black">
                {formatDate(formData.date, 'full')}
              </p>
              <p className="text-lg text-homer-gray-700">
                {formatTimeRange(timeSlot.startTime, timeSlot.endTime)}
              </p>
              <p className="text-sm text-homer-gray-600 mt-2">
                Please arrive 10 minutes early
              </p>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-semibold text-homer-black mb-3 flex items-center">
                <svg className="w-5 h-5 text-homer-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Location
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-homer-black">{location.name}</p>
                <p className="text-homer-gray-700">{location.address}</p>
                <p className="text-homer-gray-700">{location.city}</p>
                <p className="text-homer-gray-700">📞 {location.phone}</p>
                {location.coordinates && (
                  <button
                    onClick={() => window.open(`https://maps.google.com?q=${location.coordinates!.lat},${location.coordinates!.lng}`, '_blank')}
                    className="text-homer-gold hover:text-homer-darkGold text-sm underline"
                  >
                    View on Google Maps →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {formData.specialRequests && (
          <div className="mt-8 pt-6 border-t border-homer-gray-200">
            <h4 className="font-semibold text-homer-black mb-3">Special Requests</h4>
            <p className="text-homer-gray-700 bg-homer-gray-50 p-4 rounded">
              {formData.specialRequests}
            </p>
          </div>
        )}

        {/* Recurring Information */}
        {formData.recurring && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Recurring Appointments
            </h4>
            <p className="text-green-700 text-sm">
              Your {formData.recurringFrequency} appointments are set up. We&apos;ll contact you before each appointment to confirm.
            </p>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="luxury"
          size="lg"
          onClick={addToCalendar}
          leftIcon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          }
        >
          Add to Calendar
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={onPrintReceipt}
          leftIcon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zM5 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          }
        >
          Print Receipt
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={shareBooking}
          leftIcon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          }
        >
          Share
        </Button>
      </div>

      {/* Next Steps */}
      <Card variant="outlined" padding="lg">
        <h3 className="text-xl font-cinzel text-homer-black mb-4 text-center">
          What&apos;s Next?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-homer-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h4 className="font-semibold text-homer-black mb-2">Check Your Email</h4>
            <p className="text-sm text-homer-gray-600">
              We&apos;ve sent detailed confirmation and preparation instructions to your email.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-homer-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h4 className="font-semibold text-homer-black mb-2">Set Reminders</h4>
            <p className="text-sm text-homer-gray-600">
              {formData.reminderPreferences.email24h && 'Email reminder 24 hours before. '}
              {formData.reminderPreferences.sms1h && 'SMS reminder 1 hour before.'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-homer-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-homer-black mb-2">Prepare for Visit</h4>
            <p className="text-sm text-homer-gray-600">
              Bring any existing pieces and arrive 10 minutes early for the best experience.
            </p>
          </div>
        </div>
      </Card>

      {/* Contact & Support */}
      <div className="text-center py-6">
        <p className="text-homer-gray-600 mb-4">
          Need to make changes or have questions about your appointment?
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="ghost"
            onClick={() => window.location.href = `tel:${location.phone}`}
          >
            📞 Call {location.phone}
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.location.href = `mailto:${location.email}?subject=Booking ${confirmationNumber}`}
          >
            ✉️ Email {location.email}
          </Button>
          
          {onNewBooking && (
            <Button
              variant="luxury"
              onClick={onNewBooking}
            >
              Book Another Appointment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};