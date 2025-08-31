import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-homer-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-2xl font-bold text-homer-gold">HOMER</h3>
            <p className="text-homer-gray-400 text-sm leading-relaxed">
              Greece's first specialized Grillz maker. Crafting luxury jewelry with passion and precision.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-homer-gray-400 hover:text-homer-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.27 6.27 0 00-1-.05A6.34 6.34 0 003 15.69a6.34 6.34 0 0011.14 4.16V13a8.16 8.16 0 004.65 1.46v-3.28a4.84 4.84 0 01-.9-.49z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-homer-gray-400 hover:text-homer-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-homer-gray-400 hover:text-homer-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/grillz" className="text-homer-gray-400 hover:text-homer-gold transition-colors text-sm">Custom Grillz</Link></li>
              <li><Link href="/jewelry" className="text-homer-gray-400 hover:text-homer-gold transition-colors text-sm">Fine Jewelry</Link></li>
              <li><Link href="/gallery" className="text-homer-gray-400 hover:text-homer-gold transition-colors text-sm">Gallery</Link></li>
              <li><Link href="/about" className="text-homer-gray-400 hover:text-homer-gold transition-colors text-sm">About Us</Link></li>
              <li><Link href="/book-consultation" className="text-homer-gray-400 hover:text-homer-gold transition-colors text-sm">Book Consultation</Link></li>
            </ul>
          </div>

          {/* Athens Location */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold mb-4">Athens</h4>
            <div className="space-y-2 text-sm text-homer-gray-400">
              <p>Kolonaki District</p>
              <p>Athens, Greece 10673</p>
              <a href="tel:+306949344777" className="block hover:text-homer-gold transition-colors">
                +30 694 934 4777
              </a>
              <p>Mon-Sat: By Appointment</p>
            </div>
          </div>

          {/* Southampton Location */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold mb-4">Southampton</h4>
            <div className="space-y-2 text-sm text-homer-gray-400">
              <p>West Quay</p>
              <p>Southampton, UK SO15</p>
              <a href="tel:+447123456789" className="block hover:text-homer-gold transition-colors">
                +44 7123 456 789
              </a>
              <p>Mon-Sat: By Appointment</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-homer-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-cinzel text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-homer-gray-400 text-sm mb-4">
              Subscribe to receive exclusive offers and new collection announcements.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-homer-gray-900 border border-homer-gray-700 text-white placeholder-homer-gray-500 focus:border-homer-gold focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-homer-gold text-white font-semibold hover:bg-homer-darkGold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-homer-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-homer-gray-400 text-sm">
              © 2024 Homer The Jeweller. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-homer-gray-400 hover:text-homer-gold transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-homer-gray-400 hover:text-homer-gold transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-homer-gray-400 hover:text-homer-gold transition-colors text-sm">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;