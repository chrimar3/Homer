'use client';

import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollPositionOptions {
  throttleMs?: number;
}

/**
 * Custom hook to track scroll position with throttling for performance
 * Returns current scroll position and whether user has scrolled past threshold
 */
export const useScrollPosition = (options: UseScrollPositionOptions = {}) => {
  const { throttleMs = 100 } = options;
  
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateScrollPosition = () => {
      const position = {
        x: window.scrollX,
        y: window.scrollY,
      };
      
      setScrollPosition(position);
      setIsScrolled(position.y > 50); // Consider scrolled after 50px
    };

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScrollPosition, throttleMs);
    };

    // Set initial position
    updateScrollPosition();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [throttleMs]);

  return {
    scrollPosition,
    isScrolled,
    scrollY: scrollPosition.y,
    scrollX: scrollPosition.x,
  };
};

/**
 * Hook to track scroll direction
 */
export const useScrollDirection = (threshold: number = 0) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'initial'>('initial');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - prevScrollY) < threshold) {
        return;
      }

      setScrollDirection(scrollY > prevScrollY ? 'down' : 'up');
      setPrevScrollY(scrollY);
    };

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScrollDirection, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [prevScrollY, threshold]);

  return scrollDirection;
};