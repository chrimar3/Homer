import React, { forwardRef, useState } from 'react';
import { SelectProps } from '../../types';
import { cn, generateId } from '../../lib/utils';

/**
 * Luxury Select dropdown component for jewelry e-commerce
 * Features elegant styling, animations, and premium focus states
 * 
 * @param size - Select size (xs, sm, md, lg, xl)
 * @param variant - Select style variant (default, luxury, error)
 * @param label - Select label text
 * @param error - Error message to display
 * @param helperText - Helper text below select
 * @param options - Array of select options
 * @param placeholder - Placeholder text when no option is selected
 * @param fullWidth - Make select take full width of container
 * @param className - Additional CSS classes
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    size = 'md',
    variant = 'default',
    label,
    error,
    helperText,
    options = [],
    placeholder,
    fullWidth = false,
    className,
    id,
    disabled,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const selectId = id || generateId('select');
    const errorId = error ? `${selectId}-error` : undefined;
    const helperTextId = helperText ? `${selectId}-helper` : undefined;

    // Base select styles
    const baseStyles = cn(
      'w-full font-montserrat appearance-none',
      'border border-homer-gray-300 rounded-lg',
      'bg-white transition-all duration-300 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-homer-gray-50',
      'group-hover:border-homer-gray-400',
      // Custom dropdown arrow styling
      'bg-no-repeat bg-right pr-10',
      'bg-[url(\"data:image/svg+xml;charset=utf-8,%3csvg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 20 20\\'%3e%3cpath stroke=\\'%236b7280\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'1.5\\' d=\\'M6 8l4 4 4-4\\'/%3e%3c/svg%3e\")]'\n    );\n\n    // Size variants\n    const sizeStyles = {\n      xs: 'px-2 py-1 text-xs min-h-[24px] bg-[length:16px] bg-[right_4px_center]',\n      sm: 'px-3 py-1.5 text-sm min-h-[32px] bg-[length:18px] bg-[right_8px_center]',\n      md: 'px-4 py-2 text-base min-h-[40px] bg-[length:20px] bg-[right_12px_center]',\n      lg: 'px-5 py-3 text-lg min-h-[48px] bg-[length:22px] bg-[right_16px_center]',\n      xl: 'px-6 py-4 text-xl min-h-[56px] bg-[length:24px] bg-[right_20px_center]',\n    };\n\n    // Variant styles\n    const variantStyles = {\n      default: cn(\n        'border-homer-gray-300 focus:border-homer-gold focus:ring-homer-gold/20',\n        isFocused && 'border-homer-gold ring-2 ring-homer-gold/20'\n      ),\n      luxury: cn(\n        'border-homer-gold/30 bg-gradient-to-r from-white to-homer-gray-50/30',\n        'focus:border-homer-gold focus:ring-homer-gold/30',\n        'shadow-inner-luxury',\n        isFocused && 'border-homer-gold ring-2 ring-homer-gold/30 shadow-luxury'\n      ),\n      error: cn(\n        'border-red-300 focus:border-red-500 focus:ring-red-500/20',\n        'bg-red-50/50',\n        isFocused && 'border-red-500 ring-2 ring-red-500/20'\n      ),\n    };\n\n    // Label styles\n    const labelStyles = cn(\n      'block font-montserrat font-medium text-sm mb-2',\n      error ? 'text-red-700' : 'text-homer-gray-700',\n      disabled && 'opacity-50'\n    );\n\n    // Container styles\n    const containerStyles = cn(\n      'relative group',\n      fullWidth && 'w-full'\n    );\n\n    return (\n      <div className={cn(containerStyles, className)}>\n        {/* Label */}\n        {label && (\n          <label htmlFor={selectId} className={labelStyles}>\n            {label}\n          </label>\n        )}\n\n        {/* Select container */}\n        <div className=\"relative\">\n          <select\n            ref={ref}\n            id={selectId}\n            className={cn(\n              baseStyles,\n              sizeStyles[size],\n              variantStyles[variant],\n              error && !disabled && 'border-red-300 focus:border-red-500',\n              // Placeholder styles\n              !props.value && 'text-homer-gray-400'\n            )}\n            disabled={disabled}\n            onFocus={(e) => {\n              setIsFocused(true);\n              props.onFocus?.(e);\n            }}\n            onBlur={(e) => {\n              setIsFocused(false);\n              props.onBlur?.(e);\n            }}\n            aria-invalid={error ? 'true' : 'false'}\n            aria-describedby={cn(\n              errorId,\n              helperTextId\n            ).trim() || undefined}\n            {...props}\n          >\n            {/* Placeholder option */}\n            {placeholder && (\n              <option value=\"\" disabled hidden>\n                {placeholder}\n              </option>\n            )}\n\n            {/* Options */}\n            {options.map((option) => (\n              <option\n                key={option.value}\n                value={option.value}\n                disabled={option.disabled}\n                className=\"text-homer-black bg-white\"\n              >\n                {option.label}\n              </option>\n            ))}\n          </select>\n\n          {/* Focus ring effect for luxury variant */}\n          {variant === 'luxury' && isFocused && (\n            <div className=\"absolute inset-0 rounded-lg bg-gradient-to-r from-homer-gold/10 to-transparent pointer-events-none animate-fade-in\" />\n          )}\n\n          {/* Custom dropdown arrow (enhanced for luxury) */}\n          {variant === 'luxury' && (\n            <div className=\"absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none\">\n              <svg \n                className={cn(\n                  'w-5 h-5 transition-colors duration-300',\n                  isFocused ? 'text-homer-gold' : 'text-homer-gray-400'\n                )}\n                fill=\"none\" \n                stroke=\"currentColor\" \n                viewBox=\"0 0 24 24\"\n              >\n                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M19 9l-7 7-7-7\" />\n              </svg>\n            </div>\n          )}\n        </div>\n\n        {/* Error message */}\n        {error && (\n          <p\n            id={errorId}\n            className=\"mt-2 text-sm text-red-600 font-montserrat animate-slide-down\"\n            role=\"alert\"\n          >\n            {error}\n          </p>\n        )}\n\n        {/* Helper text */}\n        {helperText && !error && (\n          <p\n            id={helperTextId}\n            className=\"mt-2 text-sm text-homer-gray-500 font-montserrat\"\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nSelect.displayName = 'Select';\n\nexport default Select;