import {
  MOVIES_LOADING,
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
      type: MOVIES_LOADING
    });
    try {
      const { data } = await axiosClient().get('movies');
      const originals = data.filter((movie) => movie.original);
      // Get first 7 most watched movies
      const mostWatched = [
        ...data
          .sort(function compare(a, b) {
            if (a.timesWatched < b.timesWatched) {
              return 1;
            }
            if (a.timesWatched > b.timesWatched) {
              return -1;
            }
            return 0;
          })
          .slice(0, 7)
      ];
      dispatch({
        type: GET_MOVIES_SUCCESS,
        payload: {
          mostWatched,
          originals,
          movies: data
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
      type: MOVIES_LOADING
    });
    if (id === null) {
      dispatch({
        type: GET_MOVIE_PLAYING_ERROR,
        payload: 'No movie found.'
      });
    } else {
      try {
        const { data } = await axiosClient().get(`movies/${id}`);
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

export const updateMostWatchedAction = (idMoviePlaying) => {
  return async (dispatch) => {
    dispatch({
      type: MOVIES_LOADING
    });
    try {
      dispatch({
        type: UPDATE_MOST_WATCHED_SUCCESS,
        payload: idMoviePlaying
      });
    } catch (e) {
      dispatch({
        type: UPDATE_MOST_WATCHED_ERROR,
        payload: e.response.data.error
      });
    }
  };
};
