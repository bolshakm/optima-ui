import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITexts, Language, LoadingStatus } from '../../types';
import { RootState } from '../app/store';
import { instance } from '../../axios/instanse';
import { API_KEYS, STORAGE_KEYS } from '../../common/constants';

export interface ITextsState {
  texts: ITexts;
  status: LoadingStatus;
}

const initialState: ITextsState = {
  texts: JSON.parse(sessionStorage.getItem(STORAGE_KEYS.LOCAL) || '{}'),
  status: LoadingStatus.idle
};

export const getTexts = createAsyncThunk('menu/getTexts', async (key: Language) => {
  const { data } 
    = await instance.get(`${API_KEYS.LOCAL}?lang=${key}`);

  return data;
});

export const textsSlice = createSlice({
  name: 'texts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTexts.pending, (state) => {
      state.status = LoadingStatus.loading;
    })
    builder.addCase(getTexts.fulfilled, (state, action) => {
      state.status = LoadingStatus.success;
      state.texts = action.payload;
      sessionStorage.setItem(STORAGE_KEYS.LOCAL, JSON.stringify(action.payload))
    })
    builder.addCase(getTexts.rejected, (state) => {
      state.status = LoadingStatus.failed;
    })
  }
});

export const selectTexts = (state: RootState) => state.texts;

export default textsSlice.reducer;