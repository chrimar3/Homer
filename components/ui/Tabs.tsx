import React, { useState, forwardRef } from 'react';
import { TabsProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury Tabs component with elegant navigation and premium styling
 */
const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({
    items,
    activeTab,
    onTabChange,
    variant = 'default',
    size = 'md',
    fullWidth = false,
    className,
    ...props
  }, ref) => {
    const [activeTabState, setActiveTabState] = useState(activeTab || items[0]?.id || '');

    const currentActiveTab = activeTab || activeTabState;

    const handleTabChange = (tabId: string) => {
      if (!activeTab) setActiveTabState(tabId);
      onTabChange?.(tabId);
    };

    // Size variants
    const sizeStyles = {
      xs: 'text-xs px-2 py-1',
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-5 py-3',
      xl: 'text-xl px-6 py-4',
    };

    // Base tab styles
    const baseTabStyles = cn(
      'font-montserrat font-medium transition-all duration-300 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative'
    );

    // Variant styles
    const variantStyles = {
      default: {
        container: 'border-b border-homer-gray-200',
        tab: cn(
          'border-b-2 border-transparent text-homer-gray-600',
          'hover:text-homer-gray-800 hover:border-homer-gray-300',
          'focus:ring-homer-gold/20'
        ),
        active: 'text-homer-gold border-homer-gold',
      },
      luxury: {
        container: 'relative',
        tab: cn(
          'rounded-lg text-homer-gray-600 bg-transparent',
          'hover:text-homer-gold hover:bg-homer-gold/5',
          'focus:ring-homer-gold/30',
          'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r',
          'before:from-homer-gold/0 before:to-homer-gold/0 before:transition-all before:duration-300'
        ),
        active: cn(
          'text-white bg-gradient-luxury shadow-luxury',
          'before:from-homer-gold/20 before:to-homer-darkGold/20'
        ),
      },
      pills: {
        container: 'bg-homer-gray-100 rounded-lg p-1',
        tab: cn(
          'rounded-md text-homer-gray-600',
          'hover:text-homer-gray-800 hover:bg-white/50',
          'focus:ring-homer-gold/20'
        ),
        active: 'text-homer-gold bg-white shadow-sm',
      },
    };

    const currentVariant = variantStyles[variant];

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Tab Navigation */}
        <div className={cn(
          'flex',
          currentVariant.container,
          fullWidth ? 'w-full' : 'w-auto',
          variant === 'pills' && 'gap-1'
        )}>
          {items.map((item) => {
            const isActive = currentActiveTab === item.id;
            const isDisabled = item.disabled;

            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && handleTabChange(item.id)}
                disabled={isDisabled}
                className={cn(
                  baseTabStyles,
                  currentVariant.tab,
                  sizeStyles[size],
                  isActive && currentVariant.active,
                  fullWidth && 'flex-1',
                  variant !== 'pills' && 'whitespace-nowrap'
                )}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${item.id}`}
                id={`tab-${item.id}`}
              >
                {/* Icon */}
                {item.icon && (
                  <span className="inline-flex items-center mr-2" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                
                {/* Label */}
                <span>{item.label}</span>

                {/* Active indicator for luxury variant */}
                {variant === 'luxury' && isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-homer-gold rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {items.map((item) => {
            const isActive = currentActiveTab === item.id;
            
            if (!isActive || !item.content) return null;

            return (
              <div
                key={item.id}
                role="tabpanel"
                id={`tabpanel-${item.id}`}
                aria-labelledby={`tab-${item.id}`}
                className="animate-fade-in"
              >
                {item.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;