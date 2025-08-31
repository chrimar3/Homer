'use client';

import React, { useState, useEffect } from 'react';
import { Location, BusinessHours } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface BusinessHoursDisplayProps {
  locations: Location[];
  className?: string;
}

export const BusinessHoursDisplay: React.FC<BusinessHoursDisplayProps> = ({
  locations,
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getCurrentStatus = (location: Location): {
    isOpen: boolean;
    status: string;
    nextChange?: string;
  } => {
    // For simplicity, using local time. In production, you'd use the location's timezone
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const todayHours = location.businessHours.find(bh => bh.dayOfWeek === currentDay);
    
    if (!todayHours || todayHours.closed) {
      // Find next open day
      let nextDay = (currentDay + 1) % 7;
      let daysToCheck = 0;
      
      while (daysToCheck < 7) {
        const nextDayHours = location.businessHours.find(bh => bh.dayOfWeek === nextDay);
        if (nextDayHours && !nextDayHours.closed) {
          const nextDayName = daysOfWeek[nextDay];
          return {
            isOpen: false,
            status: 'Closed Today',
            nextChange: `Opens ${nextDay === (currentDay + 1) % 7 ? 'tomorrow' : nextDayName} at ${nextDayHours.openTime}`
          };
        }
        nextDay = (nextDay + 1) % 7;
        daysToCheck++;
      }
      
      return {
        isOpen: false,
        status: 'Closed',
        nextChange: 'See schedule for next opening'
      };
    }

    const [openHour, openMinute] = todayHours.openTime.split(':').map(Number);
    const [closeHour, closeMinute] = todayHours.closeTime.split(':').map(Number);
    const openTimeInMinutes = openHour * 60 + openMinute;
    const closeTimeInMinutes = closeHour * 60 + closeMinute;

    if (currentTimeInMinutes < openTimeInMinutes) {
      const minutesUntilOpen = openTimeInMinutes - currentTimeInMinutes;
      const hoursUntilOpen = Math.floor(minutesUntilOpen / 60);
      const remainingMinutes = minutesUntilOpen % 60;
      
      let timeUntilOpen = '';
      if (hoursUntilOpen > 0) {
        timeUntilOpen = `${hoursUntilOpen}h ${remainingMinutes}m`;
      } else {
        timeUntilOpen = `${remainingMinutes}m`;
      }
      
      return {
        isOpen: false,
        status: `Closed - Opens at ${todayHours.openTime}`,
        nextChange: `Opens in ${timeUntilOpen}`
      };
    } else if (currentTimeInMinutes < closeTimeInMinutes) {
      const minutesUntilClose = closeTimeInMinutes - currentTimeInMinutes;
      const hoursUntilClose = Math.floor(minutesUntilClose / 60);
      const remainingMinutes = minutesUntilClose % 60;
      
      let timeUntilClose = '';
      if (hoursUntilClose > 0) {
        timeUntilClose = `${hoursUntilClose}h ${remainingMinutes}m`;
      } else {
        timeUntilClose = `${remainingMinutes}m`;
      }
      
      return {
        isOpen: true,
        status: `Open - Closes at ${todayHours.closeTime}`,
        nextChange: minutesUntilClose <= 60 ? `Closing in ${timeUntilClose}` : undefined
      };
    } else {
      // Find next open day
      let nextDay = (currentDay + 1) % 7;
      let daysToCheck = 0;
      
      while (daysToCheck < 7) {
        const nextDayHours = location.businessHours.find(bh => bh.dayOfWeek === nextDay);
        if (nextDayHours && !nextDayHours.closed) {
          const nextDayName = daysOfWeek[nextDay];
          return {
            isOpen: false,
            status: 'Closed',
            nextChange: `Opens ${nextDay === (currentDay + 1) % 7 ? 'tomorrow' : nextDayName} at ${nextDayHours.openTime}`
          };
        }
        nextDay = (nextDay + 1) % 7;
        daysToCheck++;
      }
      
      return {
        isOpen: false,
        status: 'Closed',
        nextChange: 'See schedule for next opening'
      };
    }
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getHoursDisplay = (businessHours: BusinessHours[]): { day: string; hours: string; isToday: boolean }[] => {
    const today = new Date().getDay();
    
    return daysOfWeek.map((day, index) => {
      const dayHours = businessHours.find(bh => bh.dayOfWeek === index);
      const hoursText = dayHours && !dayHours.closed 
        ? `${formatTime(dayHours.openTime)} - ${formatTime(dayHours.closeTime)}`
        : 'Closed';
      
      return {
        day: day,
        hours: hoursText,
        isToday: index === today
      };
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-cinzel text-homer-black mb-4">
          Store Hours
        </h2>
        <p className="text-homer-gray-600">
          Visit us during these hours or schedule an appointment for personalized service
        </p>
      </div>

      {/* Current Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location) => {
          const status = getCurrentStatus(location);
          
          return (
            <Card key={location.id} variant="outlined" padding="lg" className="text-center">
              <div className="mb-4">
                <h3 className="text-xl font-cinzel text-homer-black mb-2">
                  {location.name}
                </h3>
                <Badge 
                  variant={status.isOpen ? 'success' : 'warning'} 
                  size="lg"
                  className="mb-2"
                >
                  {status.isOpen ? '🟢 Open Now' : '🔴 Closed'}
                </Badge>
                <p className="text-homer-gray-700 text-sm">
                  {status.status}
                </p>
                {status.nextChange && (
                  <p className="text-homer-gold text-sm font-medium mt-1">
                    {status.nextChange}
                  </p>
                )}
              </div>
              
              <div className="text-xs text-homer-gray-500">
                Current time: {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: location.timezone
                })} ({location.timezone.split('/')[1]?.replace('_', ' ')})
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detailed Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {locations.map((location) => {
          const hoursDisplay = getHoursDisplay(location.businessHours);
          
          return (
            <Card key={location.id} variant="luxury" padding="xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-cinzel text-homer-black mb-2">
                  {location.name}
                </h3>
                <p className="text-homer-gray-600">
                  {location.address}, {location.city}
                </p>
              </div>

              <div className="space-y-3">
                {hoursDisplay.map((dayInfo) => (
                  <div 
                    key={dayInfo.day}
                    className={`flex justify-between items-center py-2 px-4 rounded-lg transition-colors ${
                      dayInfo.isToday 
                        ? 'bg-homer-gold/10 border border-homer-gold/20' 
                        : 'hover:bg-homer-gray-50'
                    }`}
                  >
                    <span className={`font-medium ${
                      dayInfo.isToday ? 'text-homer-gold' : 'text-homer-black'
                    }`}>
                      {dayInfo.day}
                      {dayInfo.isToday && (
                        <Badge variant="success" size="xs" className="ml-2">
                          Today
                        </Badge>
                      )}
                    </span>
                    <span className={`text-sm ${
                      dayInfo.hours === 'Closed' 
                        ? 'text-homer-gray-400' 
                        : dayInfo.isToday 
                        ? 'text-homer-gold font-medium' 
                        : 'text-homer-gray-700'
                    }`}>
                      {dayInfo.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Special Notes */}
              <div className="mt-6 pt-4 border-t border-homer-gray-200">
                <div className="text-xs text-homer-gray-500 space-y-1">
                  <p>• Appointments available outside regular hours</p>
                  <p>• Holiday hours may vary</p>
                  <p>• Virtual consultations available 24/7</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => window.location.href = `/book-consultation?location=${location.id}`}
                  className="flex-1 bg-homer-gold text-white py-2 px-4 rounded-lg hover:bg-homer-darkGold transition-colors text-sm font-medium"
                >
                  📅 Book Appointment
                </button>
                <button 
                  onClick={() => window.location.href = `tel:${location.phone}`}
                  className="flex-1 bg-white border border-homer-gold text-homer-gold py-2 px-4 rounded-lg hover:bg-homer-gold hover:text-white transition-colors text-sm font-medium"
                >
                  📞 Call Store
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="text-center mb-4">
          <h4 className="text-lg font-cinzel text-blue-900 mb-2">
            Flexible Appointment Options
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-blue-600 text-2xl mb-2">🕐</div>
            <h5 className="font-semibold text-blue-900 mb-1">Extended Hours</h5>
            <p className="text-blue-700 text-sm">
              Book appointments up to 1 hour before/after regular hours
            </p>
          </div>
          
          <div>
            <div className="text-blue-600 text-2xl mb-2">📅</div>
            <h5 className="font-semibold text-blue-900 mb-1">Weekend Service</h5>
            <p className="text-blue-700 text-sm">
              Saturday appointments available at both locations
            </p>
          </div>
          
          <div>
            <div className="text-blue-600 text-2xl mb-2">💻</div>
            <h5 className="font-semibold text-blue-900 mb-1">Virtual Available</h5>
            <p className="text-blue-700 text-sm">
              Online consultations available 24/7 by appointment
            </p>
          </div>
        </div>
      </div>

      {/* Time Zone Information */}
      <div className="text-center text-sm text-homer-gray-500">
        <p>
          <strong>Athens:</strong> Eastern European Time (EET/EEST) • 
          <strong className="ml-2">Southampton:</strong> Eastern Standard Time (EST/EDT)
        </p>
        <p className="mt-1">
          All appointments are scheduled in the respective location&apos;s local time
        </p>
      </div>
    </div>
  );
};