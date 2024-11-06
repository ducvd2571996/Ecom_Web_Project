import { takeLatest } from 'redux-saga/effects';
import { registerHanlder } from '../reducers/register';
import registerSaga from './register';

export default function* userRegisterSaga() {
  yield takeLatest(registerHanlder.type, registerSaga);
}
