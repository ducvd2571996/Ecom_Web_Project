/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';
import { fetchUserFailure, fetchUserSuccess } from '../reducers/user';
import axios from 'axios';

const fetchUserData = async (userId: string): Promise<any> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`http://127.0.0.1:3001/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    },
  });
  console.log('resss', response);

  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fetchUserSaga(action: any): Generator<any, void, any> {
  try {
    const data = yield call(fetchUserData, action?.payload);
    yield put(fetchUserSuccess(data?.data));
  } catch (error) {
    console.log('errr', error);
    yield put(fetchUserFailure());
  }
}

export default fetchUserSaga;
