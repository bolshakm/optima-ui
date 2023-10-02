import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRestaurant, Language, LoadingStatus } from '../../../types';
import { RootState } from '../../app/store';
import { instance } from '../../../axios/instanse';
import { API_KEYS, STORAGE_KEYS } from '../../../common/constants';

export interface IMenuState {
  menu: IRestaurant | null;
  status: LoadingStatus;
  language: Language | null;
}

const initialState: IMenuState = {
  menu: null,
  status: LoadingStatus.idle,
  language: sessionStorage.getItem(STORAGE_KEYS.LANG) as Language
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
  reducers: {
    setLanguage: (state: IMenuState, action: PayloadAction<Language>) => {
      state.language = action.payload;

      sessionStorage.setItem(STORAGE_KEYS.LANG, action.payload)
    }
  },
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

export const selectMenu = (state: RootState) => state.menu;
export const selectLanguage = (state: RootState) => state.menu.language;

export const { setLanguage } = menuSlice.actions;
export default menuSlice.reducer;