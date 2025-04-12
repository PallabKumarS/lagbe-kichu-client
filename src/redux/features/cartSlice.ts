import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TListing } from "@/types";

// Define the structure of a cart item
export type TCartItem = TListing & {
  quantity: number; // Number of items in the cart
};

interface ICartState {
  items: TCartItem[]; // Array of cart items
}

const initialState: ICartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a new item or update quantity if item already exists in the cart
    addToCart: (state, action) => {
      const newItem: TCartItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.listingId === newItem.listingId
      );

      if (existingItemIndex !== -1) {
        // If item exists, just update the quantity
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Add new item if not in the cart
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    // Remove an item from the cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.listingId !== action.payload
      );
    },

    // Increment or decrement the quantity of an item
    updateQuantity: (state, action) => {
      const { listingId, type } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.listingId === listingId
      );

      if (existingItemIndex !== -1) {
        const currentQty = state.items[existingItemIndex].quantity;

        if (type === "increment") {
          // Increase quantity
          state.items[existingItemIndex].quantity = currentQty + 1;
        } else if (type === "decrement" && currentQty > 1) {
          // Decrease quantity (don't allow going below 1)
          state.items[existingItemIndex].quantity = currentQty - 1;
        }
      }
    },

    // Clear all items from the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Selectors to access the state
export const cartSelector = (state: RootState) => state.cart.items;

// Actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice;
