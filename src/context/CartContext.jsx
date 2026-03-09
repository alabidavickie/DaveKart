/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('davekart_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('davekart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // New item
        return [...prevItems, { ...product, selectedSize, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, selectedSize) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === productId && item.selectedSize === selectedSize))
    );
  };

  const updateQuantity = (productId, selectedSize, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.id === productId && item.selectedSize === selectedSize) 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Derived state
  const cartTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Real world logic: standard shipping implies ₦2500 flat, free over ₦100k
  const shippingCost = cartSubtotal > 0 && cartSubtotal < 100000 ? 2500 : 0;
  const taxAmount = Math.round(cartSubtotal * 0.075); // 7.5% VAT in Nigeria roughly
  const cartTotal = cartSubtotal + shippingCost + taxAmount;

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotalItems,
      cartSubtotal,
      shippingCost,
      taxAmount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
