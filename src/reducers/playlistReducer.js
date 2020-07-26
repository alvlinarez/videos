import {
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_ERROR,
  ADD_VIDEO_PLAYLIST,
  ADD_VIDEO_PLAYLIST_ERROR,
  REMOVE_VIDEO_PLAYLIST,
  REMOVE_VIDEO_PLAYLIST_ERROR,
  LOADING
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
    case ADD_VIDEO_PLAYLIST:
      return {
        ...state,
        loading: false,
        playlist: [...state.playlist, action.payload]
      };
    case REMOVE_VIDEO_PLAYLIST:
      return {
        ...state,
        loading: false,
        playlist: state.playlist.filter((item) => item.id !== action.payload)
      };
    case GET_PLAYLIST_ERROR:
    case ADD_VIDEO_PLAYLIST_ERROR:
    case REMOVE_VIDEO_PLAYLIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
