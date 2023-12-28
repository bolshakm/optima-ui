import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEYS, STORAGE_KEYS } from '../../../common/constants';
import { IBill, IDish, IExtra, LoadingStatus } from '../../../types';
import { RootState } from '../../app/store';
import { instance } from '../../../axios/instanse';
import { ICombination } from '../../../types/combination.interface';

export interface ICartItem {
  dish: IDish;
  quantity: number;
  volumeId: number;
  extras: IExtra[];
}

export interface ISelectedDishes {
  [key: string]: {
    dish: IDish; 
    extrass: IExtra[]
  }[]
}

export interface ICombinationItem {
  id: string;
  combinationId: number;
  orderedDishesForms: ISelectedDishes,
  combination: ICombination;
  qty: number;
  totalPrice: number;
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
  combinationsItems: ICombinationItem[];
}

interface ICheckOrderRequest {
  cafeId: string;
  tableId: string;
}

const initialState: ICartState = {
  bill: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.BILL) || '{}'),
  cartItems: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.CART) || '[]'),
  favouritesItems: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.FAVOURITES) || '[]'),
  combinationsItems: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.COMBINATIONS) || '[]'),
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
      state.combinationsItems = [];

      sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cartItems));
    },
    updateBill: (state: ICartState, action: PayloadAction<IBill>) => {
      state.bill = action.payload;

      sessionStorage.setItem(STORAGE_KEYS.BILL, JSON.stringify(state.bill))
    },
    removeBill: (state: ICartState) => {
      state.bill = JSON.parse('{}');
      sessionStorage.setItem(STORAGE_KEYS.BILL, JSON.stringify(state.bill))
    },
    addCombination: (
      state: ICartState, 
      action: PayloadAction<{
        orderedDishesForms: ISelectedDishes, 
        combinationId: number, 
        totalPrice: number,
        combination: ICombination,
        id: string,
      }>
      ) => {
      const { orderedDishesForms, combinationId, totalPrice, combination, id } = action.payload;
  
      state.combinationsItems.push({
        id,
        combinationId,
        combination,
        orderedDishesForms,
        qty: 1,
        totalPrice,
      })
    },
    updateCombination: (
      state: ICartState, 
      action: PayloadAction<{id: string, combination: ISelectedDishes, totalPrice: number}>
      ) => {
      const { combination, id, totalPrice } = action.payload;
  
      state.combinationsItems = state.combinationsItems.map((el) => {
        if (el.id === id) {
          el.orderedDishesForms = combination;
          el.totalPrice = totalPrice;
        }

        return el;
      })
    },
    increaseCombinationQty: (state: ICartState, action: PayloadAction<{id: string}>) => {
      const { id } = action.payload;
  
      const combination = state.combinationsItems.find((el) => el.id === id);

      if (combination) {
        combination.qty = combination.qty + 1
      }
    },
    decreaseCombinationQty: (state: ICartState, action: PayloadAction<{id: string}>) => {
      const { id } = action.payload;
  
      const combination = state.combinationsItems.find((el) => el.id === id);

      if (combination && combination.qty >  1) {
        combination.qty = combination.qty - 1;
      } else {
        state.combinationsItems = state.combinationsItems.filter((el) => el.id !== id)
      }
    },
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
  addCombination,
  updateCombination,
  increaseCombinationQty,
  decreaseCombinationQty,
} = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectFavourites = (state: RootState) => state.cart.favouritesItems;
export const selectCombinations = (state: RootState) => state.cart.combinationsItems;
export const selectCombination = (id: string) => (state: RootState) => (
  state.cart.combinationsItems.find((el) => el.id === id)
);
export const selectBill = (state: RootState) => state.cart.bill;
export default cartSlice.reducer;