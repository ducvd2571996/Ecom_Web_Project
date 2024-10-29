/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';

import axios from 'axios';
import { Product } from '@/app/model';
import {
  getLatestProductFailure,
  getLatestProductSuccess,
} from '../reducers/get-latest-product';

interface ProductListData {
  items: Array<Product>;
}

interface DataType {
  data: ProductListData;
  status: number;
  message: string;
}

const fetchLatestProductsApi = async () => {
  const response = await axios.get('http://127.0.0.1:3002/products/latest');
  return response.data; // Assuming data contains the product list
};

function* getLatestProductsSaga(): Generator<any, void, DataType> {
  try {
    const rs = yield call(fetchLatestProductsApi);
    if (rs?.status === 200) {
      yield put(getLatestProductSuccess(rs?.data?.items));
    } else {
      yield put(getLatestProductFailure());
    }
  } catch (error) {
    console.log('errr', error);
    yield put(getLatestProductFailure());
  }
}

export default getLatestProductsSaga;
