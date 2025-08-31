'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { NavigationProps, NavigationItem } from '@/types';

/**
 * Desktop navigation component with hover effects and dropdown menus
 * Features luxury styling and smooth transitions
 */
export const Navigation: React.FC<NavigationProps> = ({
  items,
  orientation = 'horizontal',
  variant = 'default',
  className,
}) => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleMouseEnter = (label: string, hasChildren: boolean) => {
    if (hasChildren) {
      setActiveDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const renderNavigationItem = (item: NavigationItem, index: number) => {
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownActive = activeDropdown === item.label;
    const itemIsActive = isActive(item.href);

    return (
      <div
        key={item.label}
        className="relative"
        onMouseEnter={() => handleMouseEnter(item.label, hasChildren)}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={item.href}
          className={clsx(
            // Base styles
            'relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--homer-gold)]',
            
            // Variant styles
            variant === 'default' && [
              'text-gray-700 hover:text-[var(--homer-gold)]',
              itemIsActive && 'text-[var(--homer-gold)]',
            ],
            variant === 'minimal' && [
              'text-gray-600 hover:text-gray-900',
              itemIsActive && 'text-gray-900',
            ],

            // Orientation styles
            orientation === 'horizontal' && 'inline-block',
            orientation === 'vertical' && 'block w-full text-left',

            // After pseudo-element for underline effect
            'after:absolute after:bottom-0 after:left-1/2 after:h-0.5',
            'after:w-0 after:bg-[var(--homer-gold)] after:transition-all after:duration-300',
            'after:-translate-x-1/2',
            'hover:after:w-3/4',
            itemIsActive && 'after:w-3/4',
          )}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
        >
          <span className="flex items-center gap-2">
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
            {hasChildren && (
              <svg
                className={clsx(
                  'w-3 h-3 transition-transform duration-200',
                  isDropdownActive && 'rotate-180'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </span>
        </Link>

        {/* Dropdown Menu */}
        {hasChildren && (
          <div
            className={clsx(
              'absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl',
              'border border-gray-100 overflow-hidden z-50',
              'transform transition-all duration-300 origin-top',
              isDropdownActive
                ? 'opacity-100 scale-100 translate-y-0 visible'
                : 'opacity-0 scale-95 -translate-y-2 invisible',
            )}
          >
            <div className="py-2">
              {item.children?.map((child, childIndex) => (
                <Link
                  key={child.label}
                  href={child.href}
                  className={clsx(
                    'block px-4 py-3 text-sm text-gray-700 transition-colors duration-200',
                    'hover:bg-gray-50 hover:text-[var(--homer-gold)]',
                    'focus:outline-none focus:bg-gray-50 focus:text-[var(--homer-gold)]',
                    isActive(child.href) && 'text-[var(--homer-gold)] bg-gray-50',
                  )}
                  target={child.external ? '_blank' : undefined}
                  rel={child.external ? 'noopener noreferrer' : undefined}
                >
                  <span className="flex items-center gap-3">
                    {child.icon && <span className="w-4 h-4">{child.icon}</span>}
                    <span>
                      <div className="font-medium">{child.label}</div>
                      {/* Add description support if needed */}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            
            {/* Dropdown arrow */}
            <div className="absolute -top-2 left-6 w-4 h-4 transform rotate-45 bg-white border-l border-t border-gray-100"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={clsx(
        'navigation',
        orientation === 'horizontal' && 'flex items-center space-x-1',
        orientation === 'vertical' && 'flex flex-col space-y-1',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {items.map(renderNavigationItem)}
    </nav>
  );
};

// Navigation data
export const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Grillz',
    href: '/grillz',
    children: [
      {
        label: 'Custom Grillz',
        href: '/grillz/custom',
      },
      {
        label: 'Pre-made Grillz',
        href: '/grillz/pre-made',
      },
      {
        label: 'Grillz Care',
        href: '/grillz/care',
      },
    ],
  },
  {
    label: 'Jewelry',
    href: '/jewelry',
    children: [
      {
        label: 'Chains',
        href: '/jewelry/chains',
      },
      {
        label: 'Rings',
        href: '/jewelry/rings',
      },
      {
        label: 'Pendants',
        href: '/jewelry/pendants',
      },
      {
        label: 'Earrings',
        href: '/jewelry/earrings',
      },
      {
        label: 'Bracelets',
        href: '/jewelry/bracelets',
      },
    ],
  },
  {
    label: 'Gallery',
    href: '/gallery',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'Book Consultation',
    href: '/book-consultation',
  },
];

export default Navigation;