/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { Category } from '@/app/model';
import { getBrandsFailure, getBrandsSuccess } from '../reducers/get-brands';

interface DataType {
  data: Array<Category>;
  status: number;
  message: string;
}

const fetchBrands = async () => {
  const response = await axios.get(
    'http://127.0.0.1:3002/products/brands/get-all'
  );
  return response.data; // Assuming data contains the product list
};

function* getBrandsSaga(): Generator<any, void, DataType> {
  try {
    const rs = yield call(fetchBrands);
    if (rs?.status === 200) {
      yield put(getBrandsSuccess(rs?.data));
    } else {
      yield put(getBrandsFailure());
    }
  } catch (error) {
    console.log('errr', error);
    yield put(getBrandsFailure());
  }
}

export default getBrandsSaga;
