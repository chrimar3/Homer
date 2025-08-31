import React, { forwardRef, useState } from 'react';
import { TextareaProps } from '../../types';
import { cn, generateId } from '../../lib/utils';

/**
 * Luxury Textarea component for jewelry e-commerce forms
 * Features elegant styling, resize options, and premium focus states
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    size = 'md',
    variant = 'default',
    label,
    error,
    helperText,
    fullWidth = false,
    resize = 'vertical',
    className,
    id,
    disabled,
    rows = 4,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaId = id || generateId('textarea');
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperTextId = helperText ? `${textareaId}-helper` : undefined;

    // Base textarea styles
    const baseStyles = cn(
      'w-full font-montserrat',
      'border border-homer-gray-300 rounded-lg',
      'bg-white transition-all duration-300 ease-in-out',
      'placeholder:text-homer-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-homer-gray-50'
    );

    // Size variants
    const sizeStyles = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
      xl: 'px-6 py-4 text-xl',
    };

    // Resize variants
    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    // Variant styles
    const variantStyles = {
      default: cn(
        'border-homer-gray-300 focus:border-homer-gold focus:ring-homer-gold/20',
        isFocused && 'border-homer-gold ring-2 ring-homer-gold/20'
      ),
      luxury: cn(
        'border-homer-gold/30 bg-gradient-to-br from-white to-homer-gray-50/30',
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

    return (
      <div className={cn('relative', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block font-montserrat font-medium text-sm mb-2',
              error ? 'text-red-700' : 'text-homer-gray-700',
              disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            className={cn(
              baseStyles,
              sizeStyles[size],
              variantStyles[variant],
              resizeStyles[resize],
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
            aria-describedby={cn(errorId, helperTextId).trim() || undefined}
            {...props}
          />

          {variant === 'luxury' && isFocused && (
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-homer-gold/10 to-transparent pointer-events-none animate-fade-in" />
          )}
        </div>

        {error && (
          <p id={errorId} className="mt-2 text-sm text-red-600 font-montserrat animate-slide-down" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperTextId} className="mt-2 text-sm text-homer-gray-500 font-montserrat">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;