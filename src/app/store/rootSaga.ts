import { all } from 'redux-saga/effects';
import homeSaga from './home-saga';
import productListSaga from '../product-list/store/sagas';
import userRegisterSaga from '../register/store/sagas';
import userLoginSaga from '../login/store/sagas';

export default function* rootSaga() {
  yield all([
    homeSaga(),
    productListSaga(),
    userRegisterSaga(),
    userLoginSaga(),
  ]);
}
