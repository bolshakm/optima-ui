import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRestaurant, LoadingStatus } from '../../../types';
import { RootState } from '../../app/store';
import { instance } from '../../../axios/instanse';
import { API_KEYS } from '../../../common/constants';

export interface IRestaurantState {
  restaurant: IRestaurant | null;
  status: LoadingStatus;
}

const initialState: IRestaurantState = {
  restaurant: null,
  status: LoadingStatus.idle
};

export const getRestaurant = createAsyncThunk('restaurant/getRestaurant', async (table: string = '1') => {
  const { data } = await instance.get(`${API_KEYS.RESTAURANT}/${table}`);

  return data;
});

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurant.pending, (state) => {
      state.status = LoadingStatus.loading;
    })
    builder.addCase(getRestaurant.fulfilled, (state, action) => {
      state.status = LoadingStatus.success;
      state.restaurant = action.payload;
    })
    builder.addCase(getRestaurant.rejected, (state) => {
      state.status = LoadingStatus.failed;
    })
  }
});

export const selectRestaurant = (state: RootState) => state.restaurant;

export default restaurantSlice.reducer;