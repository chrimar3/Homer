import React, { useEffect, useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Luxury Modal component for jewelry e-commerce with elegant animations
 * Features backdrop blur, escape key handling, and focus management
 * 
 * @param isOpen - Whether the modal is open
 * @param onClose - Callback when modal should close
 * @param title - Modal title
 * @param size - Modal size (sm, md, lg, xl, full)
 * @param closeOnOverlayClick - Allow closing by clicking backdrop
 * @param closeOnEscape - Allow closing with Escape key
 * @param showCloseButton - Show X close button
 * @param children - Modal content
 * @param className - Additional CSS classes
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({
    isOpen,
    onClose,
    title,
    size = 'md',
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    children,
    className,
  }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

    // Size variants
    const sizeStyles = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-full mx-4 h-full max-h-[calc(100vh-2rem)]',
    };

    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape || !isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [closeOnEscape, isOpen, onClose]);

    // Focus management
    useEffect(() => {
      if (isOpen) {
        // Store currently focused element
        previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
        
        // Focus the modal
        setTimeout(() => {
          modalRef.current?.focus();
        }, 100);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Restore focus to previously focused element
        if (previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // Handle overlay click
    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    // Handle focus trap
    const handleKeyDown = (event: React.KeyEvent) => {
      if (event.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (!isOpen) return null;

    const modalContent = (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'animate-fade-in'
        )}
        onClick={handleOverlayClick}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/50 backdrop-blur-sm',
            'animate-fade-in'
          )}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={modalRef}
          className={cn(
            'relative w-full mx-4',
            'bg-white rounded-xl shadow-2xl',
            'animate-scale-in',
            'focus:outline-none',
            sizeStyles[size],
            size === 'full' && 'flex flex-col',
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-homer-gray-200">
              {title && (
                <h2
                  id="modal-title"
                  className="text-xl font-cinzel font-semibold text-homer-black"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={cn(
                    'p-2 rounded-lg',
                    'text-homer-gray-400 hover:text-homer-gray-600',
                    'hover:bg-homer-gray-100',
                    'transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-homer-gold/20'
                  )}
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className={cn(
            'p-6',
            size === 'full' && 'flex-1 overflow-auto'
          )}>
            {children}
          </div>
        </div>
      </div>
    );

    // Render modal in portal
    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = 'Modal';

/**
 * Modal Header component for consistent modal layouts
 */
interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ title, onClose, showCloseButton = true, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between p-6',
          'border-b border-homer-gray-200',
          className
        )}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {title && (
            <h2 className="text-xl font-cinzel font-semibold text-homer-black">
              {title}
            </h2>
          )}
          {children}
        </div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className={cn(
              'ml-4 p-2 rounded-lg',
              'text-homer-gray-400 hover:text-homer-gray-600',
              'hover:bg-homer-gray-100',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-homer-gold/20'
            )}
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

/**
 * Modal Body component for consistent modal layouts
 */
interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

/**
 * Modal Footer component for consistent modal layouts
 */
interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ bordered = true, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 pb-6',
          'flex items-center justify-end gap-3',
          bordered && 'border-t border-homer-gray-200 pt-6',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';

export default Modal;