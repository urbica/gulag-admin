import Immutable from 'immutable';

import { LOGIN_REQUEST, LOGIN_FAILURE } from './authReducer';
import { DATA_FETCH_SUCCESS, DATA_FETCH_FAILURE } from './dataReducer';

const CAMPS_SORT_BY_CHANGED = '@@ui/CAMPS_SORT_BY_CHANGED';
export const changeCampsSortedBy = value => ({
  type: CAMPS_SORT_BY_CHANGED,
  payload: value
});

const SEARCH_QUERY_CHANGED = '@@ui/SEARCH_QUERY_CHANGED';
export const changeSearchQuery = value => ({
  type: SEARCH_QUERY_CHANGED ,
  payload: value
});

const initialState = Immutable.fromJS({
  loginLoading: false,
  loginError: null,
  dataFetchError: false,
  campsSortBy: ['id'],
  campsSortASC: true,
  isDataLoaded: false,
  searchQuery: ''
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
    case SEARCH_QUERY_CHANGED:
      return state.set('searchQuery', payload);
    default:
      return state;
  }
};
