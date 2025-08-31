'use client';

import React, { useMemo } from 'react';
import { TimeSlot } from '@/types';
import { formatTime, formatTimeRange } from '@/lib/utils/dateHelpers';

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  selectedSlot?: TimeSlot;
  onSlotSelect: (slot: TimeSlot) => void;
  selectedDate?: string;
  className?: string;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  timeSlots,
  selectedSlot,
  onSlotSelect,
  selectedDate,
  className = ''
}) => {
  // Group time slots by time of day
  const groupedSlots = useMemo(() => {
    const morning = timeSlots.filter(slot => {
      const hour = parseInt(slot.startTime.split(':')[0]);
      return hour < 12;
    });
    
    const afternoon = timeSlots.filter(slot => {
      const hour = parseInt(slot.startTime.split(':')[0]);
      return hour >= 12 && hour < 17;
    });
    
    const evening = timeSlots.filter(slot => {
      const hour = parseInt(slot.startTime.split(':')[0]);
      return hour >= 17;
    });
    
    return { morning, afternoon, evening };
  }, [timeSlots]);

  const formatSelectedDate = (date?: string): string => {
    if (!date) return 'Select a date';
    
    const dateObj = new Date(date);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (dateObj.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (dateObj.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  if (!selectedDate) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="mb-4">
          <svg 
            className="w-16 h-16 text-homer-gray-300 mx-auto mb-4" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-cinzel text-homer-gray-500 mb-2">
          Select a Date First
        </h3>
        <p className="text-sm text-homer-gray-400">
          Choose a date from the calendar to view available time slots
        </p>
      </div>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="mb-4">
          <svg 
            className="w-16 h-16 text-homer-gray-300 mx-auto mb-4" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-cinzel text-homer-gray-500 mb-2">
          No Available Times
        </h3>
        <p className="text-sm text-homer-gray-400">
          All time slots are booked for {formatSelectedDate(selectedDate)}. Please choose a different date.
        </p>
      </div>
    );
  }

  const TimeSlotGroup: React.FC<{ title: string; slots: TimeSlot[]; icon: string }> = ({ 
    title, 
    slots, 
    icon 
  }) => {
    if (slots.length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-xl mr-3" role="img" aria-label={title}>
            {icon}
          </span>
          <h4 className="text-lg font-cinzel text-homer-black">
            {title}
          </h4>
          <span className="ml-2 text-sm text-homer-gray-500">
            ({slots.length} available)
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            
            return (
              <button
                key={slot.id}
                onClick={() => onSlotSelect(slot)}
                disabled={!slot.available}
                className={`
                  p-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isSelected
                    ? 'bg-homer-gold text-white ring-2 ring-homer-gold ring-offset-2 transform scale-105'
                    : slot.available
                    ? 'bg-white border-2 border-homer-gray-200 text-homer-gray-700 hover:border-homer-gold hover:text-homer-gold hover:bg-homer-gold/5 hover:transform hover:scale-105'
                    : 'bg-homer-gray-100 text-homer-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <div className="text-center">
                  <div className="font-semibold">
                    {formatTime(slot.startTime)}
                  </div>
                  {slot.price && (
                    <div className="text-xs mt-1 opacity-75">
                      +${slot.price}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-cinzel text-homer-black mb-2">
          Available Times
        </h3>
        <p className="text-homer-gray-600">
          Select your preferred time for <strong>{formatSelectedDate(selectedDate)}</strong>
        </p>
      </div>

      {/* Time Slot Groups */}
      <div>
        <TimeSlotGroup 
          title="Morning" 
          slots={groupedSlots.morning} 
          icon="🌅" 
        />
        
        <TimeSlotGroup 
          title="Afternoon" 
          slots={groupedSlots.afternoon} 
          icon="☀️" 
        />
        
        <TimeSlotGroup 
          title="Evening" 
          slots={groupedSlots.evening} 
          icon="🌆" 
        />
      </div>

      {/* Selected Time Summary */}
      {selectedSlot && (
        <div className="mt-8 p-4 bg-homer-gold/10 rounded-lg border border-homer-gold/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-homer-black mb-1">
                Selected Time
              </h4>
              <p className="text-homer-gray-700">
                {formatSelectedDate(selectedDate)} at {formatTimeRange(selectedSlot.startTime, selectedSlot.endTime)}
              </p>
            </div>
            <button
              onClick={() => onSlotSelect({} as TimeSlot)} // Clear selection
              className="text-homer-gold hover:text-homer-darkGold text-sm"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Helpful Information */}
      <div className="mt-8 space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg 
              className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                clipRule="evenodd" 
              />
            </svg>
            <div>
              <h5 className="font-medium text-blue-900 mb-1">
                Appointment Information
              </h5>
              <p className="text-sm text-blue-800">
                Please arrive 10 minutes early for your appointment. All time slots are in local time zone. 
                You&apos;ll receive a confirmation email with detailed instructions.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-homer-gray-500">
            Times shown are in the location&apos;s local timezone. 
            Need to reschedule? You can modify your appointment up to 24 hours in advance.
          </p>
        </div>
      </div>
    </div>
  );
};