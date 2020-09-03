import {
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_ERROR,
  ADD_MOVIE_PLAYLIST,
  ADD_MOVIE_PLAYLIST_ERROR,
  REMOVE_MOVIE_PLAYLIST,
  REMOVE_MOVIE_PLAYLIST_ERROR,
  PLAYLIST_LOADING,
  RESET_PLAYLIST_STATE
} from '../types/playlistTypes';

const initialState = {
  playlist: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playlist: action.payload
      };
    case ADD_MOVIE_PLAYLIST:
    case REMOVE_MOVIE_PLAYLIST:
      return {
        ...state,
        loading: false,
        playlist: action.payload
      };
    case GET_PLAYLIST_ERROR:
    case ADD_MOVIE_PLAYLIST_ERROR:
    case REMOVE_MOVIE_PLAYLIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case PLAYLIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case RESET_PLAYLIST_STATE:
      return {
        ...state,
        playlist: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
