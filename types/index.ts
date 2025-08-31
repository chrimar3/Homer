import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, HTMLAttributes } from 'react';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Size variants used across components
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Color variants for the luxury theme
export type ColorVariant = 'primary' | 'secondary' | 'luxury' | 'ghost' | 'link' | 'success' | 'warning' | 'error' | 'info';

// Button specific types
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>, BaseComponentProps {
  variant?: ColorVariant;
  size?: SizeVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Icon button specific types
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>, BaseComponentProps {
  variant?: ColorVariant;
  size?: SizeVariant;
  loading?: boolean;
  disabled?: boolean;
  icon: ReactNode;
  'aria-label': string; // Required for accessibility
}

// Input field types
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseComponentProps {
  size?: SizeVariant;
  variant?: 'default' | 'luxury' | 'error';
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// Textarea types
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseComponentProps {
  size?: SizeVariant;
  variant?: 'default' | 'luxury' | 'error';
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

// Select dropdown types
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, BaseComponentProps {
  size?: SizeVariant;
  variant?: 'default' | 'luxury' | 'error';
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

// Checkbox types
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseComponentProps {
  size?: SizeVariant;
  variant?: 'default' | 'luxury';
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

// Radio button types
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseComponentProps {
  size?: SizeVariant;
  variant?: 'default' | 'luxury';
  label?: string;
  description?: string;
  error?: string;
}

// Card types
export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseComponentProps {
  variant?: 'default' | 'luxury' | 'outlined' | 'elevated';
  hover?: boolean;
  clickable?: boolean;
  padding?: SizeVariant;
}

// Modal types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

// Badge types
export interface BadgeProps extends BaseComponentProps {
  variant?: ColorVariant;
  size?: SizeVariant;
  dot?: boolean;
  outline?: boolean;
}

// Loader types
export interface LoaderProps extends BaseComponentProps {
  size?: SizeVariant;
  variant?: 'spinner' | 'dots' | 'bars';
  color?: 'gold' | 'primary' | 'secondary';
}

// Alert types
export interface AlertProps extends BaseComponentProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  description?: string;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

// Tab types
export interface TabItem {
  id: string;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TabsProps extends BaseComponentProps {
  items: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'luxury' | 'pills';
  size?: SizeVariant;
  fullWidth?: boolean;
}

// Accordion types
export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface AccordionProps extends BaseComponentProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: 'default' | 'luxury';
}

// Tooltip types
export interface TooltipProps extends BaseComponentProps {
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  disabled?: boolean;
  arrow?: boolean;
}

// Product related types for jewelry e-commerce
export interface Product {
  id: string;
  name: string;
  description?: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  material?: string;
  gemstone?: string;
  size?: string;
  weight?: string;
  dimensions?: string;
  inStock: boolean;
  stockQuantity?: number;
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  customizable?: boolean;
  customizationOptions?: ProductCustomization[];
  availability?: 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order';
  estimatedDelivery?: string;
  care?: string[];
  warranty?: string;
  sku?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCustomization {
  type: 'size' | 'material' | 'gemstone' | 'engraving' | 'color';
  label: string;
  options: ProductCustomizationOption[];
  required?: boolean;
}

export interface ProductCustomizationOption {
  value: string;
  label: string;
  price?: number;
  image?: string;
  disabled?: boolean;
}

export interface ProductFilter {
  category?: string[];
  subcategory?: string[];
  material?: string[];
  gemstone?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: string[];
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
  rating?: number;
  tags?: string[];
}

export interface ProductSort {
  field: 'price' | 'name' | 'rating' | 'newest' | 'featured' | 'popularity';
  direction: 'asc' | 'desc';
}

export interface ProductListOptions {
  filters?: ProductFilter;
  sort?: ProductSort;
  search?: string;
  page?: number;
  limit?: number;
  view?: 'grid' | 'list';
}

export interface ProductListResult {
  products: Product[];
  total: number;
  page: number;
  pages: number;
  filters: {
    categories: FilterOption[];
    materials: FilterOption[];
    gemstones: FilterOption[];
    priceRange: {
      min: number;
      max: number;
    };
  };
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface ProductViewState {
  view: 'grid' | 'list';
  sort: ProductSort;
  filters: ProductFilter;
  search: string;
  quickViewProduct?: string;
  compareProducts: string[];
  recentlyViewed: string[];
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

// Animation types
export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce';

// Responsive breakpoint types
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Theme types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    luxury: string;
    gold: string;
    darkGold: string;
    lightGold: string;
  };
  fonts: {
    heading: string;
    body: string;
    luxury: string;
  };
  spacing: Record<SizeVariant, string>;
  borderRadius: Record<SizeVariant, string>;
}

// Layout types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavigationItem[];
  external?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  material?: string;
  customization?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
}

export interface Language {
  code: 'en' | 'gr';
  name: string;
  flag: string;
}

// Layout component props
export interface HeaderProps extends BaseComponentProps {
  isScrolled?: boolean;
  transparent?: boolean;
}

export interface FooterProps extends BaseComponentProps {
  variant?: 'default' | 'minimal';
}

export interface MobileMenuProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export interface NavigationProps extends BaseComponentProps {
  items: NavigationItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'minimal';
}

export interface CartDrawerProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContactInfo {
  location: string;
  address: string;
  phone: string;
  email: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: ReactNode;
}

// Testimonial types for reviews and ratings
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  verified: boolean;
  date: string;
  productCategory?: string;
}

export interface TestimonialStats {
  averageRating: number;
  totalReviews: number;
  fiveStarPercentage: number;
  verifiedCustomers: number;
}

// Gallery types for Instagram-style showcase
export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  featured: boolean;
  tags: string[];
  likes?: number;
  date: string;
  instagramUrl?: string;
  productId?: string;
}

export interface GalleryCategory {
  name: string;
  count: number;
}

// Service types for luxury offerings
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: ReactNode;
  price: string;
  duration: string;
  popular?: boolean;
}

// Location types for showrooms
export interface LocationInfo {
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  mapUrl: string;
}

// Animation and interaction types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}

export interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  isVisible: boolean;
}

// Product category types
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

// Booking system types
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
  price?: number;
}

