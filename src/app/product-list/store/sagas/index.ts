import { takeLatest } from 'redux-saga/effects';
import { getProductListHanlder } from '../reducers/get-product';
import getProductListSaga from './get-product-list';

export default function* productListSaga() {
  yield takeLatest(getProductListHanlder.type, getProductListSaga);
}
