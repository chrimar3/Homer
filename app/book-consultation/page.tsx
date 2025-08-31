'use client';

import React, { useState } from 'react';
import { useBooking } from '@/lib/hooks/useBooking';
import { consultationTypes } from '@/data/consultationTypes';
import { locations } from '@/data/availability';

// Import all booking components
import { ConsultationTypeSelector } from '@/components/booking/ConsultationType';
import { LocationSelector } from '@/components/booking/LocationSelector';
import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { BookingForm } from '@/components/booking/BookingForm';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';

import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';

/**
 * Main booking page component that handles the complete appointment booking flow
 * Steps: 1) Consultation Type -> 2) Location -> 3) Date & Time -> 4) Customer Info -> 5) Review -> 6) Confirmation
 */
export default function BookConsultationPage() {
  const booking = useBooking();
  const [confirmationNumber, setConfirmationNumber] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const steps = [
    'Select Service',
    'Choose Location', 
    'Pick Date & Time',
    'Your Information',
    'Review & Confirm'
  ];

  const handleNext = () => {
    booking.nextStep();
  };

  const handlePrevious = () => {
    booking.prevStep();
  };

  const handleSubmit = async () => {
    const result = await booking.submitBooking();
    
    if (result.success && result.confirmationNumber) {
      setConfirmationNumber(result.confirmationNumber);
      setShowConfirmation(true);
    } else {
      // Handle error case
      console.error('Booking submission failed:', result.error);
    }
  };

  const handleNewBooking = () => {
    booking.reset();
    setShowConfirmation(false);
    setConfirmationNumber('');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  // Show confirmation page
  if (showConfirmation && confirmationNumber && booking.selectedConsultationType && booking.selectedLocation && booking.selectedTimeSlot) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <BookingConfirmation
            confirmationNumber={confirmationNumber}
            formData={booking.formData as any}
            consultationType={booking.selectedConsultationType}
            location={booking.selectedLocation}
            timeSlot={booking.selectedTimeSlot}
            onNewBooking={handleNewBooking}
            onPrintReceipt={handlePrintReceipt}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-cinzel text-homer-black mb-4">
              Book Your Consultation
            </h1>
            <p className="text-homer-gray-600 max-w-2xl mx-auto">
              Schedule a personalized appointment with our expert team. From custom design to jewelry care, 
              we&apos;re here to bring your vision to life.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      ${index < booking.currentStep 
                        ? 'bg-green-500 text-white' 
                        : index === booking.currentStep
                        ? 'bg-homer-gold text-white'
                        : 'bg-gray-200 text-gray-500'
                      }
                    `}>
                      {index < booking.currentStep ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`
                      text-xs mt-2 text-center max-w-20
                      ${index <= booking.currentStep ? 'text-homer-black' : 'text-gray-500'}
                    `}>
                      {step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-12 h-0.5 mx-4
                      ${index < booking.currentStep ? 'bg-green-500' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {booking.isLoading ? (
            <div className="text-center py-20">
              <Loader size="lg" />
              <p className="text-homer-gray-600 mt-4">Loading...</p>
            </div>
          ) : (
            <>
              {/* Step Content */}
              <div className="mb-12">
                {booking.currentStep === 0 && (
                  <ConsultationTypeSelector
                    consultationTypes={consultationTypes}
                    selectedType={booking.selectedConsultationType}
                    onSelect={(type) => booking.setConsultationType(type.id)}
                  />
                )}

                {booking.currentStep === 1 && (
                  <LocationSelector
                    locations={locations}
                    selectedLocation={booking.selectedLocation}
                    onSelect={(location) => booking.setLocation(location.id)}
                  />
                )}

                {booking.currentStep === 2 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <BookingCalendar
                        availableDays={booking.availableDays}
                        selectedDate={booking.selectedDate}
                        onDateSelect={booking.setDate}
                      />
                    </div>
                    <div>
                      <TimeSlotPicker
                        timeSlots={booking.availableTimeSlots}
                        selectedSlot={booking.selectedTimeSlot}
                        onSlotSelect={booking.setTimeSlot}
                        selectedDate={booking.selectedDate}
                      />
                    </div>
                  </div>
                )}

                {booking.currentStep === 3 && (
                  <BookingForm
                    formData={booking.formData}
                    validation={booking.validation}
                    onUpdateData={booking.updateFormData}
                  />
                )}

                {booking.currentStep === 4 && booking.selectedConsultationType && booking.selectedLocation && booking.selectedTimeSlot && (
                  <BookingSummary
                    formData={booking.formData as any}
                    consultationType={booking.selectedConsultationType}
                    location={booking.selectedLocation}
                    timeSlot={booking.selectedTimeSlot}
                  />
                )}
              </div>

              {/* Error Message */}
              {booking.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{booking.error}</p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <div>
                  {booking.currentStep > 0 && (
                    <Button
                      variant="ghost"
                      onClick={handlePrevious}
                      leftIcon={
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      }
                    >
                      Previous
                    </Button>
                  )}
                </div>

                <div>
                  {booking.currentStep < steps.length - 1 ? (
                    <Button
                      variant="luxury"
                      onClick={handleNext}
                      disabled={!booking.isCurrentStepValid}
                      rightIcon={
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      }
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      variant="luxury"
                      onClick={handleSubmit}
                      disabled={!booking.validation.isValid}
                      loading={booking.isLoading}
                      size="lg"
                      leftIcon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      }
                    >
                      {booking.isLoading ? 'Booking...' : 'Confirm Booking'}
                    </Button>
                  )}
                </div>
              </div>

              {/* Step Summary for Review */}
              {booking.currentStep === 4 && (
                <div className="mt-8 text-center text-sm text-homer-gray-500">
                  <p>
                    By confirming this booking, you agree to our{' '}
                    <a href="/terms" className="text-homer-gold hover:text-homer-darkGold underline">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-homer-gold hover:text-homer-darkGold underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              )}

              {/* Booking Summary Sidebar for steps 2-4 */}
              {booking.currentStep >= 2 && booking.selectedConsultationType && booking.selectedLocation && (
                <div className="mt-12 lg:mt-0 lg:fixed lg:top-32 lg:right-8 lg:w-80">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-4">
                    <h3 className="font-semibold text-homer-black">Booking Summary</h3>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-homer-gray-600">Service:</span>
                        <span className="text-homer-black font-medium">
                          {booking.selectedConsultationType.name}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-homer-gray-600">Location:</span>
                        <span className="text-homer-black">
                          {booking.selectedLocation.city}
                        </span>
                      </div>
                      
                      {booking.selectedDate && (
                        <div className="flex justify-between">
                          <span className="text-homer-gray-600">Date:</span>
                          <span className="text-homer-black">
                            {new Date(booking.selectedDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      
                      {booking.selectedTimeSlot && (
                        <div className="flex justify-between">
                          <span className="text-homer-gray-600">Time:</span>
                          <span className="text-homer-black">
                            {booking.selectedTimeSlot.startTime}
                          </span>
                        </div>
                      )}
                      
                      <hr className="border-homer-gray-200" />
                      
                      <div className="flex justify-between">
                        <span className="font-semibold text-homer-black">Total:</span>
                        <span className="font-semibold text-homer-gold">
                          ${booking.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}