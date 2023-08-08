import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../../common/constants';
import { IDish } from '../../../types';
import { RootState } from '../../app/store';

export interface ICartItem {
  dish: IDish;
  quantity: number;
}

export interface ICartState {
  cartItems: ICartItem[];
}

const initialState: ICartState = {
  cartItems: JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]')
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state: ICartState, action: PayloadAction<{ id: number }>) => {
      state.cartItems =
        state.cartItems?.filter((item) => item.dish.id !== action.payload.id) || null;

      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
    },
    increaseCount: (state: ICartState, action: PayloadAction<{ dish: IDish }>) => {
      const item = state.cartItems?.find((item) => item.dish.id === action.payload.dish.id);

      if (item) {
        item.quantity = item.quantity + 1;
      } else {
        state.cartItems.push({dish: action.payload.dish, quantity: 1})
      }

      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));

    },
    decreaseCount: (state: ICartState, action: PayloadAction<{ dish: IDish }>) => {
      const item = state.cartItems?.find((item) => item.dish.id === action.payload.dish.id);

      if (item) {
        if (item.quantity === 1) {
          state.cartItems =
            state.cartItems?.filter((item) => item.dish.id !== action.payload.dish.id);
        } else {
          item.quantity = item.quantity - 1;
        }
      }

      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));

    },
    clearCart: (state: ICartState) => {
      state.cartItems = [];

      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
    }
  }
});

export const { removeFromCart, increaseCount, decreaseCount, clearCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export default cartSlice.reducer;