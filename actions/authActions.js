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
  RESET_AUTH_MESSAGE,
  SIGN_OUT_ERROR,
  USER_AUTH,
  USER_AUTH_ERROR,
  USER_AUTH_SUCCESS
} from '../types/authTypes';
import { removeLocalstorage, setLocalstorage } from '../utils/auth';
import { axiosClient } from '../config/axios';
import { RESET_MOVIES_STATE } from '../types/moviesTypes';
import { RESET_PLAYLIST_STATE } from '../types/playlistTypes';
import { RESET_SEARCH_STATE } from '../types/searchTypes';

export const signInAction = ({ email, password }, router) => {
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
        setLocalstorage('authBackground', 'true');
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: data
        });
        router.push('/');
      }
    } catch (e) {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const getAuthenticatedUser = () => {
  return async (dispatch) => {
    dispatch({
      type: USER_AUTH
    });
    try {
      const {
        data: { id, name, email }
      } = await axiosClient().get('auth/user');
      if (id && name && email) {
        dispatch({
          type: USER_AUTH_SUCCESS,
          payload: {
            user: {
              id,
              name,
              email
            },
            isAuth: true
          }
        });
      } else {
        dispatch({
          type: USER_AUTH_SUCCESS,
          payload: {
            user: {},
            isAuth: false
          }
        });
      }
    } catch (e) {
      dispatch({
        type: USER_AUTH_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const signUpAction = ({ name, email, password }, router) => {
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
        router.push('/auth/account-activation');
      }
    } catch (e) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const activateAccountAction = (error, token, router) => {
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
          router.push('/signin');
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

export const forgotPasswordAction = ({ email }, router) => {
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
        router.push('/');
      }, 3500);
    } catch (e) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const resetPasswordAction = (error, token, newPassword, router) => {
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
          router.push('/');
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
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const { status } = await axiosClient().get('auth/signout');
      if (status === 200) {
        dispatch({
          type: SIGN_OUT
        });
        dispatch({
          type: RESET_MOVIES_STATE
        });
        dispatch({
          type: RESET_PLAYLIST_STATE
        });
        dispatch({
          type: RESET_SEARCH_STATE
        });
        removeLocalstorage('authBackground');
      } else {
        dispatch({
          type: SIGN_OUT_ERROR,
          payload: 'Error at signing out'
        });
      }
    } catch (e) {
      dispatch({
        type: SIGN_OUT_ERROR,
        payload: e.response.data.error
      });
    }
  };
};
