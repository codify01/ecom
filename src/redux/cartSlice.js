import { createSlice } from '@reduxjs/toolkit';
import { saveCartToLocalStorage } from '../utilities/localStorageutils';
import { updateCartOnServer } from '../utilities/apiUtils';
import { useSelector } from 'react-redux';



const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 })
      }
      saveCartToLocalStorage(state.items);
      updateCartOnServer(state.items, user);
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload)
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1; 
      } else {
        state.items = state.items.filter(item => item.id !== action.payload)
      }
      saveCartToLocalStorage(state.items);
      updateCartOnServer(state.items, user);
    },
    clearCartItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      saveCartToLocalStorage(state.items);
      updateCartOnServer(state.items, user);
    },
    clearCart: (state) => {
      state.items = []
      saveCartToLocalStorage([]);
      updateCartOnServer([]);
    },
  }
});

export const { addToCart, removeFromCart, clearCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
