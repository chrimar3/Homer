import React, { forwardRef, useRef, useEffect } from 'react';
import { CheckboxProps } from '../../types';
import { cn, generateId } from '../../lib/utils';

/**
 * Luxury Checkbox component with premium styling
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    size = 'md',
    variant = 'default',
    label,
    description,
    error,
    indeterminate = false,
    className,
    id,
    disabled,
    ...props
  }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const checkboxId = id || generateId('checkbox');
    const errorId = error ? `${checkboxId}-error` : undefined;
    const descriptionId = description ? `${checkboxId}-desc` : undefined;

    // Handle indeterminate state
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

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

    // Base checkbox styles
    const baseStyles = cn(
      'rounded border-2 transition-all duration-300 ease-in-out',
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
        'indeterminate:bg-homer-gold indeterminate:border-homer-gold'
      ),
      luxury: cn(
        'border-homer-gold/50 text-white',
        'checked:bg-gradient-luxury checked:border-homer-gold',
        'focus:ring-homer-gold/30',
        'hover:border-homer-gold hover:shadow-luxury',
        'indeterminate:bg-gradient-luxury indeterminate:border-homer-gold'
      ),
    };

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <div className="flex items-center">
          <input
            ref={inputRef || ref}
            type="checkbox"
            id={checkboxId}
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
                htmlFor={checkboxId}
                className={cn(
                  'font-montserrat font-medium cursor-pointer',
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;