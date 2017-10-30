import * as request from '../utils/request';
import BASE_URL from '../utils/base-url';

// action types

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

// actions

export const registerSuccess = token => {
  return { type: REGISTER_SUCCESS, token };
};

export const registerFailure = error => {
  return { type: REGISTER_ERROR, error };
};

export const loginSuccess = token => {
  return { type: LOGIN_SUCCESS, token };
};

export const loginError = error => {
  return { type: LOGIN_ERROR, error };
};

export const logout = () => {
  return { type: LOGOUT };
};

// thunks

export const login = params => dispatch => {
  request
    .fetchNoAuth(`${BASE_URL}/api/auth/login`, 'POST', params)
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(loginSuccess(res.data.token));
    })
    .catch(err => {
      dispatch(loginError(err));
    });
};

export const register = params => dispatch => {
  request
    .fetchNoAuth(`${BASE_URL}/api/auth/register`, 'POST', params)
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(registerSuccess(res.data.token));
    })
    .catch(err => {
      dispatch(registerFailure(err));
    });
};
