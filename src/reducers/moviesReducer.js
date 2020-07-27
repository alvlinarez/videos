import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_ERROR,
  GET_MOVIE_PLAYING_SUCCESS,
  GET_MOVIE_PLAYING_ERROR,
  LOADING
} from '../types/moviesTypes';

const initialState = {
  trends: null,
  originals: null,
  playing: {},
  error: null,
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        trends: action.payload.trends,
        originals: action.payload.originals
      };
    case GET_MOVIE_PLAYING_SUCCESS:
      return {
        ...state,
        loading: false,
        playing: action.payload
      };
    case GET_MOVIE_PLAYING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        playing: {}
      };
    case GET_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        trends: null,
        originals: null
      };
    default:
      return state;
  }
};
