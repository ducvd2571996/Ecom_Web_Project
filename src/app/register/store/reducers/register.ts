/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRegister } from '@/app/model/user.model';
import { createSlice } from '@reduxjs/toolkit';

interface RegisterState {
  loading: boolean;
  payload: UserRegister;
  callback: () => any;
}

const initialState: RegisterState = {
  loading: false,
  payload: { phone: '', password: '' },
  callback: () => {},
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerHanlder: (state, action) => {
      state.loading = true;
      state.payload = action?.payload?.user;
      state.callback = action?.payload?.callback;
    },
    registerSuccess: (state) => {
      state.loading = false;
    },
    registerFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { registerHanlder, registerSuccess, registerFailure } =
  registerSlice.actions;

export default registerSlice.reducer;
