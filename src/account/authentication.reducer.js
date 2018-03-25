import {
  ACCOUNT_ACCOUNT,
  ACCOUNT_CLEAR_LOGIN_STATUS,
  ACCOUNT_CLEAR_REGISTRATION_STATUS,
  ACCOUNT_LOGIN,
  ACCOUNT_LOGOUT,
  ACCOUNT_REGISTER
} from './authentication.api';

const initialState = {
  isAuthenticated: false,
  account: null,
  registrationStatus: null,
  loginStatus: null
};

function handleLoginResponse(state, action) {
  if (action.error) {
    return { ...state, isAuthenticated: false, loginStatus: action.payload.response.status };
  }
  return { ...state, isAuthenticated: true, loginStatus: 200 };
}

function handleAccountResponse(state, action) {
  if (action.error) {
    return { ...state, account: null, isAuthenticated: false };
  }
  return { ...state, account: action.payload.data, isAuthenticated: true };
}

function handleRegisterResponse(state, action) {
  if (action.error) {
    return {
      ...state,
      registrationStatus: action.payload.response.status
    };
  }
  return {
    ...state,
    registrationStatus: 200
  };
}

function handleLogoutResponse(state, action) {
  return { ...state, account: null, isAuthenticated: false };
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_LOGIN:
      return handleLoginResponse(state, action);
    case ACCOUNT_CLEAR_LOGIN_STATUS:
      return { ...state, loginStatus: null };
    case ACCOUNT_ACCOUNT:
      return handleAccountResponse(state, action);
    case ACCOUNT_LOGOUT:
      return handleLogoutResponse(state, action);
    case ACCOUNT_REGISTER:
      return handleRegisterResponse(state, action);
    case ACCOUNT_CLEAR_REGISTRATION_STATUS:
      return { ...state, registrationStatus: null };
    default:
      return state;
  }
};

export default account;
