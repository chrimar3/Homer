'use client';

import { useEffect } from 'react';
import { useCart as useCartContext } from '@/lib/context/CartContext';
import { CartItem } from '@/types';

/**
 * Enhanced cart hook with localStorage persistence and additional utilities
 */
export const useCart = () => {
  const cartContext = useCartContext();

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('homer-cart', JSON.stringify(cartContext.cart));
    } catch (error) {
      console.warn('Failed to persist cart to localStorage:', error);
    }
  }, [cartContext.cart]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('homer-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.items && Array.isArray(parsedCart.items)) {
          cartContext.loadCart(parsedCart);
        }
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
    }
  }, []);

  /**
   * Add item to cart with automatic ID generation
   */
  const addItemToCart = (item: Omit<CartItem, 'id'>) => {
    const cartItem: CartItem = {
      ...item,
      id: `${item.productId}-${item.size || 'default'}-${item.material || 'default'}-${Date.now()}`,
    };
    cartContext.addItem(cartItem);
  };

  /**
   * Get formatted price string
   */
  const getFormattedTotal = (currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(cartContext.cart.total);
  };

  /**
   * Check if cart has items
   */
  const hasItems = cartContext.cart.itemCount > 0;

  /**
   * Get cart summary for checkout
   */
  const getCartSummary = () => ({
    itemCount: cartContext.cart.itemCount,
    total: cartContext.cart.total,
    formattedTotal: getFormattedTotal(),
    items: cartContext.cart.items,
  });

  /**
   * Find item in cart by product details
   */
  const findCartItem = (productId: string, size?: string, material?: string) => {
    return cartContext.cart.items.find(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.material === material
    );
  };

  /**
   * Get total quantity of a specific product in cart
   */
  const getProductQuantity = (productId: string, size?: string, material?: string) => {
    const item = findCartItem(productId, size, material);
    return item?.quantity || 0;
  };

  /**
   * Check if product is in cart
   */
  const isProductInCart = (productId: string, size?: string, material?: string) => {
    return !!findCartItem(productId, size, material);
  };

  return {
    ...cartContext,
    addItemToCart,
    getFormattedTotal,
    hasItems,
    getCartSummary,
    findCartItem,
    getProductQuantity,
    isProductInCart,
  };
};