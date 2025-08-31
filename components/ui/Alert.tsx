import React, { forwardRef, useState } from 'react';
import { AlertProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury Alert component for notifications and status messages
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({
    variant = 'info',
    title,
    description,
    icon,
    closable = false,
    onClose,
    children,
    className,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    if (!isVisible) return null;

    // Base alert styles
    const baseStyles = cn(
      'relative flex gap-3 p-4 rounded-lg border',
      'animate-slide-down',
      'font-montserrat'
    );

    // Variant styles
    const variantStyles = {
      success: cn(
        'bg-green-50 border-green-200 text-green-800',
        'dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
      ),
      warning: cn(
        'bg-yellow-50 border-yellow-200 text-yellow-800',
        'dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200'
      ),
      error: cn(
        'bg-red-50 border-red-200 text-red-800',
        'dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
      ),
      info: cn(
        'bg-homer-gold/10 border-homer-gold/30 text-homer-darkGold',
        'dark:bg-homer-gold/20 dark:border-homer-gold/40 dark:text-homer-lightGold'
      ),
    };

    // Default icons for each variant
    const defaultIcons = {
      success: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      warning: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      error: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
      info: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    };

    const displayIcon = icon || defaultIcons[variant];

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          className
        )}
        role="alert"
        {...props}
      >
        {/* Icon */}
        {displayIcon && (
          <div className="shrink-0 mt-0.5">
            {displayIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold mb-1 text-sm">
              {title}
            </h4>
          )}
          
          {description && (
            <p className="text-sm opacity-90 mb-0">
              {description}
            </p>
          )}
          
          {children && (
            <div className={cn(
              'text-sm',
              (title || description) && 'mt-2'
            )}>
              {children}
            </div>
          )}
        </div>

        {/* Close button */}
        {closable && (
          <button
            onClick={handleClose}
            className={cn(
              'shrink-0 p-1 rounded-md transition-colors duration-200',
              'hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/10',
              'dark:hover:bg-white/5 dark:focus:ring-white/10'
            )}
            aria-label="Close alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;