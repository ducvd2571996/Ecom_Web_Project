/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getOrderListFailure, getOrderListSuccess } from '../reducers/payment';

interface DataType {
  data: any;
  status: number;
  message: string;
}

interface ActionType {
  type: string;
  payload: any;
}

const fetchOrdersApi = async (customerId: number) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    `http://127.0.0.1:3005/pos/orders/get-by-customer/${customerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    }
  );

  return response.data; // Assuming data contains the product list
};

function* getOrdersSaga(action: ActionType): Generator<any, void, DataType> {
  try {
    const rs = yield call(fetchOrdersApi, action?.payload);
    if (rs?.status === 200) {
      yield put(getOrderListSuccess(rs?.data));
    } else {
      yield put(getOrderListFailure());
    }
  } catch (error) {
    console.log('errr', error);
    yield put(getOrderListFailure());
  }
}

export default getOrdersSaga;
