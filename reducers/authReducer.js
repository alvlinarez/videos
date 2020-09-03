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
  RESET_PASSWORD_ERROR,
  SIGN_OUT_ERROR,
  USER_AUTH,
  USER_AUTH_SUCCESS,
  USER_AUTH_ERROR
} from '../types/authTypes';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  error: null,
  message: null,
  loading: false,
  user: {},
  isAuth: false,
  authLoading: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE: {
      return {
        ...state,
        ...action.payload
      };
    }
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
        error: null,
        loading: false,
        isAuth: true
      };
    case USER_AUTH:
      return {
        ...state,
        authLoading: true
      };
    case USER_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        authLoading: false
      };
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuth: action.payload.isAuth,
        authLoading: false,
        error: null
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
        user: {},
        loading: false,
        error: null,
        isAuth: false
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
    case SIGN_OUT_ERROR:
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

export default authReducer;
