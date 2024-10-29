/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';
import {
  getProductListFailure,
  getProductListSuccess,
} from '../reducers/get-product';
import axios from 'axios';
import { Product } from '../../../model';

interface ProductListData {
  items: Array<Product>;
}

interface DataType {
  data: ProductListData;
  status: number;
  message: string;
}

const fetchProductsApi = async () => {
  const response = await axios.get('http://127.0.0.1:3002/products');
  return response.data; // Assuming data contains the product list
};

function* getProductListSaga(): Generator<any, void, DataType> {
  try {
    const rs = yield call(fetchProductsApi);
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
