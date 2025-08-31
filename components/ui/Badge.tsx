import React, { forwardRef } from 'react';
import { BadgeProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury Badge component for labels, tags, and status indicators
 * Features gold accents and premium styling for jewelry e-commerce
 * 
 * @param variant - Badge color variant
 * @param size - Badge size (xs, sm, md, lg, xl)
 * @param dot - Show as a dot indicator
 * @param outline - Use outline style instead of filled
 * @param children - Badge content
 * @param className - Additional CSS classes
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    variant = 'primary',
    size = 'md',
    dot = false,
    outline = false,
    children,
    className,
    ...props
  }, ref) => {
    // Base badge styles
    const baseStyles = cn(
      'inline-flex items-center justify-center',
      'font-montserrat font-medium',
      'border transition-all duration-200 ease-in-out',
      'select-none',
      dot ? 'rounded-full' : 'rounded-full',
      !dot && 'whitespace-nowrap'
    );

    // Size variants
    const sizeStyles = {
      xs: dot ? 'w-2 h-2' : 'px-2 py-0.5 text-xs min-h-[16px]',
      sm: dot ? 'w-2.5 h-2.5' : 'px-2.5 py-0.5 text-xs min-h-[20px]',
      md: dot ? 'w-3 h-3' : 'px-3 py-1 text-sm min-h-[24px]',
      lg: dot ? 'w-4 h-4' : 'px-4 py-1.5 text-sm min-h-[28px]',
      xl: dot ? 'w-5 h-5' : 'px-5 py-2 text-base min-h-[32px]',
    };

    // Variant styles - filled versions
    const filledVariantStyles = {
      primary: 'bg-homer-gold text-white border-homer-gold shadow-sm',
      secondary: 'bg-homer-gray-600 text-white border-homer-gray-600 shadow-sm',
      luxury: cn(
        'bg-gradient-luxury text-white border-homer-gold shadow-luxury',
        'bg-gradient-to-r from-homer-gold to-homer-darkGold'
      ),
      ghost: 'bg-homer-gray-100 text-homer-gray-700 border-homer-gray-200',
      link: 'bg-blue-100 text-blue-700 border-blue-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      error: 'bg-red-100 text-red-800 border-red-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    // Variant styles - outline versions
    const outlineVariantStyles = {
      primary: 'bg-transparent text-homer-gold border-homer-gold hover:bg-homer-gold/5',
      secondary: 'bg-transparent text-homer-gray-600 border-homer-gray-300 hover:bg-homer-gray-50',
      luxury: cn(
        'bg-transparent text-homer-gold border-homer-gold hover:bg-homer-gold/10',
        'hover:border-homer-darkGold hover:text-homer-darkGold'
      ),
      ghost: 'bg-transparent text-homer-gray-500 border-homer-gray-300 hover:bg-homer-gray-50',
      link: 'bg-transparent text-blue-600 border-blue-300 hover:bg-blue-50',
      success: 'bg-transparent text-green-600 border-green-300 hover:bg-green-50',
      warning: 'bg-transparent text-yellow-600 border-yellow-300 hover:bg-yellow-50',
      error: 'bg-transparent text-red-600 border-red-300 hover:bg-red-50',
      info: 'bg-transparent text-blue-600 border-blue-300 hover:bg-blue-50',
    };

    const variantStyles = outline ? outlineVariantStyles : filledVariantStyles;

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {!dot && children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;