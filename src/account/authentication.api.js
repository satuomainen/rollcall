import axios from 'axios';

const BASE_URL = '/api/v1/account';

export const ACCOUNT_REGISTER = 'ACCOUNT_REGISTER';
export function postRegistration(data) {
  const requestPromise = axios.post(`${BASE_URL}/register`, data);
  return {
    type: ACCOUNT_REGISTER,
    payload: requestPromise
  };
}

export const ACCOUNT_CLEAR_REGISTRATION_STATUS = 'ACCOUNT/CLEAR_REGISTRATION_STATUS';
export function clearRegistrationStatus() {
  return {
    type: ACCOUNT_CLEAR_REGISTRATION_STATUS,
    payload: null
  };
}

export const ACCOUNT_LOGIN = 'ACCOUNT/LOGIN';
export function postLogin(data) {
  const requestPromise = axios.post(`${BASE_URL}/login`, data);
  return {
    type: ACCOUNT_LOGIN,
    payload: requestPromise
  };
}

export const ACCOUNT_CLEAR_LOGIN_STATUS = 'ACCOUNT/CLEAR_LOGIN_STATUS';
export function clearLoginStatus() {
  return {
    type: ACCOUNT_CLEAR_LOGIN_STATUS,
    payload: null
  };
}

// Get current account or 401 if user is not logged in
export const ACCOUNT_ACCOUNT = 'ACCOUNT/ACCOUNT';
export function getAccount() {
  const requestPromise = axios.get(BASE_URL);

  return {
    type: ACCOUNT_ACCOUNT,
    payload: requestPromise
  };
}

export const ACCOUNT_LOGOUT = 'ACCOUNT/LOGOUT';
export function postLogout() {
  const requestPromise = axios.post(`${BASE_URL}/logout`);
  return {
    type: ACCOUNT_LOGOUT,
    payload: requestPromise
  };
}
const authentication = {
  postRegistration,
  clearRegistrationStatus,
  postLogin,
  clearLoginStatus,
  getAccount,
  postLogout
};

export default authentication;
