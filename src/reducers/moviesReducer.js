import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_ERROR,
  GET_MOVIE_PLAYING_SUCCESS,
  GET_MOVIE_PLAYING_ERROR,
  LOADING
} from '../types/moviesTypes';

const initialState = {
  //movies: [],
  trends: null,
  originals: null,
  playing: {},
  error: null,
  loading: false
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
        //movies: action.payload,
        trends: action.payload.trends,
        originals: action.payload.originals
      };
    case GET_MOVIE_PLAYING_SUCCESS:
      return {
        ...state,
        loading: false,
        playing: state.movies.find((item) => item.id === action.payload) || {}
      };
    case GET_MOVIE_PLAYING_ERROR:
    case GET_MOVIES_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
