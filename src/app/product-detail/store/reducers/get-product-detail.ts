/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../model/index';

interface ProductDetailState {
  productDetail: Product | null;
  loading: boolean;
  payload: any;
}

const initialState: ProductDetailState = {
  productDetail: null,
  loading: false,
  payload: null,
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getProductDetailHanlder: (state, action) => {
      state.loading = true;
      state.payload = action?.payload;
    },
    getProductDetailSuccess: (state, action) => {
      state.productDetail = action.payload;
      state.loading = false;
    },
    getProductDetailFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getProductDetailHanlder,
  getProductDetailSuccess,
  getProductDetailFailure,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;
