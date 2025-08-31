'use client';

import React, { useState, useMemo } from 'react';
import { AvailableDay } from '@/types';
import { formatDate, getDayName, isToday, isTomorrow } from '@/lib/utils/dateHelpers';

interface BookingCalendarProps {
  availableDays: AvailableDay[];
  selectedDate?: string;
  onDateSelect: (date: string) => void;
  className?: string;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  availableDays,
  selectedDate,
  onDateSelect,
  className = ''
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar data
  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday
    
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay())); // End on Saturday
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      const dateString = current.toISOString().split('T')[0];
      const availableDay = availableDays.find(day => day.date === dateString);
      const isCurrentMonth = current.getMonth() === month;
      const isPast = current < new Date();
      const hasSlots = availableDay && availableDay.timeSlots.some(slot => slot.available);
      
      days.push({
        date: new Date(current),
        dateString,
        isCurrentMonth,
        isPast,
        isAvailable: hasSlots && !isPast,
        isHoliday: availableDay?.isHoliday,
        specialNote: availableDay?.specialNote,
        availableSlots: availableDay?.timeSlots.filter(slot => slot.available).length || 0
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [currentMonth, availableDays]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getDayLabel = (dateString: string): string => {
    if (isToday(dateString)) return 'Today';
    if (isTomorrow(dateString)) return 'Tomorrow';
    return '';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-homer-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-homer-gray-200">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-homer-gold/10 rounded-full transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
        
        <h2 className="text-xl font-cinzel text-homer-black">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-homer-gold/10 rounded-full transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5 text-homer-gold" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>

      {/* Calendar */}
      <div className="p-6">
        {/* Day names header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center py-2">
              <span className="text-sm font-medium text-homer-gray-600">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarData.map((day, index) => {
            const dayLabel = getDayLabel(day.dateString);
            const isSelected = selectedDate === day.dateString;
            
            return (
              <button
                key={index}
                onClick={() => day.isAvailable && onDateSelect(day.dateString)}
                disabled={!day.isAvailable}
                className={`
                  relative aspect-square p-2 text-sm rounded-lg transition-all duration-200
                  ${!day.isCurrentMonth 
                    ? 'text-homer-gray-300' 
                    : day.isAvailable
                    ? 'text-homer-black hover:bg-homer-gold hover:text-white cursor-pointer'
                    : day.isPast
                    ? 'text-homer-gray-300 cursor-not-allowed'
                    : day.isHoliday
                    ? 'text-homer-gray-400 cursor-not-allowed'
                    : 'text-homer-gray-400 cursor-not-allowed'
                  }
                  ${isSelected 
                    ? 'bg-homer-gold text-white ring-2 ring-homer-gold ring-offset-2' 
                    : day.isAvailable 
                    ? 'hover:bg-homer-gold/10' 
                    : ''
                  }
                `}
                title={day.specialNote || (day.isAvailable ? `${day.availableSlots} slots available` : 'No availability')}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="font-medium">
                    {day.date.getDate()}
                  </span>
                  {dayLabel && (
                    <span className="text-xs opacity-75 mt-1">
                      {dayLabel}
                    </span>
                  )}
                </div>

                {/* Availability indicator */}
                {day.isAvailable && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
                
                {/* Holiday indicator */}
                {day.isHoliday && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-homer-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-homer-gold rounded-full"></div>
            <span className="text-homer-gray-600">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-homer-gray-600">Holiday/Closed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-homer-gray-300 rounded-full"></div>
            <span className="text-homer-gray-600">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Quick Date Selection */}
      <div className="px-6 pb-6 border-t border-homer-gray-100 pt-4">
        <div className="flex flex-wrap gap-2">
          {availableDays.slice(0, 5).map((day) => {
            const dayLabel = getDayLabel(day.dateString);
            const availableSlots = day.timeSlots.filter(slot => slot.available).length;
            
            if (availableSlots === 0) return null;
            
            return (
              <button
                key={day.date}
                onClick={() => onDateSelect(day.date)}
                className={`
                  px-3 py-2 rounded-full text-sm transition-all duration-200
                  ${selectedDate === day.date
                    ? 'bg-homer-gold text-white'
                    : 'bg-homer-gold/10 text-homer-gold hover:bg-homer-gold/20'
                  }
                `}
              >
                {dayLabel || getDayName(day.date).slice(0, 3)} ({availableSlots} slots)
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};