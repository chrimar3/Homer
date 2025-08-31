import React, { useState, forwardRef } from 'react';
import { AccordionProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury Accordion component with smooth animations and premium styling
 */
const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({
    items,
    type = 'single',
    defaultValue,
    onValueChange,
    variant = 'default',
    className,
    ...props
  }, ref) => {
    const [openItems, setOpenItems] = useState<string[]>(() => {
      if (defaultValue) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });

    const handleToggle = (itemId: string) => {
      let newOpenItems: string[];

      if (type === 'single') {
        newOpenItems = openItems.includes(itemId) ? [] : [itemId];
      } else {
        newOpenItems = openItems.includes(itemId)
          ? openItems.filter(id => id !== itemId)
          : [...openItems, itemId];
      }

      setOpenItems(newOpenItems);
      onValueChange?.(type === 'single' ? newOpenItems[0] || '' : newOpenItems);
    };

    // Variant styles
    const variantStyles = {
      default: {
        container: 'border border-homer-gray-200 rounded-lg overflow-hidden',
        item: 'border-b border-homer-gray-200 last:border-b-0',
        trigger: cn(
          'w-full flex items-center justify-between p-4 text-left',
          'font-montserrat font-medium text-homer-gray-800',
          'hover:bg-homer-gray-50 focus:outline-none focus:bg-homer-gray-50',
          'focus:ring-2 focus:ring-inset focus:ring-homer-gold/20',
          'transition-colors duration-200'
        ),
        content: 'px-4 pb-4 text-homer-gray-600 font-montserrat',
      },
      luxury: {
        container: 'space-y-3',
        item: cn(
          'border border-homer-gold/20 rounded-lg overflow-hidden',
          'bg-gradient-to-br from-white to-homer-gray-50/30',
          'shadow-luxury hover:shadow-luxury-hover transition-shadow duration-300'
        ),
        trigger: cn(
          'w-full flex items-center justify-between p-4 text-left',
          'font-cinzel font-semibold text-homer-black',
          'hover:bg-homer-gold/5 focus:outline-none focus:bg-homer-gold/5',
          'focus:ring-2 focus:ring-inset focus:ring-homer-gold/30',
          'transition-all duration-300'
        ),
        content: 'px-4 pb-4 text-homer-gray-700 font-montserrat leading-relaxed',
      },
    };

    const currentVariant = variantStyles[variant];

    return (
      <div
        ref={ref}
        className={cn(
          currentVariant.container,
          className
        )}
        {...props}
      >
        {items.map((item, index) => {
          const isOpen = openItems.includes(item.id);
          const isDisabled = item.disabled;

          return (
            <div
              key={item.id}
              className={cn(
                currentVariant.item,
                variant === 'default' && index === 0 && 'border-t-0'
              )}
            >
              {/* Trigger Button */}
              <button
                onClick={() => !isDisabled && handleToggle(item.id)}
                disabled={isDisabled}
                className={cn(
                  currentVariant.trigger,
                  isDisabled && 'opacity-50 cursor-not-allowed',
                  isOpen && variant === 'luxury' && 'bg-homer-gold/10'
                )}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
                id={`accordion-trigger-${item.id}`}
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <span className="shrink-0 text-homer-gold" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.title}</span>
                </div>

                {/* Chevron Icon */}
                <svg
                  className={cn(
                    'w-5 h-5 text-homer-gray-500 transition-transform duration-300 shrink-0',
                    isOpen && 'rotate-180',
                    variant === 'luxury' && 'text-homer-gold'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Content */}
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div
                  id={`accordion-content-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  className={cn(
                    currentVariant.content,
                    'animate-slide-down'
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

export default Accordion;