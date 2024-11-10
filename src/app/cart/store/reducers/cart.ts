/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cart, CreateCartDTO } from '@/app/model/cart.model';
import { createSlice } from '@reduxjs/toolkit';

interface cartState {
  loading: boolean;
  payload: CreateCartDTO | null;
  // callback: () => any;
  cart: Cart | null;
  amount: number;
}

const initialState: cartState = {
  loading: false,
  payload: null,
  cart: null,
  amount: 0,
  // callback: () => {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    createCartHanlder: (state, action) => {
      state.loading = true;
      state.payload = action?.payload?.cart;
      // state.callback = action?.payload?.callback;
    },
    createCartSuccess: (state) => {
      state.loading = false;
      state.amount = 1;
    },
    createCartFailure: (state) => {
      state.loading = false;
    },
    updateCartHanlder: (state, action) => {
      state.loading = true;
      state.payload = action?.payload?.cart;
      // state.callback = action?.payload?.callback;
    },
    updateCartSuccess: (state, action) => {
      state.loading = false;
      state.amount = action?.payload?.products?.length;
      state.cart = action?.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCartHanlder: (state, action) => {
      state.loading = true;
      // state.payload = action?.payload?.cart;
      // state.callback = action?.payload?.callback;
    },
    getCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action?.payload;
      state.amount = action?.payload?.products?.length;
    },
    getCartFailure: (state) => {
      state.loading = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeCartItemHanlder: (state, action) => {
      state.loading = true;
    },
    removeCartItemSuccess: (state, action) => {
      state.loading = false;
      state.amount = action?.payload?.products?.length;
      state.cart = action?.payload;
    },
  },
});

export const {
  createCartHanlder,
  createCartSuccess,
  createCartFailure,
  updateCartHanlder,
  updateCartSuccess,
  getCartHanlder,
  getCartSuccess,
  getCartFailure,
  removeCartItemHanlder,
  removeCartItemSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
