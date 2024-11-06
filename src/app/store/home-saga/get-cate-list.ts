/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import {
  getCateListFailure,
  getCateListSuccess,
} from '../reducers/get-cate-list';
import { Category } from '@/app/model';

interface DataType {
  data: Array<Category>;
  status: number;
  message: string;
}

const fetchProductsApi = async () => {
  const response = await axios.get(
    'http://127.0.0.1:3002/products/categories/get-all'
  );
  return response.data; // Assuming data contains the product list
};

function* getCateListSaga(): Generator<any, void, DataType> {
  try {
    const rs = yield call(fetchProductsApi);
    if (rs?.status === 200) {
      yield put(getCateListSuccess(rs?.data));
    } else {
      yield put(getCateListFailure());
    }
  } catch (error) {
    console.log('errr', error);
    yield put(getCateListFailure());
  }
}

export default getCateListSaga;
