import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    action: { type: '', payload: '' },
  },
  reducers: {
    fetchUserRequest: (state, action) => {
      state.loading = true;
      state.action = action;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchUserRequest, fetchUserSuccess, fetchUserFailure } =
  userSlice.actions;
export default userSlice.reducer;
