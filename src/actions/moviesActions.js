import {
  LOADING,
  GET_MOVIES_ERROR,
  GET_MOVIES_SUCCESS,
  GET_MOVIE_PLAYING_ERROR,
  GET_MOVIE_PLAYING_SUCCESS
} from '../types/moviesTypes';
import { axiosClient } from '../config/axios';

export const getMoviesAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const { data } = await axiosClient.get('movies');
      dispatch({
        type: GET_MOVIES_SUCCESS,
        payload: {
          trends: data.filter((movie) => movie.contentRating.name === '16+'),
          originals: data.filter((movie) => movie.contentRating.name === 'PG')
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
    if (id === null) {
      dispatch({
        type: GET_MOVIE_PLAYING_ERROR,
        payload: 'No movie found.'
      });
    } else {
      dispatch({
        type: GET_MOVIE_PLAYING_SUCCESS,
        payload: id
      });
    }
  };
};
