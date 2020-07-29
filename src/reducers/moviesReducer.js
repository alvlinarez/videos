import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_ERROR,
  GET_MOVIE_PLAYING_SUCCESS,
  GET_MOVIE_PLAYING_ERROR,
  LOADING,
  UPDATE_MOST_WATCHED_SUCCESS,
  UPDATE_MOST_WATCHED_ERROR
} from '../types/moviesTypes';

const initialState = {
  movies: null,
  mostWatched: null,
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
        mostWatched: action.payload.mostWatched,
        originals: action.payload.originals,
        movies: action.payload.movies
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
        mostWatched: null,
        originals: null
      };
    case UPDATE_MOST_WATCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        mostWatched: action.payload,
        error: null
      };
    case UPDATE_MOST_WATCHED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
