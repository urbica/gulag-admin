import Immutable from 'immutable';

import { LOGIN_REQUEST, LOGIN_FAILURE } from './authReducer';
import { DATA_FETCH_SUCCESS, DATA_FETCH_FAILURE } from './dataReducer';

const CAMPS_SORT_BY_CHANGED = 'CAMPS_SORT_BY_CHANGED';

export const changeCampsSortedBy = value => ({
  type: CAMPS_SORT_BY_CHANGED,
  payload: value
});

const initialState = Immutable.fromJS({
  loginLoading: false,
  loginError: null,
  dataFetchError: false,
  campsSortBy: ['id'],
  campsSortASC: true,
  isDataLoaded: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return state.set('loginLoading', true).set('loginError', false);
    case LOGIN_FAILURE:
      return state.set('loginLoading', false).set('loginError', true);
    case DATA_FETCH_SUCCESS:
      return state.set('loginLoading', false).set('isDataLoaded', true);
    case DATA_FETCH_FAILURE:
      return state.set('dataFetchError', true);
    case CAMPS_SORT_BY_CHANGED:
      if (state.get('campsSortBy').equals(payload)) {
        return state
          .set('campsSortASC', !state.get('campsSortASC'))
          .set('campsSortBy', payload);
      }
      return state.set('campsSortASC', true).set('campsSortBy', payload);
    default:
      return state;
  }
};