export interface AvailableDay {
  date: string;
  timeSlots: TimeSlot[];
  isHoliday?: boolean;
  specialNote?: string;
}

export interface ConsultationType {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  icon: string;
  features: string[];
  popular?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  timezone: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  image: string;
  businessHours: BusinessHours[];
}

export interface BusinessHours {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  openTime: string;
  closeTime: string;
  closed?: boolean;
}

export interface BookingFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Booking Details
  consultationType: string;
  location: string;
  date: string;
  timeSlot: string;
  
  // Preferences
  communicationType: 'in-person' | 'video' | 'phone';
  specialRequests?: string;
  recurring?: boolean;
  recurringFrequency?: 'weekly' | 'biweekly' | 'monthly';
  
  // Notifications
  emailConfirmation: boolean;
  smsConfirmation: boolean;
  reminderPreferences: {
    email24h: boolean;
    sms1h: boolean;
  };
}

export interface Booking {
  id: string;
  customerId: string;
  consultationType: string;
  consultationTypeDetails: ConsultationType;
  location: string;
  locationDetails: Location;
  date: string;
  timeSlot: string;
  timeSlotDetails: TimeSlot;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  formData: BookingFormData;
  createdAt: string;
  updatedAt: string;
  cancellationToken?: string;
  rescheduleToken?: string;
  notes?: string;
  totalPrice: number;
}

export interface BookingValidation {
  isValid: boolean;
  errors: {
    [K in keyof BookingFormData]?: string;
  };
}

export interface BookingState {
  currentStep: number;
  formData: Partial<BookingFormData>;
  selectedConsultationType?: ConsultationType;
  selectedLocation?: Location;
  selectedDate?: string;
  selectedTimeSlot?: TimeSlot;
  availableDays: AvailableDay[];
  isLoading: boolean;
  error?: string;
  validation: BookingValidation;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone';
  location?: string;
  interestedServices?: string[];
}

export interface ContactFormValidation {
  isValid: boolean;
  errors: {
    [K in keyof ContactFormData]?: string;
  };
}