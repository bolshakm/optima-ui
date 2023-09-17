import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../slices/menu/menu.slice';
import cartReducer from '../slices/cart/cart.slice';
import cafeReducer from '../slices/cafe/cafe.slice';
import textsReducer from '../slices/texts.slice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    cafe: cafeReducer,
    texts: textsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;