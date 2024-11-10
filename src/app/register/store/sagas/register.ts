/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { registerFailure, registerSuccess } from '../reducers/register';
import { UserRegister } from '@/app/model/user.model';

interface DataType {
  status: number;
  message: string;
}

interface PayloadType {
  user: UserRegister;
  callback: (data: any) => any;
}

interface ActionType {
  type: string;
  payload: PayloadType;
}

const onRegister = async (data: UserRegister) => {
  const response = await axios.post('http://127.0.0.1:3001/users/register', {
    password: data?.password,
    phoneNumber: data?.phone,
  });

  return response.data;
};

function* registerSaga(action: ActionType): Generator<any, void, DataType> {
  console.log('aaa', action?.payload);
  const { callback, user } = action?.payload;
  try {
    const rs = yield call(onRegister, user);
    if (rs?.status === 200) {
      yield put(registerSuccess());
      callback?.(rs);
    } else {
      callback?.(rs);
    }
  } catch (error: any) {
    callback?.(error?.response?.data);
    yield put(registerFailure());
  }
}

export default registerSaga;
