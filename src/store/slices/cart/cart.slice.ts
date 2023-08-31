import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../../common/constants';
import { IBill, IDish } from '../../../types';
import { RootState } from '../../app/store';

export interface ICartItem {
  dish: IDish;
  quantity: number;
  volumeId: number;
}

export interface ICartState {
  bill: IBill;
  cartItems: ICartItem[];
}

const initialState: ICartState = {
  bill: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.BILL) || '{}'),
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
    increaseCount: (state: ICartState, action: PayloadAction<{ dish: IDish, volumeId: number }>) => {
      const { dish, volumeId } = action.payload;

      const item = state.cartItems?.find((item) => (
        item.dish.id === dish.id && item.volumeId === volumeId
      ));

      if (item) {
        item.quantity = item.quantity + 1;
      } else {
        state.cartItems.push({dish, quantity: 1, volumeId })
      }

      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));

    },
    decreaseCount: (state: ICartState, action: PayloadAction<{ dish: IDish, volumeId: number }>) => {
      const { dish, volumeId } = action.payload;
    
      const findedItemIndex = state.cartItems?.findIndex((item) => item.dish.id === dish.id && item.volumeId === volumeId);
    
      if (findedItemIndex !== -1) {
        const findedItem = state.cartItems[findedItemIndex];
        
        if (findedItem.quantity === 1) {
          state.cartItems.splice(findedItemIndex, 1);
        } else {
          findedItem.quantity = findedItem.quantity - 1;
        }
      }
    
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
    },
    clearCart: (state: ICartState) => {
      state.cartItems = [];

      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
    },
    updateBill: (state: ICartState, action: PayloadAction<IBill>) => {
      state.bill = action.payload;
      // if (state.bill.totalSum) {
      //   const combinedOrderedDish 
      //     = [...state.bill.orderedDish, ...action.payload.orderedDish].reduce((acc, { dish, quantity, volumeId }) => {
      //       const { id } = dish;
      //       if (acc[id]) {
      //         acc[id].quantity += quantity
      //       } else {
      //         acc[id] = { dish, quantity, volumeId }
      //       }
      //       return acc;
      //     }, {} as { [id: number]: ICartItem })
      //   state.bill = {
      //     orderedDish: Object.values(combinedOrderedDish),
      //     totalSum: action.payload.totalSum + state.bill.totalSum,
      //   }
      // } else {
      //   state.bill = {...action.payload}
      // }

      sessionStorage.setItem(STORAGE_KEYS.BILL, JSON.stringify(state.bill))
    },
    removeBill: (state: ICartState) => {
      state.bill = JSON.parse('{}');
      sessionStorage.setItem(STORAGE_KEYS.BILL, JSON.stringify(state.bill))
    }
  }
});

export const { 
  removeFromCart, 
  increaseCount, 
  decreaseCount, 
  clearCart, 
  updateBill, 
  removeBill,
} = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectBill = (state: RootState) => state.cart.bill;
export default cartSlice.reducer;