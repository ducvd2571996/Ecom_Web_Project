import { takeLatest } from 'redux-saga/effects';
import fetchUserSaga from './user';
import {
  fetchUserRequest,
  getCateListHanlder,
  getLatestProductHanlder,
} from '../reducers';
import getCateListSaga from './get-cate-list';
import getLatestProductsSaga from './get-latest-products';

export default function* userSaga() {
  yield takeLatest(fetchUserRequest.type, fetchUserSaga);
  yield takeLatest(getCateListHanlder.type, getCateListSaga);
  yield takeLatest(getLatestProductHanlder.type, getLatestProductsSaga);
}
