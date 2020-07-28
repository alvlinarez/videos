import {
  LOADING,
  GET_MOVIES_ERROR,
  GET_MOVIES_SUCCESS,
  GET_MOVIE_PLAYING_ERROR,
  GET_MOVIE_PLAYING_SUCCESS,
  UPDATE_MOST_WATCHED_ERROR,
  UPDATE_MOST_WATCHED_SUCCESS
} from '../types/moviesTypes';
import { axiosClient } from '../config/axios';

export const getMoviesAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const [mostWatched, originals] = await Promise.all([
        axiosClient.get('movies', {
          params: {
            mostWatched: true
          }
        }),
        axiosClient.get('movies', {
          params: {
            originals: true
          }
        })
      ]);
      dispatch({
        type: GET_MOVIES_SUCCESS,
        payload: {
          mostWatched: mostWatched.data,
          originals: originals.data
        }
      });
    } catch (e) {
      dispatch({
        type: GET_MOVIES_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const getPlayingMovieAction = (id) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    if (id === null) {
      dispatch({
        type: GET_MOVIE_PLAYING_ERROR,
        payload: 'No movie found.'
      });
    } else {
      try {
        const { data } = await axiosClient.get(`movies/${id}`);
        dispatch({
          type: GET_MOVIE_PLAYING_SUCCESS,
          payload: data
        });
      } catch (e) {
        dispatch({
          type: GET_MOVIE_PLAYING_ERROR,
          payload: e.response.data.error
        });
      }
    }
  };
};

export const updateMostWatchedAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const { data } = await axiosClient.get('movies', {
        params: {
          mostWatched: true
        }
      });
      dispatch({
        type: UPDATE_MOST_WATCHED_SUCCESS,
        payload: data
      });
    } catch (e) {
      dispatch({
        type: UPDATE_MOST_WATCHED_ERROR,
        payload: e.response.data.error
      });
    }
  };
};
