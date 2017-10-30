import { saveToken, currentUser, deleteToken } from '../utils/authentication';
import ErrorHandler from '../utils/error-handler';
import { hashHistory } from 'react-router';
import * as types from '../actions/auth.actions';

const registerSuccess = (state, token) => {
  if (!token) handleError(state, 'Token was undefined');

  const isLoggedIn = token.split('.').length === 3;

  saveToken(token);

  const user = currentUser();
  const newState = Object.assign({}, state);

  if (newState.loginError) delete newState.loginError;
  if (newState.registerError) delete newState.registerError;

  hashHistory.push('/');
  return {
    ...newState,
    isLoggedIn,
    user,
  };
};

const loginSuccess = (state, token) => {
  if (!token) handleError(state, 'Token was undefined');

  let isLoggedIn = token.split('.').length === 3;

  saveToken(token);
  const user = currentUser();

  const newState = Object.assign({}, state);

  if (newState.loginError) delete newState.loginError;
  if (newState.registerError) delete newState.registerError;

  hashHistory.push('/');
  return {
    ...newState,
    isLoggedIn,
    user,
  };
};

const handleError = (state, error) => {
  return {
    ...state,
    isLoggedIn: false,
    error: ErrorHandler.handle(error),
  };
};

const logout = state => {
  deleteToken();
  hashHistory.push('/login');
  return { ...state, isLoggedIn: false };
};

export default function auth(state = { isLoggedIn: false }, action) {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return registerSuccess(state, action.token);
    case types.REGISTER_ERROR:
      return handleError(state, action.error);
    case types.LOGIN_SUCCESS:
      return loginSuccess(state, action.token);
    case types.LOGIN_ERROR:
      return handleError(state, action.error);
    case types.LOGOUT:
      return logout(state);
    default:
      return state;
  }
}
