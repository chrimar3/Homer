import React, { forwardRef } from 'react';
import { CardProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury Card component for jewelry e-commerce with elegant hover effects
 * Perfect for product displays, information cards, and content containers
 * 
 * @param variant - Card style variant (default, luxury, outlined, elevated)
 * @param hover - Enable hover animations and effects
 * @param clickable - Make card clickable with pointer cursor
 * @param padding - Internal padding size
 * @param children - Card content
 * @param className - Additional CSS classes
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    hover = false,
    clickable = false,
    padding = 'md',
    children,
    className,
    ...props
  }, ref) => {
    // Base card styles
    const baseStyles = cn(
      'relative overflow-hidden',
      'bg-white',
      'transition-all duration-300 ease-in-out',
      'group',
      clickable && 'cursor-pointer',
      hover && 'transform hover:scale-[1.02]'
    );

    // Padding variants
    const paddingStyles = {
      xs: 'p-2',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };

    // Variant styles
    const variantStyles = {
      default: cn(
        'border border-homer-gray-200 rounded-lg shadow-sm',
        hover && 'hover:shadow-md hover:border-homer-gray-300',
        clickable && 'hover:shadow-lg'
      ),
      luxury: cn(
        'border border-homer-gold/20 rounded-lg shadow-luxury',
        'bg-gradient-to-br from-white to-homer-gray-50/30',
        hover && 'hover:shadow-luxury-hover hover:border-homer-gold/40',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-homer-gold/5 before:to-transparent before:opacity-0',
        hover && 'hover:before:opacity-100 before:transition-opacity before:duration-300',
        // Gold accent border on hover
        'after:absolute after:inset-0 after:rounded-lg after:border after:border-homer-gold/0',
        hover && 'hover:after:border-homer-gold/30 after:transition-colors after:duration-300'
      ),
      outlined: cn(
        'border-2 border-homer-gray-300 rounded-lg bg-transparent',
        hover && 'hover:border-homer-gold hover:shadow-sm',
        'focus-within:border-homer-gold focus-within:shadow-sm'
      ),
      elevated: cn(
        'border-0 rounded-xl shadow-xl',
        'bg-white',
        hover && 'hover:shadow-2xl hover:shadow-homer-gold/10',
        // Subtle gradient overlay
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:to-transparent before:rounded-xl'
      ),
    };

    // Shimmer effect for luxury variant on hover
    const shimmerEffect = variant === 'luxury' && hover && (
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
    );

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...props}
      >
        {/* Shimmer effect for luxury cards */}
        {shimmerEffect}
        
        {/* Card content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header component for consistent card layouts
 */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start justify-between',
          'pb-4 border-b border-homer-gray-100',
          className
        )}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="font-cinzel font-semibold text-lg text-homer-black mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="font-montserrat text-sm text-homer-gray-600">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="ml-4 shrink-0">
            {action}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Body component for consistent card layouts
 */
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('py-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * Card Footer component for consistent card layouts
 */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ bordered = true, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'pt-4',
          bordered && 'border-t border-homer-gray-100',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;