import { AvailableDay, TimeSlot, Location, BusinessHours } from '@/types';

/**
 * Homer Jewelry Store Locations
 */
export const locations: Location[] = [
  {
    id: 'athens',
    name: 'Homer Athens Flagship',
    address: 'Voukourestiou 25',
    city: 'Athens',
    phone: '+30 210 361 4292',
    email: 'athens@homer.gr',
    timezone: 'Europe/Athens',
    coordinates: {
      lat: 37.9755,
      lng: 23.7348
    },
    image: '/images/locations/athens-store.jpg',
    businessHours: [
      { dayOfWeek: 1, openTime: '10:00', closeTime: '20:00' }, // Monday
      { dayOfWeek: 2, openTime: '10:00', closeTime: '20:00' }, // Tuesday
      { dayOfWeek: 3, openTime: '10:00', closeTime: '20:00' }, // Wednesday
      { dayOfWeek: 4, openTime: '10:00', closeTime: '20:00' }, // Thursday
      { dayOfWeek: 5, openTime: '10:00', closeTime: '20:00' }, // Friday
      { dayOfWeek: 6, openTime: '10:00', closeTime: '18:00' }, // Saturday
      { dayOfWeek: 0, openTime: '12:00', closeTime: '17:00' }  // Sunday
    ]
  },
  {
    id: 'southampton',
    name: 'Homer Southampton',
    address: '85 Jobs Lane',
    city: 'Southampton, NY',
    phone: '+1 631 283 6970',
    email: 'southampton@homer.com',
    timezone: 'America/New_York',
    coordinates: {
      lat: 40.8834,
      lng: -72.3896
    },
    image: '/images/locations/southampton-store.jpg',
    businessHours: [
      { dayOfWeek: 1, openTime: '10:00', closeTime: '18:00' }, // Monday
      { dayOfWeek: 2, openTime: '10:00', closeTime: '18:00' }, // Tuesday
      { dayOfWeek: 3, openTime: '10:00', closeTime: '18:00' }, // Wednesday
      { dayOfWeek: 4, openTime: '10:00', closeTime: '19:00' }, // Thursday
      { dayOfWeek: 5, openTime: '10:00', closeTime: '19:00' }, // Friday
      { dayOfWeek: 6, openTime: '10:00', closeTime: '19:00' }, // Saturday
      { dayOfWeek: 0, openTime: '11:00', closeTime: '17:00' }  // Sunday
    ]
  }
];

/**
 * Standard time slots for appointments (30-minute intervals)
 */
const generateTimeSlots = (startTime: string, endTime: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const start = new Date(`2024-01-01T${startTime}:00`);
  const end = new Date(`2024-01-01T${endTime}:00`);
  
  let current = new Date(start);
  let slotId = 1;
  
  while (current < end) {
    const next = new Date(current);
    next.setMinutes(current.getMinutes() + 30);
    
    if (next <= end) {
      slots.push({
        id: `slot-${slotId}`,
        startTime: current.toTimeString().slice(0, 5),
        endTime: next.toTimeString().slice(0, 5),
        available: true
      });
    }
    
    current = next;
    slotId++;
  }
  
  return slots;
};

/**
 * Generate available days for the next 60 days
 * Excludes Sundays for Athens location and includes holiday handling
 */
export const generateAvailability = (locationId: string): AvailableDay[] => {
  const location = locations.find(loc => loc.id === locationId);
  if (!location) return [];
  
  const availableDays: AvailableDay[] = [];
  const today = new Date();
  
  // Greek holidays 2024-2025 (major ones)
  const holidays = new Set([
    '2024-01-01', // New Year
    '2024-01-06', // Epiphany
    '2024-03-25', // Independence Day
    '2024-05-01', // Labor Day
    '2024-08-15', // Assumption
    '2024-10-28', // Ohi Day
    '2024-12-25', // Christmas
    '2024-12-26', // Boxing Day
    '2025-01-01', // New Year
    '2025-01-06', // Epiphany
    '2025-03-25', // Independence Day
    '2025-05-01', // Labor Day
    '2025-08-15', // Assumption
    '2025-10-28', // Ohi Day
    '2025-12-25', // Christmas
    '2025-12-26'  // Boxing Day
  ]);
  
  for (let i = 1; i <= 60; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayOfWeek = date.getDay();
    const dateString = date.toISOString().split('T')[0];
    const isHoliday = holidays.has(dateString);
    
    // Find business hours for this day of week
    const businessHour = location.businessHours.find(bh => bh.dayOfWeek === dayOfWeek);
    
    if (businessHour && !businessHour.closed && !isHoliday) {
      const timeSlots = generateTimeSlots(businessHour.openTime, businessHour.closeTime);
      
      // Randomly make some slots unavailable to simulate real bookings
      timeSlots.forEach((slot, index) => {
        if (Math.random() < 0.15) { // 15% chance of being booked
          slot.available = false;
        }
      });
      
      availableDays.push({
        date: dateString,
        timeSlots,
        isHoliday: false
      });
    } else if (isHoliday && businessHour && !businessHour.closed) {
      // Holiday with special note
      availableDays.push({
        date: dateString,
        timeSlots: [],
        isHoliday: true,
        specialNote: 'Closed for holiday'
      });
    }
  }
  
  return availableDays;
};

/**
 * Get location by ID
 */
export const getLocationById = (id: string): Location | undefined => {
  return locations.find(location => location.id === id);
};

/**
 * Get business hours for a specific location and day
 */
export const getBusinessHours = (locationId: string, dayOfWeek: number): BusinessHours | undefined => {
  const location = getLocationById(locationId);
  return location?.businessHours.find(bh => bh.dayOfWeek === dayOfWeek);
};

/**
 * Check if a specific date and time is available
 */
export const isTimeSlotAvailable = (
  locationId: string, 
  date: string, 
  timeSlotId: string
): boolean => {
  const availability = generateAvailability(locationId);
  const day = availability.find(d => d.date === date);
  if (!day) return false;
  
  const timeSlot = day.timeSlots.find(ts => ts.id === timeSlotId);
  return timeSlot?.available ?? false;
};

/**
 * Get available time slots for a specific date and location
 */
export const getAvailableTimeSlots = (
  locationId: string, 
  date: string
): TimeSlot[] => {
  const availability = generateAvailability(locationId);
  const day = availability.find(d => d.date === date);
  return day?.timeSlots.filter(slot => slot.available) ?? [];
};

/**
 * Get next available appointment slot
 */
export const getNextAvailableSlot = (locationId: string): { date: string; timeSlot: TimeSlot } | null => {
  const availability = generateAvailability(locationId);
  
  for (const day of availability) {
    const availableSlot = day.timeSlots.find(slot => slot.available);
    if (availableSlot) {
      return {
        date: day.date,
        timeSlot: availableSlot
      };
    }
  }
  
  return null;
};