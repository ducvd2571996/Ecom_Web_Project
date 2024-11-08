/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getCartFailure, getCartSuccess } from '../reducers/cart';

interface DataType {
  status: number;
  message: string;
  data: any;
}

interface PayloadType {
  userId: number;
  callback: (data: any) => any;
}

interface ActionType {
  type: string;
  payload: PayloadType;
}

const onGetCart = async (userId: number) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`http://127.0.0.1:3003/carts/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    },
  });
  return response.data;
};

function* getCartSaga(action: ActionType): Generator<any, void, DataType> {
  const { callback, userId } = action?.payload;
  try {
    const rs = yield call(onGetCart, userId);
    if (rs?.status === 200) {
      callback?.(rs);
      yield put(getCartSuccess(rs?.data));
    } else {
      yield put(getCartFailure());
    }
  } catch (error: any) {
    callback?.(error?.response?.data);
    yield put(getCartFailure());
  }
}

export default getCartSaga;
