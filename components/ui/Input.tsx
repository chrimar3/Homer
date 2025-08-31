import React, { forwardRef, useState } from 'react';
import { InputProps } from '../../types';
import { cn, generateId } from '../../lib/utils';

/**
 * Luxury Input component with premium styling for jewelry e-commerce
 * Features gold accents, smooth transitions, and elegant focus states
 * 
 * @param size - Input size (xs, sm, md, lg, xl)
 * @param variant - Input style variant (default, luxury, error)
 * @param label - Input label text
 * @param error - Error message to display
 * @param helperText - Helper text below input
 * @param leftIcon - Icon to display on the left
 * @param rightIcon - Icon to display on the right
 * @param fullWidth - Make input take full width of container
 * @param className - Additional CSS classes
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    size = 'md',
    variant = 'default',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    id,
    disabled,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || generateId('input');
    const errorId = error ? `${inputId}-error` : undefined;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;

    // Base input styles
    const baseStyles = cn(
      'w-full font-montserrat',
      'border border-homer-gray-300 rounded-lg',
      'bg-white transition-all duration-300 ease-in-out',
      'placeholder:text-homer-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-homer-gray-50',
      'group-hover:border-homer-gray-400',
      leftIcon && 'pl-10',
      rightIcon && 'pr-10'
    );

    // Size variants
    const sizeStyles = {
      xs: 'px-2 py-1 text-xs min-h-[24px]',
      sm: 'px-3 py-1.5 text-sm min-h-[32px]',
      md: 'px-4 py-2 text-base min-h-[40px]',
      lg: 'px-5 py-3 text-lg min-h-[48px]',
      xl: 'px-6 py-4 text-xl min-h-[56px]',
    };

    // Icon sizes based on input size
    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    };

    // Icon positions
    const iconPositions = {
      xs: { left: 'left-1.5', right: 'right-1.5' },
      sm: { left: 'left-2', right: 'right-2' },
      md: { left: 'left-3', right: 'right-3' },
      lg: { left: 'left-3.5', right: 'right-3.5' },
      xl: { left: 'left-4', right: 'right-4' },
    };

    // Variant styles
    const variantStyles = {
      default: cn(
        'border-homer-gray-300 focus:border-homer-gold focus:ring-homer-gold/20',
        isFocused && 'border-homer-gold ring-2 ring-homer-gold/20'
      ),
      luxury: cn(
        'border-homer-gold/30 bg-gradient-to-r from-white to-homer-gray-50/30',
        'focus:border-homer-gold focus:ring-homer-gold/30',
        'shadow-inner-luxury',
        isFocused && 'border-homer-gold ring-2 ring-homer-gold/30 shadow-luxury'
      ),
      error: cn(
        'border-red-300 focus:border-red-500 focus:ring-red-500/20',
        'bg-red-50/50',
        isFocused && 'border-red-500 ring-2 ring-red-500/20'
      ),
    };

    // Label styles
    const labelStyles = cn(
      'block font-montserrat font-medium text-sm mb-2',
      error ? 'text-red-700' : 'text-homer-gray-700',
      disabled && 'opacity-50'
    );

    // Container styles
    const containerStyles = cn(
      'relative group',
      fullWidth && 'w-full'
    );

    return (
      <div className={cn(containerStyles, className)}>
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className={labelStyles}>
            {label}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className={cn(
              'absolute top-1/2 transform -translate-y-1/2',
              'text-homer-gray-400 pointer-events-none z-10',
              iconPositions[size].left
            )}>
              <span className={iconSizes[size]}>
                {leftIcon}
              </span>
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              baseStyles,
              sizeStyles[size],
              variantStyles[variant],
              error && !disabled && 'border-red-300 focus:border-red-500'
            )}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(
              errorId,
              helperTextId
            ).trim() || undefined}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div className={cn(
              'absolute top-1/2 transform -translate-y-1/2',
              'text-homer-gray-400 pointer-events-none z-10',
              iconPositions[size].right
            )}>
              <span className={iconSizes[size]}>
                {rightIcon}
              </span>
            </div>
          )}

          {/* Focus ring effect for luxury variant */}
          {variant === 'luxury' && isFocused && (
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-homer-gold/10 to-transparent pointer-events-none animate-fade-in" />
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className="mt-2 text-sm text-red-600 font-montserrat animate-slide-down"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={helperTextId}
            className="mt-2 text-sm text-homer-gray-500 font-montserrat"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;