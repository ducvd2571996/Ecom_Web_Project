import { all } from 'redux-saga/effects';
import homeSaga from './home-saga';
import productListSaga from '../product-list/store/sagas';
import productDetailSaga from '../product-detail/store/sagas';
import userRegisterSaga from '../register/store/sagas';
import userLoginSaga from '../login/store/sagas';
import cartSaga from '../cart/store/sagas';
import paymentSaga from '../payment/store/sagas';

export default function* rootSaga() {
  yield all([
    homeSaga(),
    productListSaga(),
    userRegisterSaga(),
    userLoginSaga(),
    productDetailSaga(),
    cartSaga(),
    paymentSaga(),
  ]);
}
