import React, { forwardRef } from 'react';
import { IconButtonProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury IconButton component for icon-based actions
 * Features elegant hover effects and premium styling for jewelry e-commerce
 * 
 * @param variant - Button color variant
 * @param size - Button size (xs, sm, md, lg, xl)
 * @param loading - Show loading state with spinner
 * @param disabled - Disable button interaction
 * @param icon - Icon element to display
 * @param aria-label - Required accessibility label
 * @param className - Additional CSS classes
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    'aria-label': ariaLabel,
    className,
    ...props
  }, ref) => {
    // Base button styles
    const baseStyles = cn(
      'inline-flex items-center justify-center',
      'rounded-full border border-transparent',
      'transition-all duration-300 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'select-none shrink-0',
      
      // Hover animations
      'transform hover:scale-110 active:scale-95',
      'disabled:hover:scale-100 disabled:active:scale-100'
    );

    // Size variants
    const sizeStyles = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-14 h-14 text-xl',
    };

    // Variant styles
    const variantStyles = {
      primary: cn(
        'bg-homer-gold text-white shadow-md',
        'hover:bg-homer-darkGold hover:shadow-luxury',
        'focus:ring-homer-lightGold',
        'active:bg-homer-darkGold'
      ),
      secondary: cn(
        'bg-homer-gray-100 text-homer-gray-700 shadow-sm border-homer-gray-200',
        'hover:bg-homer-gray-200 hover:shadow-md hover:border-homer-gray-300',
        'focus:ring-homer-gray-300',
        'active:bg-homer-gray-300'
      ),
      luxury: cn(
        'bg-gradient-luxury text-white shadow-luxury',
        'hover:shadow-luxury-hover',
        'focus:ring-homer-gold',
        'before:absolute before:inset-0 before:rounded-full',
        'before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent',
        'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700'
      ),
      ghost: cn(
        'bg-transparent text-homer-gold border-homer-gold/30',
        'hover:bg-homer-gold hover:text-white hover:border-homer-gold',
        'focus:ring-homer-lightGold',
        'active:bg-homer-darkGold active:border-homer-darkGold'
      ),
      link: cn(
        'bg-transparent text-homer-gold',
        'hover:text-homer-darkGold hover:bg-homer-gold/5',
        'focus:ring-homer-lightGold focus:ring-offset-0',
        'active:text-homer-darkGold'
      ),
      success: cn(
        'bg-green-100 text-green-700 border-green-200',
        'hover:bg-green-200 hover:text-green-800',
        'focus:ring-green-500/20',
        'active:bg-green-300'
      ),
      warning: cn(
        'bg-yellow-100 text-yellow-700 border-yellow-200',
        'hover:bg-yellow-200 hover:text-yellow-800',
        'focus:ring-yellow-500/20',
        'active:bg-yellow-300'
      ),
      error: cn(
        'bg-red-100 text-red-700 border-red-200',
        'hover:bg-red-200 hover:text-red-800',
        'focus:ring-red-500/20',
        'active:bg-red-300'
      ),
      info: cn(
        'bg-blue-100 text-blue-700 border-blue-200',
        'hover:bg-blue-200 hover:text-blue-800',
        'focus:ring-blue-500/20',
        'active:bg-blue-300'
      ),
    };

    // Loading spinner component
    const LoadingSpinner = () => (
      <div className="animate-spin">
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          variant === 'luxury' && 'relative overflow-hidden',
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-label={ariaLabel}
        {...props}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <span className="w-1/2 h-1/2" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;