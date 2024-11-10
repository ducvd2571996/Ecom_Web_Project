import { Category } from '@/app/model';
import { createSlice } from '@reduxjs/toolkit';

interface CateListState {
  cateList: Category[];
  loading: boolean;
}

const initialState: CateListState = {
  cateList: [],
  loading: false,
};

const cateListSlice = createSlice({
  name: 'cateList',
  initialState,
  reducers: {
    getCateListHanlder: (state) => {
      state.loading = true;
    },
    getCateListSuccess: (state, action) => {
      state.cateList = action.payload;
      state.loading = false;
    },
    getCateListFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { getCateListHanlder, getCateListSuccess, getCateListFailure } =
  cateListSlice.actions;

export default cateListSlice.reducer;
