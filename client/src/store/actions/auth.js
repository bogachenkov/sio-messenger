import axios from 'axios';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
} from './types';

const startAuth = () => ({
  type: AUTH_START
});

export const successAuth = (user) => ({
  type: AUTH_SUCCESS,
  user
});

const failAuth = (errors) => ({
  type: AUTH_FAIL,
  errors
});

export const logout = () => ({
  type: AUTH_LOGOUT
});

export const login = data => dispatch => {
  dispatch(startAuth());
  axios.post('/api/auth/login', data)
    .then(res => dispatch(successAuth(res.data)))
    .catch(err => dispatch(failAuth(err.response.data)))
}