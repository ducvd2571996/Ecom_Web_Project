import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../../model/index';

interface ProductListState {
  productList: Product[];
  loading: boolean;
}

const initialState: ProductListState = {
  productList: [],
  loading: false,
};

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getProductListHanlder: (state, action) => {
      state.loading = true;
    },
    getProductListSuccess: (state, action) => {
      state.productList = action.payload;
      state.loading = false;
    },
    getProductListFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getProductListHanlder,
  getProductListSuccess,
  getProductListFailure,
} = productListSlice.actions;

export default productListSlice.reducer;
