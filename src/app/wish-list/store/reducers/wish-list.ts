/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '@/app/model';
import { createSlice } from '@reduxjs/toolkit';

interface WishListState {
  wishList: Product[] | [];
}

const initialState: WishListState = {
  wishList: [],
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    removeWishList: (state) => {
      localStorage.removeItem('wishlist');
      state.wishList = [];
    },
    getWishList: (state) => {
      const arrData = localStorage.getItem('wishlist');
      const wishList = arrData ? JSON.parse(arrData) : [];

      if (wishList?.length) {
        state.wishList = wishList;
      }
    },
    updateWishList: (state, action) => {
      const arrData = localStorage.getItem('wishlist');
      const wishList = arrData ? JSON.parse(arrData) : [];

      const itemIndex = wishList.findIndex(
        (item: Product) => item.productId === action.payload?.productId
      );

      let updatedWishList;

      if (itemIndex !== -1) {
        updatedWishList = wishList.filter(
          (item: Product) => item.productId !== action.payload?.productId
        );
      } else {
        updatedWishList = [...wishList, action.payload];
      }
      state.wishList = updatedWishList;
      localStorage.setItem('wishlist', JSON.stringify(updatedWishList));
    },
  },
});

export const { getWishList, updateWishList, removeWishList } =
  wishListSlice.actions;

export default wishListSlice.reducer;
