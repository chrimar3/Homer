import React, { forwardRef } from 'react';
import { RadioProps } from '../../types';
import { cn, generateId } from '../../lib/utils';

/**
 * Luxury Radio button component with premium styling
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({
    size = 'md',
    variant = 'default',
    label,
    description,
    error,
    className,
    id,
    disabled,
    ...props
  }, ref) => {
    const radioId = id || generateId('radio');
    const errorId = error ? `${radioId}-error` : undefined;
    const descriptionId = description ? `${radioId}-desc` : undefined;

    // Size variants
    const sizeStyles = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    };

    const labelSizeStyles = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    // Base radio styles
    const baseStyles = cn(
      'rounded-full border-2 transition-all duration-300 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'cursor-pointer'
    );

    // Variant styles
    const variantStyles = {
      default: cn(
        'border-homer-gray-300 text-homer-gold',
        'checked:bg-homer-gold checked:border-homer-gold',
        'focus:ring-homer-gold/20',
        'hover:border-homer-gold',
        'checked:hover:bg-homer-darkGold checked:hover:border-homer-darkGold'
      ),
      luxury: cn(
        'border-homer-gold/50 text-white',
        'checked:bg-gradient-radial checked:from-homer-gold checked:to-homer-darkGold checked:border-homer-gold',
        'focus:ring-homer-gold/30',
        'hover:border-homer-gold hover:shadow-luxury',
        'checked:shadow-luxury'
      ),
    };

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <div className="flex items-center">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={cn(
              baseStyles,
              sizeStyles[size],
              variantStyles[variant],
              error && 'border-red-500 focus:ring-red-500/20'
            )}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(errorId, descriptionId).trim() || undefined}
            {...props}
          />
        </div>

        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                htmlFor={radioId}
                className={cn(
                  'font-montserrat font-medium cursor-pointer block',
                  labelSizeStyles[size],
                  error ? 'text-red-700' : 'text-homer-gray-700',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={descriptionId}
                className={cn(
                  'font-montserrat text-homer-gray-500',
                  label && 'mt-1',
                  size === 'xs' ? 'text-xs' : 'text-sm',
                  disabled && 'opacity-50'
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {error && (
          <p id={errorId} className="text-sm text-red-600 font-montserrat" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;