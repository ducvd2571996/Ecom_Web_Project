import { takeLatest } from 'redux-saga/effects';
import { loginHanlder } from '../reducers/login';
import loginSaga from './login';

export default function* userLoginSaga() {
  yield takeLatest(loginHanlder.type, loginSaga);
}
