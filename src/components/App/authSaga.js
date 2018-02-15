import { delay } from 'redux-saga';
import { call, put, takeLatest, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST
} from './authReducer';
import {
  DATA_FETCH_SUCCESS,
  fetchData
} from './dataReducer';

import authorization from '../../api/login';

function* loginHandler({ payload }) {
  try {
    const token = yield call(authorization, payload);
    yield put({ type: LOGIN_SUCCESS, payload: token });
    yield put(fetchData());
    yield take(DATA_FETCH_SUCCESS);
    yield put(push('/admin'));
  } catch (error) {
    yield call(delay, 300);
    yield put({ type: LOGIN_FAILURE, payload: error });
  }
}

function* logoutHandler() {
  yield put(push('/login'));
}

function* AuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginHandler);
  yield takeLatest(LOGOUT_REQUEST, logoutHandler);
}

export default AuthSaga;
