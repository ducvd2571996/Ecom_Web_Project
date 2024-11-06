import { Brand } from '@/app/model/brand.model';
import { createSlice } from '@reduxjs/toolkit';

interface BrandsState {
  brands: Brand[];
  loading: boolean;
}

const initialState: BrandsState = {
  brands: [],
  loading: false,
};

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    getBrandsHanlder: (state) => {
      state.loading = true;
    },
    getBrandsSuccess: (state, action) => {
      state.brands = action.payload;
      state.loading = false;
    },
    getBrandsFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { getBrandsHanlder, getBrandsSuccess, getBrandsFailure } =
  brandsSlice.actions;

export default brandsSlice.reducer;
