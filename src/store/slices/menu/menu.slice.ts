import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRestaurant, LoadingStatus } from '../../../types';
import { RootState } from '../../app/store';
import { instance } from '../../../axios/instanse';
import { API_KEYS } from '../../../common/constants';

export interface IMenuState {
  menu: IRestaurant | null;
  status: LoadingStatus;
}

const initialState: IMenuState = {
  menu: null,
  status: LoadingStatus.idle
};

interface IGetMenuRequest {
  cafeId: string;
  tableId: string;
}

export const getMenu = createAsyncThunk('menu/getMenu', async ({cafeId, tableId}: IGetMenuRequest) => {
  const { data } 
    = await instance.get(`${API_KEYS.MENU}/${cafeId}/${tableId}`);

  return data;
});

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMenu.pending, (state) => {
      state.status = LoadingStatus.loading;
    })
    builder.addCase(getMenu.fulfilled, (state, action) => {
      state.status = LoadingStatus.success;
      state.menu = action.payload;
    })
    builder.addCase(getMenu.rejected, (state) => {
      state.status = LoadingStatus.failed;
    })
  }
});

export const selectRestaurant = (state: RootState) => state.menu;

export default menuSlice.reducer;