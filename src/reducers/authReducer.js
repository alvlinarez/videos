import { SIGN_IN, SIGN_IN_ERROR, SIGN_OUT, LOADING } from '../types/authTypes';

const initialState = {
  authenticated: false,
  error: null,
  loading: false,
  token: null,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case SIGN_IN:
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        loading: false
      };
    case SIGN_OUT:
      return {
        ...state,
        authenticated: null,
        token: null,
        user: null,
        loading: false
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
