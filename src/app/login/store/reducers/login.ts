/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserLogin } from '@/app/model/user.model';
import { createSlice } from '@reduxjs/toolkit';

interface loginState {
  loading: boolean;
  payload: UserLogin;
  callback: () => any;
}

const initialState: loginState = {
  loading: false,
  payload: { phone: '', password: '' },
  callback: () => {},
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginHanlder: (state, action) => {
      state.loading = true;
      state.payload = action?.payload?.user;
      state.callback = action?.payload?.callback;
    },
    loginSuccess: (state) => {
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { loginHanlder, loginSuccess, loginFailure } = loginSlice.actions;

export default loginSlice.reducer;
