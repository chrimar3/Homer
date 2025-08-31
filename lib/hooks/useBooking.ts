'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  BookingState, 
  BookingFormData, 
  ConsultationType, 
  Location, 
  TimeSlot, 
  AvailableDay 
} from '@/types';
import { 
  validateBookingForm, 
  calculateBookingPrice, 
  generateConfirmationNumber,
  validateBookingAvailability 
} from '@/lib/utils/bookingHelpers';
import { generateAvailability, getLocationById, getConsultationTypeById } from '@/data/availability';
import { consultationTypes } from '@/data/consultationTypes';

/**
 * Custom hook for managing booking state and operations
 */
export const useBooking = () => {
  const [state, setState] = useState<BookingState>({
    currentStep: 0,
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      consultationType: '',
      location: '',
      date: '',
      timeSlot: '',
      communicationType: 'in-person',
      specialRequests: '',
      recurring: false,
      emailConfirmation: true,
      smsConfirmation: false,
      reminderPreferences: {
        email24h: true,
        sms1h: false
      }
    },
    availableDays: [],
    isLoading: false,
    validation: { isValid: false, errors: {} }
  });

  /**
   * Update form data
   */
  const updateFormData = useCallback((updates: Partial<BookingFormData>) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
      validation: validateBookingForm({ ...prev.formData, ...updates })
    }));
  }, []);

  /**
   * Set selected consultation type
   */
  const setConsultationType = useCallback((consultationTypeId: string) => {
    const consultationType = consultationTypes.find(ct => ct.id === consultationTypeId);
    if (consultationType) {
      setState(prev => ({
        ...prev,
        selectedConsultationType: consultationType,
        formData: { ...prev.formData, consultationType: consultationTypeId }
      }));
    }
  }, []);

  /**
   * Set selected location and load availability
   */
  const setLocation = useCallback(async (locationId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));
    
    try {
      const location = getLocationById(locationId);
      if (location) {
        const availability = generateAvailability(locationId);
        
        setState(prev => ({
          ...prev,
          selectedLocation: location,
          availableDays: availability,
          formData: { ...prev.formData, location: locationId },
          isLoading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to load availability data',
        isLoading: false
      }));
    }
  }, []);

  /**
   * Set selected date
   */
  const setDate = useCallback((date: string) => {
    setState(prev => ({
      ...prev,
      selectedDate: date,
      selectedTimeSlot: undefined,
      formData: { ...prev.formData, date, timeSlot: '' }
    }));
  }, []);

  /**
   * Set selected time slot with real-time validation
   */
  const setTimeSlot = useCallback(async (timeSlot: TimeSlot) => {
    if (!state.selectedLocation || !state.selectedDate) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const validation = await validateBookingAvailability(
        state.selectedLocation.id,
        state.selectedDate,
        timeSlot.id
      );

      if (validation.available) {
        setState(prev => ({
          ...prev,
          selectedTimeSlot: timeSlot,
          formData: { ...prev.formData, timeSlot: timeSlot.id },
          isLoading: false,
          error: undefined
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: validation.reason || 'Selected time slot is no longer available',
          isLoading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to validate time slot availability',
        isLoading: false
      }));
    }
  }, [state.selectedLocation, state.selectedDate]);

  /**
   * Navigate to next step
   */
  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4) // Assuming 5 steps (0-4)
    }));
  }, []);

  /**
   * Navigate to previous step
   */
  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  }, []);

  /**
   * Go to specific step
   */
  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, 4))
    }));
  }, []);

  /**
   * Calculate total price
   */
  const getTotalPrice = useCallback((): number => {
    if (!state.selectedConsultationType || !state.selectedLocation) return 0;
    
    return calculateBookingPrice(
      state.selectedConsultationType,
      state.selectedLocation,
      state.formData.recurring
    );
  }, [state.selectedConsultationType, state.selectedLocation, state.formData.recurring]);

  /**
   * Get available time slots for selected date
   */
  const getAvailableTimeSlots = useCallback((): TimeSlot[] => {
    if (!state.selectedDate || !state.availableDays) return [];
    
    const availableDay = state.availableDays.find(day => day.date === state.selectedDate);
    return availableDay?.timeSlots.filter(slot => slot.available) || [];
  }, [state.selectedDate, state.availableDays]);

  /**
   * Check if current step is valid
   */
  const isCurrentStepValid = useCallback((): boolean => {
    const { currentStep, formData, selectedConsultationType, selectedLocation, selectedDate, selectedTimeSlot } = state;
    
    switch (currentStep) {
      case 0: // Consultation type selection
        return !!selectedConsultationType;
      case 1: // Location selection
        return !!selectedLocation;
      case 2: // Date and time selection
        return !!selectedDate && !!selectedTimeSlot;
      case 3: // Customer information
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 4: // Review and confirmation
        return state.validation.isValid;
      default:
        return false;
    }
  }, [state]);

  /**
   * Submit booking
   */
  const submitBooking = useCallback(async (): Promise<{ success: boolean; confirmationNumber?: string; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Validate form one final time
      const validation = validateBookingForm(state.formData as BookingFormData);
      if (!validation.isValid) {
        setState(prev => ({ ...prev, validation, isLoading: false }));
        return { success: false, error: 'Please fix form errors before submitting' };
      }

      // Generate confirmation number
      const confirmationNumber = generateConfirmationNumber();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically make an API call to save the booking
      console.log('Booking submitted:', {
        ...state.formData,
        consultationType: state.selectedConsultationType,
        location: state.selectedLocation,
        timeSlot: state.selectedTimeSlot,
        totalPrice: getTotalPrice(),
        confirmationNumber
      });

      setState(prev => ({ ...prev, isLoading: false }));
      
      return { success: true, confirmationNumber };
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to submit booking. Please try again.',
        isLoading: false 
      }));
      return { success: false, error: 'Failed to submit booking. Please try again.' };
    }
  }, [state.formData, state.selectedConsultationType, state.selectedLocation, state.selectedTimeSlot, getTotalPrice]);

  /**
   * Reset booking state
   */
  const reset = useCallback(() => {
    setState({
      currentStep: 0,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        consultationType: '',
        location: '',
        date: '',
        timeSlot: '',
        communicationType: 'in-person',
        specialRequests: '',
        recurring: false,
        emailConfirmation: true,
        smsConfirmation: false,
        reminderPreferences: {
          email24h: true,
          sms1h: false
        }
      },
      availableDays: [],
      isLoading: false,
      validation: { isValid: false, errors: {} }
    });
  }, []);

  /**
   * Auto-validate form when data changes
   */
  useEffect(() => {
    const validation = validateBookingForm(state.formData);
    setState(prev => ({ ...prev, validation }));
  }, [state.formData]);

  return {
    // State
    ...state,
    
    // Computed values
    totalPrice: getTotalPrice(),
    availableTimeSlots: getAvailableTimeSlots(),
    isCurrentStepValid: isCurrentStepValid(),
    
    // Actions
    updateFormData,
    setConsultationType,
    setLocation,
    setDate,
    setTimeSlot,
    nextStep,
    prevStep,
    goToStep,
    submitBooking,
    reset
  };
};