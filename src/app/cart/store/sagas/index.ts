import { takeLatest } from 'redux-saga/effects';
import {
  createCartHanlder,
  getCartHanlder,
  removeCartItemHanlder,
  updateCartHanlder,
} from '../reducers/cart';
import createCartSaga from './create-cart';
import updateCartSaga from './update-cart';
import getCartSaga from './get-cart';
import removeCartItemSaga from './remove-cart-item';

export default function* cartSaga() {
  yield takeLatest(createCartHanlder.type, createCartSaga);
  yield takeLatest(updateCartHanlder.type, updateCartSaga);
  yield takeLatest(getCartHanlder.type, getCartSaga);
  yield takeLatest(removeCartItemHanlder.type, removeCartItemSaga);
}
