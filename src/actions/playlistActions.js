import {
  LOADING,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_ERROR,
  ADD_MOVIE_PLAYLIST,
  ADD_MOVIE_PLAYLIST_ERROR,
  REMOVE_MOVIE_PLAYLIST,
  REMOVE_MOVIE_PLAYLIST_ERROR
} from '../types/playlistTypes';
import { axiosClient } from '../config/axios';

export const getPlaylistAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const { data } = await axiosClient.get('playlists/byUser');
      dispatch({
        type: GET_PLAYLIST_SUCCESS,
        payload: data.movies
      });
    } catch (e) {
      dispatch({
        type: GET_PLAYLIST_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const addMovieToPlaylistAction = (id) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const { data } = await axiosClient.put('playlists/addMovie', {
        movieId: id
      });
      dispatch({
        type: ADD_MOVIE_PLAYLIST,
        payload: data.movies
      });
    } catch (e) {
      dispatch({
        type: ADD_MOVIE_PLAYLIST_ERROR,
        payload: e.response.data.error
      });
    }
  };
};

export const removeMovieToPlaylistAction = (id) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING
    });
    try {
      const { data } = await axiosClient.put('playlists/removeMovie', {
        movieId: id
      });
      dispatch({
        type: REMOVE_MOVIE_PLAYLIST,
        payload: data.movies
      });
    } catch (e) {
      dispatch({
        type: REMOVE_MOVIE_PLAYLIST_ERROR,
        payload: e.response.data.error
      });
    }
  };
};
