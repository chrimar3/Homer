'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Grillz', href: '/grillz' },
    { label: 'Jewelry', href: '/jewelry' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-cinzel text-2xl sm:text-3xl font-bold text-homer-gold tracking-wider">
                HOMER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-montserrat text-sm uppercase tracking-wider transition-colors duration-200',
                    pathname === item.href
                      ? 'text-homer-gold'
                      : isScrolled
                      ? 'text-homer-black hover:text-homer-gold'
                      : 'text-white hover:text-homer-lightGold'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/book-consultation"
                className={cn(
                  'px-6 py-2 border-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300',
                  isScrolled
                    ? 'border-homer-gold text-homer-gold hover:bg-homer-gold hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-homer-black'
                )}
              >
                Book Consultation
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  className={cn(
                    'text-xs font-medium transition-colors',
                    isScrolled ? 'text-homer-black/60' : 'text-white/60'
                  )}
                >
                  EN
                </button>
                <span className={cn(
                  'text-xs',
                  isScrolled ? 'text-homer-black/40' : 'text-white/40'
                )}>
                  |
                </span>
                <button
                  className={cn(
                    'text-xs font-medium transition-colors',
                    isScrolled ? 'text-homer-black/60' : 'text-white/60'
                  )}
                >
                  GR
                </button>
              </div>

              {/* Cart */}
              <button className="relative">
                <svg
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isScrolled ? 'text-homer-black' : 'text-white'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-homer-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
              >
                <svg
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isScrolled ? 'text-homer-black' : 'text-white'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-homer-black/95 z-40 lg:hidden transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-cinzel text-2xl text-white hover:text-homer-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book-consultation"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-8 py-3 border-2 border-homer-gold text-homer-gold hover:bg-homer-gold hover:text-white transition-all duration-300 font-semibold uppercase tracking-wider"
          >
            Book Consultation
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;