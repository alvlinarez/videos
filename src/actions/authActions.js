import {
  LOADING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT
} from '../types/authTypes';
import { authenticate, signInOauth, signOut } from '../utils/auth';
import { axiosClient } from '../config/axios';

export const signInAction = ({ email, password }, history) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const { data } = await axiosClient.post(
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
  return async (dispatch) => {
    dispatch({
      type: LOADING
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
      type: LOADING
    });
    try {
      const { data } = await axiosClient.post('auth/signup', {
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
        // Timeout instead of success popup to redirect from signup to signin
        setTimeout(() => {
          dispatch({
            type: SIGN_UP_SUCCESS,
            payload: data.message
          });
          history.push('/signin');
        }, 1500);
      }
    } catch (e) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const signOutAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    signOut();
    dispatch({
      type: SIGN_OUT
    });
  };
};
