import {
  LOADING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT
} from '../types/authTypes';
import { authenticate, signOut } from '../utils/auth';
import { axiosClient } from '../config/axios';

export const signInAction = ({ email, password }) => {
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
      }
    } catch (e) {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const signUpAction = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const res = await axiosClient.post('auth/signup', {
        name,
        email,
        password
      });
      if (res.data.error) {
        dispatch({
          type: SIGN_UP_ERROR,
          payload: res.data.error
        });
      } else {
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: res.data.message
        });
      }
    } catch (e) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: e.response.data.msg
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
