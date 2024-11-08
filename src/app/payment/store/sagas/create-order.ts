/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { createOrdertSuccess, createOrdertFailure } from '../reducers/payment';
import { Order } from '@/app/model/order.model';

interface DataType {
  status: number;
  message: string;
}

interface ActionType {
  type: string;
  payload: any;
}

const createOrderApi = async (order: Order) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://127.0.0.1:3005/pos/orders',
    {
      ...order,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    }
  );

  return response.data; // Assuming data contains the product list
};

function* createOrderSaga(action: ActionType): Generator<any, void, DataType> {
  try {
    const rs = yield call(createOrderApi, action?.payload?.order);
    if (rs?.status === 200) {
      yield put(createOrdertSuccess());
      action?.payload?.callback();
    } else {
      yield put(createOrdertFailure());
    }
  } catch (error) {
    console.log('errr', error);
    yield put(createOrdertFailure());
  }
}

export default createOrderSaga;
