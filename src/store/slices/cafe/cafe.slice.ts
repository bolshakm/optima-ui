import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICafe, LoadingStatus } from '../../../types';
import { RootState } from '../../app/store';
import { instance } from '../../../axios/instanse';
import { API_KEYS } from '../../../common/constants';

export interface ICafeState {
  cafe: ICafe | null;
  status: LoadingStatus;
}

const initialState: ICafeState = {
  cafe: null,
  status: LoadingStatus.idle
};

interface IGetCafeRequest {
  cafeId: string;
}

export const getCafe = createAsyncThunk('cafe/getCafe', async ({cafeId = '1'}: IGetCafeRequest) => {
  const { data } = await instance.get(`${API_KEYS.CAFE}/${cafeId}`);

  return data;
});

export const menuSlice = createSlice({
  name: 'cafe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCafe.pending, (state) => {
      state.status = LoadingStatus.loading;
    })
    builder.addCase(getCafe.fulfilled, (state, action) => {
      state.status = LoadingStatus.success;
      state.cafe = action.payload;
    })
    builder.addCase(getCafe.rejected, (state) => {
      state.status = LoadingStatus.failed;
    })
  }
});

export const selectCafe = (state: RootState) => state.cafe;

export default menuSlice.reducer;