'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default LayoutContent;