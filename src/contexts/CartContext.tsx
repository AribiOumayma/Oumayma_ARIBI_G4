// src/contexts/CartContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartItem, CartManager } from '../data/cart';

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (coffee: any) => void;
  removeFromCart: (uniqueId: string) => void;
  increaseQuantity: (uniqueId: string) => void;
  decreaseQuantity: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (coffeeId: string) => boolean;
  getQuantity: (coffeeId: string) => number;
  refreshCart: () => void;
  isVariantInCart: (coffee: any) => boolean;
  getVariantQuantity: (coffee: any) => number;
  getItemByUniqueId: (uniqueId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(CartManager.getCartItems());
  const [totalItems, setTotalItems] = useState<number>(CartManager.getTotalItems());
  const [totalPrice, setTotalPrice] = useState<number>(CartManager.getTotalPrice());

  const refreshCart = () => {
    setCartItems(CartManager.getCartItems());
    setTotalItems(CartManager.getTotalItems());
    setTotalPrice(CartManager.getTotalPrice());
  };

  const addToCart = (coffee: any) => {
    CartManager.addToCart(coffee);
    refreshCart();
  };

  const removeFromCart = (uniqueId: string) => {
    CartManager.removeFromCart(uniqueId);
    refreshCart();
  };

  const increaseQuantity = (uniqueId: string) => {
    CartManager.increaseQuantity(uniqueId);
    refreshCart();
  };

  const decreaseQuantity = (uniqueId: string) => {
    CartManager.decreaseQuantity(uniqueId);
    refreshCart();
  };

  const updateQuantity = (uniqueId: string, quantity: number) => {
    CartManager.updateQuantity(uniqueId, quantity);
    refreshCart();
  };

  const clearCart = () => {
    CartManager.clearCart();
    refreshCart();
  };

  const isInCart = (coffeeId: string) => {
    return CartManager.isInCart(coffeeId);
  };

  const getQuantity = (coffeeId: string) => {
    return CartManager.getQuantity(coffeeId);
  };

  const isVariantInCart = (coffee: any) => {
    return CartManager.isVariantInCart(coffee);
  };

  const getVariantQuantity = (coffee: any) => {
    return CartManager.getVariantQuantity(coffee);
  };

  const getItemByUniqueId = (uniqueId: string) => {
    return CartManager.getItemByUniqueId(uniqueId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        isInCart,
        getQuantity,
        refreshCart,
        isVariantInCart,
        getVariantQuantity,
        getItemByUniqueId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};