import { takeLatest } from 'redux-saga/effects';
import { getProductDetailHanlder } from '../reducers/get-product-detail';
import getProductDetailSaga from './get-product-detail';

export default function* productDetailSaga() {
  yield takeLatest(getProductDetailHanlder.type, getProductDetailSaga);
}
