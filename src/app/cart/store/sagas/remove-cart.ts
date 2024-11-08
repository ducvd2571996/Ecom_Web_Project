/* eslint-disable @typescript-eslint/no-explicit-any */
import { RemoveCartItem } from '@/app/model/cart.model';
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { removeCartItemSuccess } from '../reducers/cart';

interface DataType {
  status: number;
  message: string;
  data: any;
}

interface PayloadType {
  item: RemoveCartItem;
  callback: (data: any) => any;
}

interface ActionType {
  type: string;
  payload: PayloadType;
}

const onRemoveCartItem = async (item: RemoveCartItem) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    'http://127.0.0.1:3003/carts/remove-item',
    {
      ...item,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    }
  );

  return response.data;
};

function* removeCartItemSaga(
  action: ActionType
): Generator<any, void, DataType> {
  const { callback, item } = action?.payload;
  try {
    const rs = yield call(onRemoveCartItem, item);
    if (rs?.status === 200) {
      callback?.(rs);
      yield put(removeCartItemSuccess(rs?.data));
    } else {
      callback?.(rs);
    }
  } catch (error: any) {
    callback(error?.response?.data);
  }
}

export default removeCartItemSaga;
