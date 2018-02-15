import { all, fork } from 'redux-saga/effects';

import AuthSaga from './authSaga';
import DataSaga from './dataSaga';

const sagas = [AuthSaga, DataSaga];

function* Saga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default Saga;
