import { takeLatest } from 'redux-saga/effects';
import { getProductDetailHanlder } from '../reducers/create-order';
import getProductDetailSaga from './create-order';

export default function* productDetailSaga() {
  yield takeLatest(getProductDetailHanlder.type, getProductDetailSaga);
}
