import React, { createContext, useContext, ReactNode, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface CartContextType {
  selectedProducts: string[]; // array of product IDs
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  isProductSelected: (productId: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useLocalStorage<string[]>('selectedProducts', []);

  const addProduct = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(id => id !== productId));
  };

  const isProductSelected = (productId: string) => {
    return selectedProducts.includes(productId);
  };

  const clearCart = () => {
    setSelectedProducts([]);
  };

  const value = { selectedProducts, addProduct, removeProduct, isProductSelected, clearCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
