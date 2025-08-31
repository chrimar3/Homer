import React, { forwardRef } from 'react';
import { ButtonProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury Button component with multiple variants for jewelry e-commerce
 * Supports primary, secondary, luxury, ghost, and link styles
 * 
 * @param variant - Button style variant
 * @param size - Button size (xs, sm, md, lg, xl)
 * @param loading - Show loading state with spinner
 * @param disabled - Disable button interaction
 * @param fullWidth - Make button take full width of container
 * @param leftIcon - Icon to display on the left
 * @param rightIcon - Icon to display on the right
 * @param children - Button content
 * @param className - Additional CSS classes
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    className,
    ...props
  }, ref) => {
    // Base button styles
    const baseStyles = cn(
      // Layout & positioning
      'inline-flex items-center justify-center gap-2',
      'relative overflow-hidden',
      'font-montserrat font-medium',
      'border border-transparent',
      'transition-all duration-300 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'select-none',
      
      // Hover animations
      'transform hover:scale-[1.02] active:scale-[0.98]',
      'disabled:hover:scale-100 disabled:active:scale-100'
    );

    // Size variants
    const sizeStyles = {
      xs: 'px-2 py-1 text-xs rounded-md min-h-[24px]',
      sm: 'px-3 py-1.5 text-sm rounded-md min-h-[32px]',
      md: 'px-4 py-2 text-base rounded-lg min-h-[40px]',
      lg: 'px-6 py-3 text-lg rounded-lg min-h-[48px]',
      xl: 'px-8 py-4 text-xl rounded-xl min-h-[56px]',
    };

    // Variant styles
    const variantStyles = {
      primary: cn(
        'bg-homer-gold text-white shadow-lg',
        'hover:bg-homer-darkGold hover:shadow-luxury',
        'focus:ring-homer-lightGold',
        'active:bg-homer-darkGold',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700'
      ),
      secondary: cn(
        'bg-homer-gray-100 text-homer-gray-900 shadow-md border-homer-gray-200',
        'hover:bg-homer-gray-200 hover:shadow-lg hover:border-homer-gray-300',
        'focus:ring-homer-gray-300',
        'active:bg-homer-gray-300'
      ),
      luxury: cn(
        'bg-gradient-luxury text-white shadow-luxury',
        'hover:shadow-luxury-hover hover:bg-gradient-to-r hover:from-homer-lightGold hover:to-homer-darkGold',
        'focus:ring-homer-gold',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent',
        'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000'
      ),
      ghost: cn(
        'bg-transparent text-homer-gold border-homer-gold',
        'hover:bg-homer-gold hover:text-white hover:shadow-md',
        'focus:ring-homer-lightGold',
        'active:bg-homer-darkGold active:border-homer-darkGold'
      ),
      link: cn(
        'bg-transparent text-homer-gold p-0 min-h-auto shadow-none',
        'hover:text-homer-darkGold hover:underline hover:scale-100',
        'focus:ring-homer-lightGold focus:ring-offset-0',
        'active:text-homer-darkGold'
      ),
      success: cn(
        'bg-green-600 text-white shadow-lg',
        'hover:bg-green-700 hover:shadow-xl',
        'focus:ring-green-500',
        'active:bg-green-800'
      ),
      warning: cn(
        'bg-yellow-500 text-white shadow-lg',
        'hover:bg-yellow-600 hover:shadow-xl',
        'focus:ring-yellow-400',
        'active:bg-yellow-700'
      ),
      error: cn(
        'bg-red-600 text-white shadow-lg',
        'hover:bg-red-700 hover:shadow-xl',
        'focus:ring-red-500',
        'active:bg-red-800'
      ),
      info: cn(
        'bg-blue-600 text-white shadow-lg',
        'hover:bg-blue-700 hover:shadow-xl',
        'focus:ring-blue-500',
        'active:bg-blue-800'
      ),
    };

    // Loading spinner component
    const LoadingSpinner = () => (
      <div className="animate-spin">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
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
          fullWidth && 'w-full',
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {/* Left icon or loading spinner */}
        {loading ? (
          <LoadingSpinner />
        ) : leftIcon ? (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}

        {/* Button content */}
        <span className={cn(loading && 'opacity-70')}>
          {children}
        </span>

        {/* Right icon */}
        {rightIcon && !loading && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;