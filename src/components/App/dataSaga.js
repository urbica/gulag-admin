import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import tokenSelector from './authSelector';

import {
  DATA_FETCH_REQUEST,
  DATA_FETCH_SUCCESS,
  DATA_FETCH_FAILURE,
  CREATE_CAMP_REQUEST,
  CREATE_CAMP_SUCCESS,
  CREATE_CAMP_FAILURE,
  UPDATE_CAMP_REQUEST,
  UPDATE_CAMP_SUCCESS,
  UPDATE_CAMP_FAILURE,
  DELETE_CAMP_REQUEST,
  DELETE_CAMP_SUCCESS,
  DELETE_CAMP_FAILURE,
  UPLOAD_PHOTOS_REQUEST,
  UPLOAD_PHOTOS_SUCCESS,
  UPLOAD_PHOTOS_FAILURE,
  DELETE_PHOTO_REQUEST,
  DELETE_PHOTO_SUCCESS,
  DELETE_PHOTO_FAILURE,
  CREATE_PERIOD_REQUEST,
  CREATE_PERIOD_SUCCESS,
  CREATE_PERIOD_FAILURE,
  DELETE_PERIOD_REQUEST,
  DELETE_PERIOD_SUCCESS,
  DELETE_PERIOD_FAILURE,
  UPDATE_PERIODS_REQUEST,
  UPDATE_PERIODS_SUCCESS,
  UPDATE_PERIODS_FAILURE,
  DELETE_CAMP_STAT_REQUEST,
  DELETE_CAMP_STAT_SUCCESS,
  DELETE_CAMP_STAT_FAILURE,
  DELETE_CAMP_LOCATION_REQUEST,
  DELETE_CAMP_LOCATION_SUCCESS,
  DELETE_CAMP_LOCATION_FAILURE
} from './dataReducer';

import fetchData from '../../api/fetchData';
import createCamp from '../../api/createCamp';
import updateCamp from '../../api/updateCamp';
import deleteCamp from '../../api/deleteCamp';
import uploadPhotos from '../../api/uploadPhotos';
import deletePhoto from '../../api/deletePhoto';
import createPeriod from '../../api/createPeriod';
import deletePeriod from '../../api/deletePeriod';
import updatePeriods from '../../api/updatePeriods';
import deleteStatistics from '../../api/deleteStatistics';
import deleteLocation from '../../api/deleteLocation';

function* fetchDataHandler() {
  try {
    const token = yield select(tokenSelector);
    const data = yield call(fetchData, token);

    yield put({ type: DATA_FETCH_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: DATA_FETCH_FAILURE, payload: error });
    yield put(push('/login'));
  }
}

function* createCampHandler() {
  try {
    const token = yield select(tokenSelector);
    const newCamp = yield call(createCamp, token);

    yield put({ type: CREATE_CAMP_SUCCESS, payload: newCamp });
    yield put(push(`/admin/camp${newCamp.get('id')}`));
  } catch (error) {
    yield put({ type: CREATE_CAMP_FAILURE, payload: error });
  }
}

function* updateCampHandler({ payload }) {
  try {
    const token = yield select(tokenSelector);
    const updatedCamp = yield call(updateCamp, token, payload);

    yield put({ type: UPDATE_CAMP_SUCCESS, payload: updatedCamp });
  } catch (error) {
    yield put({ type: UPDATE_CAMP_FAILURE, payload: error });
  }
}

function* deleteCampHandler({ payload }) {
  try {
    const token = yield select(tokenSelector);

    yield call(deleteCamp, token, payload);
    yield put(push('/admin'));
    yield put({ type: DELETE_CAMP_SUCCESS, payload });
  } catch (error) {
    yield put({ type: DELETE_CAMP_FAILURE, payload: error });
  }
}

function* uploadPhotosHandler({ payload }) {
  try {
    const token = yield select(tokenSelector);
    const response = yield call(
      uploadPhotos,
      token,
      payload.prisonId,
      payload.photos
    );

    yield put({ type: UPLOAD_PHOTOS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: UPLOAD_PHOTOS_FAILURE, payload: error });
  }
}

function* deletePhotoHandler({ payload }) {
  try {
    const token = yield select(tokenSelector);

    yield call(deletePhoto, token, payload.photoId);
    yield put({ type: DELETE_PHOTO_SUCCESS, payload });
  } catch (error) {
    yield put({ type: DELETE_PHOTO_FAILURE, payload: error });
  }
}

function* createPeriodHandler() {
  try {
    const token = yield select(tokenSelector);
    const newPeriod = yield call(createPeriod, token);

    yield put({ type: CREATE_PERIOD_SUCCESS, payload: newPeriod });
  } catch (error) {
    yield put({ type: CREATE_PERIOD_FAILURE, payload: error });
  }
}

function* deletePeriodHandler({ payload }) {
  try {
    const token = yield select(tokenSelector);

    yield call(deletePeriod, token, payload);
    yield put({ type: DELETE_PERIOD_SUCCESS, payload });
  } catch (error) {
    yield put({ type: DELETE_PERIOD_FAILURE, payload: error });
  }
}

function* updatePeriodsHandler({ payload }) {
  try {
    const token = yield select(tokenSelector);

    const newPeriods = yield call(updatePeriods, token, payload);
    yield put({ type: UPDATE_PERIODS_SUCCESS, payload: newPeriods });
  } catch (error) {
    yield put({ type: UPDATE_PERIODS_FAILURE, payload: error });
  }
}

function* deleteStatisticsHandler({ payload }) {
  try {
    const token = yield select(tokenSelector);

    const result = yield call(
      deleteStatistics,
      token,
      payload.id,
      payload.campId
    );
    yield put({ type: DELETE_CAMP_STAT_SUCCESS, payload: result });
  } catch (error) {
    yield put({ type: DELETE_CAMP_STAT_FAILURE, payload: error });
  }
}

function* deleteLocationHandler({ payload }) {
  try {
    const token = yield select(tokenSelector);

    const result = yield call(deleteLocation, token, payload);
    yield put({ type: DELETE_CAMP_LOCATION_SUCCESS, payload: result });
  } catch (error) {
    yield put({ type: DELETE_CAMP_LOCATION_FAILURE, payload: error });
  }
}

function* DataSaga() {
  yield takeLatest(DATA_FETCH_REQUEST, fetchDataHandler);
  yield takeLatest(CREATE_CAMP_REQUEST, createCampHandler);
  yield takeLatest(UPDATE_CAMP_REQUEST, updateCampHandler);
  yield takeLatest(DELETE_CAMP_REQUEST, deleteCampHandler);
  yield takeLatest(UPLOAD_PHOTOS_REQUEST, uploadPhotosHandler);
  yield takeLatest(DELETE_PHOTO_REQUEST, deletePhotoHandler);
  yield takeLatest(CREATE_PERIOD_REQUEST, createPeriodHandler);
  yield takeLatest(DELETE_PERIOD_REQUEST, deletePeriodHandler);
  yield takeLatest(UPDATE_PERIODS_REQUEST, updatePeriodsHandler);
  yield takeLatest(DELETE_CAMP_STAT_REQUEST, deleteStatisticsHandler);
  yield takeLatest(DELETE_CAMP_LOCATION_REQUEST, deleteLocationHandler);
}

export default DataSaga;
