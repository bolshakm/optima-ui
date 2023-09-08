import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICafe, LoadingStatus } from '../../../types';
import { RootState } from '../../app/store';
import { instance } from '../../../axios/instanse';
import { API_KEYS, STORAGE_KEYS } from '../../../common/constants';

export interface ICafeState {
  cafeId: string;
  tableId: string;
  cafe: ICafe | null;
  status: LoadingStatus;
}

const initialState: ICafeState = {
  cafeId: sessionStorage.getItem(STORAGE_KEYS.CAFE) || "",
  tableId: sessionStorage.getItem(STORAGE_KEYS.TABLE) || "",
  cafe: null,
  status: LoadingStatus.idle
};

interface IGetCafeRequest {
  cafeId: string;
}

export const getCafe = createAsyncThunk('cafe/getCafe', async ({cafeId}: IGetCafeRequest) => {
  const { data } = await instance.get(`${API_KEYS.CAFE}/${cafeId}`);

  return data;
});

export const cafeSlice = createSlice({
  name: 'cafe',
  initialState,
  reducers: {
    setCafeId: (state: ICafeState, action: PayloadAction<string>) => {
      state.cafeId = action.payload;
      sessionStorage.setItem(STORAGE_KEYS.CAFE, action.payload);
    },
    setTableId: (state: ICafeState, action: PayloadAction<string>) => {
      state.tableId = action.payload;
      sessionStorage.setItem(STORAGE_KEYS.TABLE, action.payload);
    },
  },
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
export const { setCafeId, setTableId } = cafeSlice.actions;
export default cafeSlice.reducer;