'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { MobileMenuProps, NavigationItem, Language } from '@/types';

/**
 * Mobile slide-in navigation menu with full screen overlay
 * Features smooth animations and luxury styling
 */
export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigation,
  className,
}) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState<Language['code']>('en');

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'gr', name: 'Ελληνικά', flag: '🇬🇷' },
  ];

  // Prevent body scroll when menu is open
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

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleExpanded = (label: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedItems(newExpanded);
  };

  const handleLanguageChange = (langCode: Language['code']) => {
    setSelectedLanguage(langCode);
    // Here you would implement actual language switching logic
    console.log('Language changed to:', langCode);
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.label);
    const itemIsActive = isActive(item.href);

    return (
      <div key={item.label} className={clsx('w-full', level > 0 && 'ml-4')}>
        <div className="flex items-center justify-between">
          <Link
            href={item.href}
            className={clsx(
              'flex-1 py-4 px-6 text-left transition-colors duration-200',
              'border-b border-gray-100/20',
              itemIsActive
                ? 'text-[var(--homer-gold)] bg-[var(--homer-gold)]/5'
                : 'text-white hover:text-[var(--homer-gold)] hover:bg-white/5',
              level === 0 ? 'text-lg font-medium' : 'text-base font-normal',
            )}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            onClick={!hasChildren ? onClose : undefined}
          >
            <span className="flex items-center gap-3">
              {item.icon && (
                <span className={clsx('shrink-0', level === 0 ? 'w-5 h-5' : 'w-4 h-4')}>
                  {item.icon}
                </span>
              )}
              {item.label}
            </span>
          </Link>

          {hasChildren && (
            <button
              type="button"
              onClick={() => toggleExpanded(item.label)}
              className={clsx(
                'p-4 text-white hover:text-[var(--homer-gold)] transition-colors duration-200',
                'focus:outline-none focus:text-[var(--homer-gold)]'
              )}
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label} menu`}
            >
              <svg
                className={clsx(
                  'w-5 h-5 transition-transform duration-300',
                  isExpanded && 'rotate-180'
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
            </button>
          )}
        </div>

        {/* Submenu */}
        {hasChildren && (
          <div
            className={clsx(
              'overflow-hidden transition-all duration-300 bg-black/20',
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            {item.children?.map((child) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        className={clsx(
          'fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-gray-900 to-black z-50',
          'transform transition-transform duration-300 ease-in-out md:hidden',
          'shadow-2xl shadow-black/50',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <Link
            href="/"
            className="text-2xl font-bold text-[var(--homer-gold)]"
            style={{ fontFamily: 'Cinzel, serif' }}
            onClick={onClose}
          >
            HOMER
          </Link>
          
          <button
            type="button"
            onClick={onClose}
            className={clsx(
              'p-2 text-white hover:text-[var(--homer-gold)] transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[var(--homer-gold)] rounded-lg'
            )}
            aria-label="Close mobile menu"
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

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-4" role="navigation" aria-label="Mobile navigation">
            {navigation.map((item) => renderNavigationItem(item))}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="p-6 border-t border-gray-700/50 bg-black/20">
          {/* Language Switcher */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wider">
              Language
            </h3>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium',
                    'transition-colors duration-200',
                    selectedLanguage === lang.code
                      ? 'bg-[var(--homer-gold)] text-black'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Athens • Southampton</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+30 123 456 7890</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;