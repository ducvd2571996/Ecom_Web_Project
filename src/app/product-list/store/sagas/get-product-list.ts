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
    params: payload, // Axios will automatically serialize this as query parameters
  });

  return response.data; // Assuming data contains the product list
};

function* getProductListSaga(
  action: ActionType
): Generator<any, void, DataType> {
  try {
    const rs = yield call(fetchProductsApi, action?.payload);
    if (rs?.status === 200) {
      yield put(getProductListSuccess(rs?.data?.items));
    } else {
      yield put(getProductListFailure());
    }
  } catch (error) {
    console.log('errr', error);
    yield put(getProductListFailure());
  }
}

export default getProductListSaga;
