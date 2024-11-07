/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateCartDTO } from '@/app/model/cart.model';
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { createCartFailure, createCartSuccess } from '../reducers/cart';

interface DataType {
  status: number;
  message: string;
  data: any;
}

interface PayloadType {
  cart: CreateCartDTO;
  callback: (data: any) => any;
}

interface ActionType {
  type: string;
  payload: PayloadType;
}

const onCreateCart = async (data: CreateCartDTO) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://127.0.0.1:3003/carts',
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    }
  );
  return response.data;
};

function* createCartSaga(action: ActionType): Generator<any, void, DataType> {
  const { callback, cart } = action?.payload;
  try {
    const rs = yield call(onCreateCart, cart);
    if (rs?.status === 200) {
      yield put(createCartSuccess());
      callback?.(rs);
    } else {
      callback?.(rs);
    }
  } catch (error: any) {
    callback?.(error?.response?.data);
    yield put(createCartFailure());
  }
}

export default createCartSaga;
