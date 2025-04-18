import React, { createContext, useState, useEffect } from 'react';
import { Product } from '@shared/schema';

interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotalPrice: () => 0,
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addToCart = (newItem: CartItem) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.product.id === newItem.product.id && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(newItem.selectedOptions)
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, newItem];
      }
    });
  };
  
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart, 
        getTotalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
