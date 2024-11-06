/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { loginFailure, loginSuccess } from '../reducers/login';
import { UserLogin } from '@/app/model/user.model';

interface DataType {
  status: number;
  message: string;
  data: any;
}

interface PayloadType {
  user: UserLogin;
  callback: (data: any) => any;
}

interface ActionType {
  type: string;
  payload: PayloadType;
}

const onLogin = async (data: UserLogin) => {
  const response = await axios.post('http://127.0.0.1:3001/users/login', {
    password: data?.password,
    phoneNumber: data?.phone,
  });

  return response.data;
};

function* LoginSaga(action: ActionType): Generator<any, void, DataType> {
  const { callback, user } = action?.payload;
  try {
    const rs = yield call(onLogin, user);
    if (rs?.status === 200) {
      yield put(loginSuccess());
      // Store token and user in localStorage
      localStorage.setItem('token', rs?.data?.token);
      localStorage.setItem('user', JSON.stringify(rs?.data));
      callback(rs);
    } else {
      callback(rs);
    }
  } catch (error: any) {
    callback(error?.response?.data);
    yield put(loginFailure());
  }
}

export default LoginSaga;
