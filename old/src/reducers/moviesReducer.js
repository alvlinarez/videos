import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_ERROR,
  GET_MOVIE_PLAYING_SUCCESS,
  GET_MOVIE_PLAYING_ERROR,
  MOVIES_LOADING,
  UPDATE_MOST_WATCHED_SUCCESS,
  UPDATE_MOST_WATCHED_ERROR,
  RESET_MOVIES_STATE
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
    case MOVIES_LOADING:
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
    // when user watch a movie, this one increments its timesWatched and sort
    // to get 7 top again
    case UPDATE_MOST_WATCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        mostWatched: state.movies
          .map((item) => {
            if (item.id === action.payload) item.timesWatched++;
            return item;
          })
          .sort(function compare(a, b) {
            if (a.timesWatched < b.timesWatched) {
              return 1;
            }
            if (a.timesWatched > b.timesWatched) {
              return -1;
            }
            return 0;
          })
          .slice(0, 7),
        error: null
      };
    case UPDATE_MOST_WATCHED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case RESET_MOVIES_STATE:
      return {
        ...state,
        movies: null,
        mostWatched: null,
        originals: null,
        playing: {},
        error: null,
        loading: true
      };
    default:
      return state;
  }
};
