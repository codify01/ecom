import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1; // Increment by given quantity or 1
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1; // Decrease quantity
      } else {
        state.items = state.items.filter(item => item.id !== action.payload); // Remove if quantity is 0
      }
    },
    clearCartItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  }
});

export const { addToCart, removeFromCart, clearCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
