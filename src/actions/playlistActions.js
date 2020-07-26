import {
  LOADING,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_ERROR
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
