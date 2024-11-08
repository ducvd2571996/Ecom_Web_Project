/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { Cart } from '@/app/model/cart.model';
import { updateCartSuccess } from '../reducers/cart';

interface DataType {
  status: number;
  message: string;
  data: any;
}

interface PayloadType {
  cart: Cart;
  callback: (data: any) => any;
}

interface ActionType {
  type: string;
  payload: PayloadType;
}

const onUpdateCart = async (data: Cart) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
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

function* updateCartSaga(action: ActionType): Generator<any, void, DataType> {
  const { callback, cart } = action?.payload;
  try {
    const rs = yield call(onUpdateCart, cart);
    if (rs?.status === 200) {
      callback?.(rs);
      yield put(updateCartSuccess(rs?.data));
    } else {
      callback?.(rs);
    }
  } catch (error: any) {
    callback(error?.response?.data);
  }
}

export default updateCartSaga;
