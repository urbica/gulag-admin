import { Map } from 'immutable';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const login = password => ({ type: LOGIN_REQUEST, payload: password });
export const logout = () => ({ type: LOGOUT_REQUEST });

const initialState = Map({
  token: localStorage.getItem('token')
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload);
      return state.set('token', payload);
    case LOGOUT_REQUEST:
      localStorage.removeItem('token');
      return state.set('token', null);
    default:
      return state;
  }
};
