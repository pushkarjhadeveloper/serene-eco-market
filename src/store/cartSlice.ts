
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string | number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  theme?: string;
  category: string; // For GST calculation
}

interface CartState {
  items: CartItem[];
}

// Load cart items from localStorage on initial load
const loadCartFromStorage = (): CartState => {
  try {
    const storedCart = localStorage.getItem('ecohaven-cart');
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return { items: [] };
};

const initialState: CartState = loadCartFromStorage();

// Helper function to save cart to localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem('ecohaven-cart', JSON.stringify({ items: cart }));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({...action.payload, quantity: action.payload.quantity || 1});
      }
      
      // Save updated cart to localStorage
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      // Save updated cart to localStorage
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{id: string | number, change: number}>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + action.payload.change);
        
        // Save updated cart to localStorage
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      
      // Clear cart from localStorage
      localStorage.removeItem('ecohaven-cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
