import { takeLatest } from 'redux-saga/effects';
import { getProductListHanlder } from '../reducers/get-product';
import getProductListSaga from './get-product-list';
import { getBrandsHanlder } from '../reducers/get-brands';
import getBrandsSaga from './get-brands';

export default function* productListSaga() {
  yield takeLatest(getProductListHanlder.type, getProductListSaga);
  yield takeLatest(getBrandsHanlder.type, getBrandsSaga);
}
