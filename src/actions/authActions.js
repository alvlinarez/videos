import {
  AUTH_LOADING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_ERROR,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_AUTH_MESSAGE
} from '../types/authTypes';
import { authenticate, signInOauth, signOut } from '../utils/auth';
import { axiosClient } from '../config/axios';
import { RESET_MOVIES_STATE } from '../types/moviesTypes';
import { RESET_PLAYLIST_STATE } from '../types/playlistTypes';
import { RESET_SEARCH_STATE } from '../types/searchTypes';

export const signInAction = ({ email, password }, history) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const { data } = await axiosClient().post(
        'auth/signin',
        {},
        {
          auth: {
            username: email,
            password
          }
        }
      );
      if (data.error) {
        dispatch({
          type: SIGN_IN_ERROR,
          payload: data.error
        });
      } else {
        authenticate(data.token, data.user);
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: data
        });
        history.push('/');
      }
    } catch (e) {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const signInOauthAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const data = signInOauth(token);
      if (!data) {
        dispatch({
          type: SIGN_IN_ERROR,
          payload: 'Invalid token.'
        });
      } else {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: data
        });
      }
    } catch (e) {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const signUpAction = ({ name, email, password }, history) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const { data } = await axiosClient().post('auth/signup', {
        name,
        email,
        password
      });
      if (data.error) {
        dispatch({
          type: SIGN_UP_ERROR,
          payload: data.error
        });
      } else {
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: data.message
        });
        history.push('/auth/account-activation');
      }
    } catch (e) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const activateAccountAction = (error, token, history) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING
    });
    if (error) {
      dispatch({
        type: ACTIVATE_ACCOUNT_ERROR,
        payload: error
      });
    } else {
      try {
        const { data } = await axiosClient().post('auth/account-activation', {
          token
        });
        dispatch({
          type: ACTIVATE_ACCOUNT_SUCCESS,
          payload: data.message
        });
        setTimeout(() => {
          dispatch({
            type: RESET_AUTH_MESSAGE
          });
          history.push('/signin');
        }, 2000);
      } catch (e) {
        dispatch({
          type: ACTIVATE_ACCOUNT_ERROR,
          payload: e.response.data.error
        });
      }
    }
  };
};

export const forgotPasswordAction = ({ email }, history) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const { data } = await axiosClient().put('auth/forgot-password', {
        email
      });
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message
      });
      setTimeout(() => {
        dispatch({
          type: RESET_AUTH_MESSAGE
        });
        history.push('/');
      }, 3500);
    } catch (e) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const resetPasswordAction = (error, token, newPassword, history) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING
    });
    if (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: error
      });
    } else {
      try {
        const { data } = await axiosClient().put('auth/reset-password', {
          resetPasswordLink: token,
          newPassword
        });
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: data.message
        });
        setTimeout(() => {
          dispatch({
            type: RESET_AUTH_MESSAGE
          });
          history.push('/');
        }, 2000);
      } catch (e) {
        dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: e.response.data.error
        });
      }
    }
  };
};

export const signOutAction = () => {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING
    });
    signOut();
    dispatch({
      type: RESET_MOVIES_STATE
    });
    dispatch({
      type: RESET_PLAYLIST_STATE
    });
    dispatch({
      type: RESET_SEARCH_STATE
    });
    dispatch({
      type: SIGN_OUT
    });
  };
};
