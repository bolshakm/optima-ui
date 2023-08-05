import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer from '../slices/restaurant/restaurant.slice';
import cartReducer from '../slices/cart/cart.slice';

const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;