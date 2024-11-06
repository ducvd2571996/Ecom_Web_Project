/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { Product } from '../../../model';
import {
  getProductDetailFailure,
  getProductDetailSuccess,
} from '../reducers/get-product-detail';

interface ProductData {
  data: Product;
}

interface DataType {
  data: ProductData;
  status: number;
  message: string;
}

interface ActionType {
  type: string;
  payload: any;
}

const fetchProductsApi = async (id: number) => {
  const response = await axios.get(`http://127.0.0.1:3002/products/${id}`);

  return response.data; // Assuming data contains the product list
};

function* getProductDetailSaga(
  action: ActionType
): Generator<any, void, DataType> {
  try {
    console.log('aaa', action?.payload);

    const rs = yield call(fetchProductsApi, action?.payload);
    if (rs?.status === 200) {
      yield put(getProductDetailSuccess(rs?.data));
    } else {
      yield put(getProductDetailFailure());
    }
  } catch (error) {
    console.log('errr', error);
    yield put(getProductDetailFailure());
  }
}

export default getProductDetailSaga;
