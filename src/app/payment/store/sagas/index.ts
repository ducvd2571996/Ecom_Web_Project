import { takeLatest } from 'redux-saga/effects';
import { createOrdertHanlder, getOrderListHanlder } from '../reducers/payment';
import createOrderSaga from './create-order';
import getOrdersSaga from './get-order';

export default function* paymentSaga() {
  yield takeLatest(createOrdertHanlder.type, createOrderSaga);
  yield takeLatest(getOrderListHanlder.type, getOrdersSaga);
}
