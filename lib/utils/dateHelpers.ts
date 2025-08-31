/**
 * Date utility functions for the booking system
 * Handles formatting, validation, and timezone operations
 */

import { BusinessHours } from '@/types';

/**
 * Format date for display
 */
export const formatDate = (date: string | Date, format: 'short' | 'long' | 'full' = 'long'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
  };
  
  switch (format) {
    case 'short':
      options.month = 'short';
      options.day = 'numeric';
      break;
    case 'long':
      options.weekday = 'long';
      options.month = 'long';
      options.day = 'numeric';
      options.year = 'numeric';
      break;
    case 'full':
      options.weekday = 'long';
      options.month = 'long';
      options.day = 'numeric';
      options.year = 'numeric';
      break;
  }
  
  return dateObj.toLocaleDateString('en-US', options);
};

/**
 * Format time for display
 */
export const formatTime = (time: string, format: '12h' | '24h' = '12h'): string => {
  const [hours, minutes] = time.split(':').map(Number);
  
  if (format === '24h') {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Get formatted time range
 */
export const formatTimeRange = (startTime: string, endTime: string): string => {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

/**
 * Check if a date is today
 */
export const isToday = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is tomorrow
 */
export const isTomorrow = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return (
    dateObj.getDate() === tomorrow.getDate() &&
    dateObj.getMonth() === tomorrow.getMonth() &&
    dateObj.getFullYear() === tomorrow.getFullYear()
  );
};

/**
 * Check if a date is in the past
 */
export const isPast = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  return dateObj < now;
};

/**
 * Check if a date is within business hours
 */
export const isWithinBusinessHours = (
  date: string | Date, 
  time: string, 
  businessHours: BusinessHours[]
): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const dayOfWeek = dateObj.getDay();
  
  const hours = businessHours.find(bh => bh.dayOfWeek === dayOfWeek);
  if (!hours || hours.closed) return false;
  
  const [timeHours, timeMinutes] = time.split(':').map(Number);
  const [openHours, openMinutes] = hours.openTime.split(':').map(Number);
  const [closeHours, closeMinutes] = hours.closeTime.split(':').map(Number);
  
  const timeInMinutes = timeHours * 60 + timeMinutes;
  const openInMinutes = openHours * 60 + openMinutes;
  const closeInMinutes = closeHours * 60 + closeMinutes;
  
  return timeInMinutes >= openInMinutes && timeInMinutes <= closeInMinutes;
};

/**
 * Get day of week name
 */
export const getDayName = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Get relative date string (e.g., "Today", "Tomorrow", "Next Monday")
 */
export const getRelativeDate = (date: string | Date): string => {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = dateObj.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 7) {
    return `This ${getDayName(date)}`;
  } else if (diffDays <= 14) {
    return `Next ${getDayName(date)}`;
  }
  
  return formatDate(date, 'short');
};

/**
 * Add minutes to a time string
 */
export const addMinutesToTime = (time: string, minutes: number): string => {
  const [hours, mins] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, mins + minutes);
  
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

/**
 * Get duration between two times in minutes
 */
export const getTimeDuration = (startTime: string, endTime: string): number => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  const startInMinutes = startHours * 60 + startMinutes;
  const endInMinutes = endHours * 60 + endMinutes;
  
  return endInMinutes - startInMinutes;
};

/**
 * Validate date string format (YYYY-MM-DD)
 */
export const isValidDateString = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date.toISOString().split('T')[0] === dateString;
};

/**
 * Validate time string format (HH:MM)
 */
export const isValidTimeString = (timeString: string): boolean => {
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(timeString);
};

/**
 * Convert date to ISO string for form inputs
 */
export const toDateInputValue = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
};

/**
 * Get minimum bookable date (next business day)
 */
export const getMinimumBookableDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toDateInputValue(tomorrow);
};

/**
 * Get maximum bookable date (60 days from now)
 */
export const getMaximumBookableDate = (): string => {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  return toDateInputValue(maxDate);
};

/**
 * Check if date is bookable (within valid range)
 */
export const isBookableDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const minDate = new Date(getMinimumBookableDate());
  const maxDate = new Date(getMaximumBookableDate());
  
  return dateObj >= minDate && dateObj <= maxDate;
};