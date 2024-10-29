import { all } from 'redux-saga/effects';
import homeSaga from './home-saga';
import productListSaga from '../product-list/store/sagas';

export default function* rootSaga() {
  yield all([homeSaga(), productListSaga()]);
}
