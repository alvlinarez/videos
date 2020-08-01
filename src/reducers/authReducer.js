import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT,
  AUTH_LOADING,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_ERROR,
  RESET_AUTH_MESSAGE,
  RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_ERROR
} from '../types/authTypes';
import { getCookie } from '../utils/auth';

const initialState = {
  error: null,
  message: null,
  loading: false,
  token: getCookie('token') || null,
  user: JSON.parse(localStorage.getItem('user'))
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case RESET_AUTH_MESSAGE:
      return {
        ...state,
        message: null
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        loading: false
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null
      };
    case SIGN_OUT:
      return {
        ...state,
        token: null,
        user: null,
        loading: false,
        error: null
      };
    case RESET_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
    case ACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: null
      };
    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
    case ACTIVATE_ACCOUNT_ERROR:
    case FORGOT_PASSWORD_ERROR:
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
