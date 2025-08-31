/**
 * Booking utility functions for validation, formatting, and business logic
 */

import { BookingFormData, BookingValidation, ConsultationType, Location, TimeSlot } from '@/types';
import { isValidDateString, isValidTimeString, isBookableDate } from './dateHelpers';

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (international formats)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
};

/**
 * Validate booking form data
 */
export const validateBookingForm = (formData: Partial<BookingFormData>): BookingValidation => {
  const errors: { [K in keyof BookingFormData]?: string } = {};

  // Customer Information
  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(formData.phone.trim())) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Booking Details
  if (!formData.consultationType) {
    errors.consultationType = 'Please select a consultation type';
  }

  if (!formData.location) {
    errors.location = 'Please select a location';
  }

  if (!formData.date) {
    errors.date = 'Please select a date';
  } else if (!isValidDateString(formData.date)) {
    errors.date = 'Please enter a valid date';
  } else if (!isBookableDate(formData.date)) {
    errors.date = 'Selected date is not available for booking';
  }

  if (!formData.timeSlot) {
    errors.timeSlot = 'Please select a time slot';
  }

  if (!formData.communicationType) {
    errors.communicationType = 'Please select a communication type';
  }

  // Special requests validation (optional but with length limit)
  if (formData.specialRequests && formData.specialRequests.length > 500) {
    errors.specialRequests = 'Special requests must be less than 500 characters';
  }

  // Recurring frequency validation
  if (formData.recurring && !formData.recurringFrequency) {
    errors.recurringFrequency = 'Please select frequency for recurring appointments';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Calculate total booking price
 */
export const calculateBookingPrice = (
  consultationType: ConsultationType,
  location: Location,
  isRecurring: boolean = false
): number => {
  let basePrice = consultationType.price;

  // Location-based pricing adjustments (example: Southampton is 10% more expensive)
  if (location.id === 'southampton') {
    basePrice *= 1.1;
  }

  // Recurring appointment discount (5% off)
  if (isRecurring) {
    basePrice *= 0.95;
  }

  return Math.round(basePrice * 100) / 100; // Round to 2 decimal places
};

/**
 * Generate booking confirmation number
 */
export const generateConfirmationNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `HOMER-${timestamp}-${random}`;
};

/**
 * Generate cancellation token
 */
export const generateCancellationToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Format booking summary for display
 */
export const formatBookingSummary = (
  formData: BookingFormData,
  consultationType: ConsultationType,
  location: Location,
  timeSlot: TimeSlot
): {
  customer: string;
  service: string;
  dateTime: string;
  location: string;
  duration: string;
  price: string;
  communication: string;
} => {
  const totalPrice = calculateBookingPrice(consultationType, location, formData.recurring);
  
  return {
    customer: `${formData.firstName} ${formData.lastName}`,
    service: consultationType.name,
    dateTime: `${new Date(formData.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })} at ${timeSlot.startTime}`,
    location: location.name,
    duration: `${consultationType.duration} minutes`,
    price: `$${totalPrice.toFixed(2)}`,
    communication: formData.communicationType
  };
};

/**
 * Check for booking conflicts
 */
export const hasBookingConflict = (
  newBooking: { date: string; timeSlot: string; location: string },
  existingBookings: { date: string; timeSlot: string; location: string }[]
): boolean => {
  return existingBookings.some(booking => 
    booking.date === newBooking.date &&
    booking.timeSlot === newBooking.timeSlot &&
    booking.location === newBooking.location
  );
};

/**
 * Get booking status color for UI
 */
export const getBookingStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'confirmed':
      return 'text-green-600 bg-green-100';
    case 'completed':
      return 'text-blue-600 bg-blue-100';
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    case 'rescheduled':
      return 'text-purple-600 bg-purple-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Get business days between two dates
 */
export const getBusinessDaysBetween = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};

/**
 * Generate email template data
 */
export const generateEmailTemplateData = (
  formData: BookingFormData,
  consultationType: ConsultationType,
  location: Location,
  confirmationNumber: string
) => {
  return {
    customerName: `${formData.firstName} ${formData.lastName}`,
    customerEmail: formData.email,
    confirmationNumber,
    consultationType: consultationType.name,
    date: new Date(formData.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: formData.timeSlot,
    location: location.name,
    locationAddress: `${location.address}, ${location.city}`,
    locationPhone: location.phone,
    duration: `${consultationType.duration} minutes`,
    price: formatCurrency(calculateBookingPrice(consultationType, location, formData.recurring)),
    specialRequests: formData.specialRequests || 'None',
    communicationType: formData.communicationType,
    isRecurring: formData.recurring || false,
    recurringFrequency: formData.recurringFrequency || null
  };
};

/**
 * Get suggested alternative time slots
 */
export const getSuggestedAlternatives = (
  requestedDate: string,
  unavailableSlot: string,
  availableSlots: TimeSlot[]
): TimeSlot[] => {
  // Return up to 3 alternative slots on the same date
  return availableSlots.slice(0, 3);
};

/**
 * Validate booking availability in real-time
 */
export const validateBookingAvailability = async (
  locationId: string,
  date: string,
  timeSlotId: string
): Promise<{ available: boolean; reason?: string }> => {
  // This would typically make an API call to check real-time availability
  // For now, return a mock validation
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock some unavailable slots
  const mockUnavailableSlots = ['slot-1', 'slot-5', 'slot-10'];
  
  if (mockUnavailableSlots.includes(timeSlotId)) {
    return {
      available: false,
      reason: 'This time slot has been recently booked by another customer'
    };
  }
  
  return { available: true };
};