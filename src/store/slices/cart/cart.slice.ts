import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEYS, STORAGE_KEYS } from '../../../common/constants';
import { IBill, IDish, IExtra, LoadingStatus } from '../../../types';
import { RootState } from '../../app/store';
import { instance } from '../../../axios/instanse';

export interface ICartItem {
  dish: IDish;
  quantity: number;
  volumeId: number;
  extras: IExtra[];
}

export interface IFavouriteItem {
  dish: IDish;
  volumeId: number;
  extras: IExtra[];
}

export interface ICartState {
  checkStatus: LoadingStatus;
  bill: IBill;
  cartItems: ICartItem[];
  favouritesItems: IFavouriteItem[];
}

interface ICheckOrderRequest {
  cafeId: string;
  tableId: string;
}

const initialState: ICartState = {
  bill: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.BILL) || '{}'),
  cartItems: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.CART) || '[]'),
  favouritesItems: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.FAVOURITES) || '[]'),
  checkStatus: LoadingStatus.idle,
};

export const checkOrder = createAsyncThunk('cart/getCafe', 
  async ({cafeId, tableId}: ICheckOrderRequest, { dispatch }) => {
  const { status, data } = await instance.get(`${API_KEYS.CHECK_ORDER}/${cafeId}/${tableId}`);

  if (status === 204) {
    dispatch(removeBill())
  } else {
    dispatch(updateBill(data))
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state: ICartState, action: PayloadAction<{ id: number }>) => {
      state.cartItems =
        state.cartItems?.filter((item) => item.dish.id !== action.payload.id) || null;

      sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
    },
    increaseCount: (state: ICartState, action: PayloadAction<{ dish: IDish, volumeId: number }>) => {
      const { dish, volumeId } = action.payload;

      const item = state.cartItems?.find((item) => (
        item.dish.id === dish.id && item.volumeId === volumeId
      ));

      if (item) {
        item.quantity = item.quantity + 1;
      } else {
        state.cartItems.push({dish, quantity: 1, volumeId, extras: []})
      }

      sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
    },
    addRemoveExtra: (state: ICartState, action: PayloadAction<{ dish: IDish, volumeId: number, extra: IExtra }>) => {
      const { dish, volumeId, extra } = action.payload;

      const item = state.cartItems?.find((item) => (
        item.dish.id === dish.id && item.volumeId === volumeId
      ));

      if (!item) return;

      const extraIndex = item.extras.findIndex((existExtra) => existExtra.id === extra.id);

      if (extraIndex !== -1) {
        item?.extras.splice(extraIndex, 1)
      } else {
        item?.extras.push(extra);
      }

      sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
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
    
      sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
    },
    updateFavourites: (state: ICartState, action: PayloadAction<{ dish: IDish, volumeId: number }>) => {
      const { dish, volumeId } = action.payload;

      const findedItemIndex = state.favouritesItems?.findIndex((item) => (
        item.dish.id === dish.id && item.volumeId === volumeId
      ));

      if (findedItemIndex !== -1) {
        state.favouritesItems.splice(findedItemIndex, 1);
      } else {
        state.favouritesItems.push({dish, volumeId, extras: []})
      }

      sessionStorage.setItem(STORAGE_KEYS.FAVOURITES, JSON.stringify(state.favouritesItems));
    },
    addRemoveExtraToFromFavourites: (state: ICartState, action: PayloadAction<{ dish: IDish, volumeId: number, extra: IExtra }>) => {
      const { dish, volumeId, extra } = action.payload;

      const item = state.favouritesItems?.find((item) => (
        item.dish.id === dish.id && item.volumeId === volumeId
      ));

      if (!item) return;

      const extraIndex = item.extras.findIndex((existExtra) => existExtra.id === extra.id);

      if (extraIndex !== -1) {
        item?.extras.splice(extraIndex, 1)
      } else {
        item?.extras.push(extra);
      }

      sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.favouritesItems));
    },
    clearCart: (state: ICartState) => {
      state.cartItems = [];

      sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
    },
    updateBill: (state: ICartState, action: PayloadAction<IBill>) => {
      state.bill = action.payload;

      sessionStorage.setItem(STORAGE_KEYS.BILL, JSON.stringify(state.bill))
    },
    removeBill: (state: ICartState) => {
      state.bill = JSON.parse('{}');
      sessionStorage.setItem(STORAGE_KEYS.BILL, JSON.stringify(state.bill))
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkOrder.pending, (state) => {
      state.checkStatus = LoadingStatus.loading;
    })
    builder.addCase(checkOrder.rejected, (state) => {
      state.checkStatus = LoadingStatus.failed;
    })
  }
});

export const { 
  removeFromCart, 
  increaseCount, 
  decreaseCount, 
  clearCart, 
  updateBill, 
  removeBill,
  updateFavourites,
  addRemoveExtra,
  addRemoveExtraToFromFavourites,
} = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectFavourites = (state: RootState) => state.cart.favouritesItems;
export const selectBill = (state: RootState) => state.cart.bill;
export default cartSlice.reducer;