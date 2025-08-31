import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TooltipProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury Tooltip component with elegant positioning and premium styling
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({
    content,
    placement = 'top',
    trigger = 'hover',
    delay = 300,
    disabled = false,
    arrow = true,
    children,
    className,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    // Calculate tooltip position
    const calculatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top + scrollY - tooltipRect.height - 8;
          left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + scrollY + 8;
          left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left + scrollX - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + scrollX + 8;
          break;
      }

      // Keep tooltip within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left < 0) left = 8;
      if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - 8;
      if (top < scrollY) top = scrollY + 8;
      if (top + tooltipRect.height > scrollY + viewportHeight) {
        top = scrollY + viewportHeight - tooltipRect.height - 8;
      }

      setPosition({ top, left });
    };

    // Show tooltip with delay
    const showTooltip = () => {
      if (disabled) return;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    // Hide tooltip
    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    // Update position when visible
    useEffect(() => {
      if (isVisible) {
        calculatePosition();
        
        // Recalculate on scroll/resize
        const handleReposition = () => calculatePosition();
        window.addEventListener('scroll', handleReposition);
        window.addEventListener('resize', handleReposition);
        
        return () => {
          window.removeEventListener('scroll', handleReposition);
          window.removeEventListener('resize', handleReposition);
        };
      }
    }, [isVisible, placement]);

    // Event handlers based on trigger type
    const getEventHandlers = () => {
      switch (trigger) {
        case 'hover':
          return {
            onMouseEnter: showTooltip,
            onMouseLeave: hideTooltip,
          };
        case 'focus':
          return {
            onFocus: showTooltip,
            onBlur: hideTooltip,
          };
        case 'click':
          return {
            onClick: () => isVisible ? hideTooltip() : showTooltip(),
          };
        default:
          return {};
      }
    };

    // Arrow styles based on placement
    const arrowStyles = {
      top: 'bottom-[-4px] left-1/2 transform -translate-x-1/2 border-t-homer-black border-t-4 border-x-transparent border-x-4 border-b-0',
      bottom: 'top-[-4px] left-1/2 transform -translate-x-1/2 border-b-homer-black border-b-4 border-x-transparent border-x-4 border-t-0',
      left: 'right-[-4px] top-1/2 transform -translate-y-1/2 border-l-homer-black border-l-4 border-y-transparent border-y-4 border-r-0',
      right: 'left-[-4px] top-1/2 transform -translate-y-1/2 border-r-homer-black border-r-4 border-y-transparent border-y-4 border-l-0',
    };

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    // Tooltip content
    const tooltipContent = isVisible && !disabled && (
      <div
        ref={tooltipRef}
        className={cn(
          'fixed z-50 px-3 py-2 text-sm font-montserrat text-white',
          'bg-homer-black rounded-lg shadow-luxury',
          'pointer-events-none select-none',
          'animate-scale-in',
          className
        )}
        style={{
          top: position.top,
          left: position.left,
        }}
        role="tooltip"
        {...props}
      >
        {content}
        
        {/* Arrow */}
        {arrow && (
          <div
            className={cn(
              'absolute w-0 h-0',
              arrowStyles[placement]
            )}
            aria-hidden="true"
          />
        )}
      </div>
    );

    return (
      <>
        <div
          ref={triggerRef}
          className="inline-block"
          {...getEventHandlers()}
        >
          {children}
        </div>
        
        {/* Portal for tooltip */}
        {typeof document !== 'undefined' && createPortal(
          tooltipContent,
          document.body
        )}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;