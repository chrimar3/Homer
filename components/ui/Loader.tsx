import React, { forwardRef } from 'react';
import { LoaderProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury Loader component with gold animations for jewelry e-commerce
 * Features elegant spinners, dots, and bars with premium styling
 * 
 * @param size - Loader size (xs, sm, md, lg, xl)
 * @param variant - Loader animation type (spinner, dots, bars)
 * @param color - Loader color theme (gold, primary, secondary)
 * @param className - Additional CSS classes
 */
const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({
    size = 'md',
    variant = 'spinner',
    color = 'gold',
    className,
    ...props
  }, ref) => {
    // Size variants for different loader types
    const sizeStyles = {
      spinner: {
        xs: 'w-4 h-4',
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10',
      },
      dots: {
        xs: 'gap-1',
        sm: 'gap-1.5',
        md: 'gap-2',
        lg: 'gap-2.5',
        xl: 'gap-3',
      },
      bars: {
        xs: 'gap-0.5',
        sm: 'gap-1',
        md: 'gap-1.5',
        lg: 'gap-2',
        xl: 'gap-2.5',
      },
    };

    // Dot sizes
    const dotSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
    };

    // Bar sizes
    const barSizes = {
      xs: 'w-1 h-3',
      sm: 'w-1 h-4',
      md: 'w-1.5 h-5',
      lg: 'w-2 h-6',
      xl: 'w-2.5 h-8',
    };

    // Color variants
    const colorStyles = {
      gold: 'text-homer-gold',
      primary: 'text-homer-gold',
      secondary: 'text-homer-gray-600',
    };

    // Spinner component
    const SpinnerLoader = () => (
      <div
        className={cn(
          'animate-spin',
          sizeStyles.spinner[size],
          colorStyles[color]
        )}
        role="status"
        aria-label="Loading"
      >
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

    // Dots loader component
    const DotsLoader = () => (
      <div
        className={cn(
          'flex items-center',
          sizeStyles.dots[size]
        )}
        role="status"
        aria-label="Loading"
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              'rounded-full animate-pulse',
              dotSizes[size],
              color === 'gold' ? 'bg-homer-gold' : 
              color === 'primary' ? 'bg-homer-gold' : 'bg-homer-gray-600'
            )}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1s',
            }}
          />
        ))}
      </div>
    );

    // Bars loader component
    const BarsLoader = () => (
      <div
        className={cn(
          'flex items-end',
          sizeStyles.bars[size]
        )}
        role="status"
        aria-label="Loading"
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={cn(
              'rounded-sm',
              barSizes[size],
              color === 'gold' ? 'bg-homer-gold animate-pulse-gold' : 
              color === 'primary' ? 'bg-homer-gold animate-pulse-gold' : 'bg-homer-gray-600 animate-pulse'
            )}
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: '0.8s',
            }}
          />
        ))}
      </div>
    );

    // Render appropriate loader variant
    const renderLoader = () => {
      switch (variant) {
        case 'dots':
          return <DotsLoader />;
        case 'bars':
          return <BarsLoader />;
        case 'spinner':
        default:
          return <SpinnerLoader />;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          className
        )}
        {...props}
      >
        {renderLoader()}
      </div>
    );
  }
);

Loader.displayName = 'Loader';

/**
 * Full page loader overlay component
 */
interface FullPageLoaderProps {
  isLoading: boolean;
  message?: string;
  variant?: 'spinner' | 'dots' | 'bars';
  className?: string;
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  isLoading,
  message = 'Loading...',
  variant = 'spinner',
  className,
}) => {
  if (!isLoading) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50',
      'bg-white/80 backdrop-blur-sm',
      'flex flex-col items-center justify-center gap-4',
      'animate-fade-in',
      className
    )}>
      <Loader size="lg" variant={variant} color="gold" />
      {message && (
        <p className="text-homer-gray-600 font-montserrat text-lg">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;