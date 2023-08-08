import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer from '../slices/menu/menu.slice';
import cartReducer from '../slices/cart/cart.slice';
import cafeReducer from '../slices/cafe/cafe.slice';


const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    cart: cartReducer,
    cafe: cafeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;