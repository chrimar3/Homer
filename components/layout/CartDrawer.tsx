'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';
import { CartDrawerProps } from '@/types';
import { useCart } from '@/lib/hooks/useCart';

/**
 * Slide-out shopping cart drawer with luxury styling
 * Features cart items display, quantity controls, and checkout integration
 */
export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const { 
    cart, 
    removeItem, 
    updateQuantity, 
    getFormattedTotal, 
    hasItems 
  } = useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close cart on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-white z-50',
          'transform transition-transform duration-300 ease-in-out',
          'shadow-2xl shadow-black/20 flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Cinzel, serif' }}>
            Shopping Cart
            {hasItems && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          
          <button
            type="button"
            onClick={onClose}
            className={clsx(
              'p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[var(--homer-gold)] rounded-lg'
            )}
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {!hasItems ? (
            /* Empty Cart */
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-24 h-24 mb-6 text-gray-300">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6M9 19v2M15 19v2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">
                Discover our exclusive collection of luxury jewelry and grillz
              </p>
              <Link
                href="/jewelry"
                onClick={onClose}
                className={clsx(
                  'inline-flex items-center px-6 py-3 bg-[var(--homer-gold)] text-white',
                  'font-medium rounded-lg transition-colors duration-200',
                  'hover:bg-[var(--homer-dark-gold)] focus:outline-none focus:ring-2',
                  'focus:ring-offset-2 focus:ring-[var(--homer-gold)]'
                )}
              >
                Shop Now
              </Link>
            </div>
          ) : (
            /* Cart Items */
            <div className="p-6 space-y-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                      {item.name}
                    </h3>
                    
                    {/* Variants */}
                    {(item.size || item.material) && (
                      <div className="text-xs text-gray-500 mb-2 space-y-1">
                        {item.size && <div>Size: {item.size}</div>}
                        {item.material && <div>Material: {item.material}</div>}
                        {item.customization && <div>Custom: {item.customization}</div>}
                      </div>
                    )}

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-[var(--homer-gold)]">
                        {formatPrice(item.price * item.quantity)}
                        {item.quantity > 1 && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({formatPrice(item.price)} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className={clsx(
                            'w-7 h-7 flex items-center justify-center rounded-full',
                            'border border-gray-300 text-gray-500 hover:border-gray-400',
                            'hover:text-gray-600 transition-colors duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-[var(--homer-gold)]'
                          )}
                          aria-label="Decrease quantity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="min-w-[2rem] text-center text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className={clsx(
                            'w-7 h-7 flex items-center justify-center rounded-full',
                            'border border-gray-300 text-gray-500 hover:border-gray-400',
                            'hover:text-gray-600 transition-colors duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-[var(--homer-gold)]'
                          )}
                          aria-label="Increase quantity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className={clsx(
                      'p-1 text-gray-400 hover:text-red-500 transition-colors duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-red-500 rounded'
                    )}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {hasItems && (
          <div className="border-t border-gray-200 p-6 bg-gray-50/50 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg font-medium text-gray-900">
              <span>Subtotal</span>
              <span className="text-[var(--homer-gold)]">
                {getFormattedTotal()}
              </span>
            </div>

            {/* Shipping Note */}
            <p className="text-xs text-gray-500 text-center">
              Shipping and taxes calculated at checkout
            </p>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={onClose}
                className={clsx(
                  'w-full flex items-center justify-center px-6 py-3',
                  'bg-[var(--homer-gold)] text-white font-medium rounded-lg',
                  'transition-colors duration-200 hover:bg-[var(--homer-dark-gold)]',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--homer-gold)]'
                )}
              >
                Proceed to Checkout
              </Link>
              
              <Link
                href="/cart"
                onClick={onClose}
                className={clsx(
                  'w-full flex items-center justify-center px-6 py-2',
                  'text-[var(--homer-gold)] font-medium rounded-lg border border-[var(--homer-gold)]',
                  'transition-colors duration-200 hover:bg-[var(--homer-gold)] hover:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--homer-gold)]'
                )}
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;