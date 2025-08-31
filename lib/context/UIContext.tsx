'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface UIContextType {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  toggleMobileMenu: () => void;
  toggleCart: () => void;
  toggleSearch: () => void;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeAll: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  }, []);

  const openModal = useCallback((content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setModalContent(null), 300);
  }, []);

  const closeAll = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    setIsSearchOpen(false);
    closeModal();
  }, [closeModal]);

  const value: UIContextType = {
    isMobileMenuOpen,
    isCartOpen,
    isSearchOpen,
    isModalOpen,
    modalContent,
    toggleMobileMenu,
    toggleCart,
    toggleSearch,
    openModal,
    closeModal,
    closeAll,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};