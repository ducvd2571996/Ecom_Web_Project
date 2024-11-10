/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';
import {
  getProductListFailure,
  getProductListSuccess,
} from '../reducers/get-product';
import axios from 'axios';
import { GetProductListPayload, Product } from '../../../model';

interface ProductListData {
  items: Array<Product>;
}

interface DataType {
  data: ProductListData;
  status: number;
  message: string;
}

interface ActionType {
  type: string;
  payload: GetProductListPayload;
}

const fetchProductsApi = async (payload: GetProductListPayload) => {
  const response = await axios.get('http://127.0.0.1:3002/products', {
    params: payload,
  });
  return response.data;
};

function* getProductListSaga(
  action: ActionType
): Generator<any, void, DataType> {
  try {
    const response = yield call(fetchProductsApi, action?.payload);
    console.log('API response:', response);
    if (response?.status === 200) {
      yield put(getProductListSuccess(response?.data?.items));
    } else {
      yield put(getProductListFailure());
    }
  } catch (error) {
    console.log('Error:', error);
    yield put(getProductListFailure());
  }
}

export default getProductListSaga;
