import { Product } from '@/app/model';
import { createSlice } from '@reduxjs/toolkit';

interface CateListState {
  latestProduct: Product[];
  loading: boolean;
}

const initialState: CateListState = {
  latestProduct: [],
  loading: false,
};

const latestProductSlice = createSlice({
  name: 'latestProduct',
  initialState,
  reducers: {
    getLatestProductHanlder: (state) => {
      state.loading = true;
    },
    getLatestProductSuccess: (state, action) => {
      state.latestProduct = action.payload;
      state.loading = false;
    },
    getLatestProductFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getLatestProductHanlder,
  getLatestProductSuccess,
  getLatestProductFailure,
} = latestProductSlice.actions;

export default latestProductSlice.reducer;
