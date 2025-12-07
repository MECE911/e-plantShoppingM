import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],   // [{ name, price, image, quantity }]
  },
  reducers: {

    // Add a plant to the cart. If it exists, increase quantity.
    addItem: (state, action) => {
      const plant = action.payload;
      const existing = state.items.find((item) => item.name === plant.name);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          quantity: 1,
        });
      }
    },

    // Increase quantity for a specific plant
    increase: (state, action) => {
      const name = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.quantity += 1;
      }
    },

    // Decrease quantity but never below 1 — if it hits 0, remove it
    decrease: (state, action) => {
      const name = action.payload;
      const item = state.items.find((item) => item.name === name);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // remove item if quantity hits zero
          state.items = state.items.filter((i) => i.name !== name);
        }
      }
    },

    // Completely remove an item from cart
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((item) => item.name !== name);
    },
  },
});

export const { addItem, increase, decrease, removeItem } = CartSlice.actions;

export default CartSlice.reducer;
