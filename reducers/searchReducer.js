import {
  SEARCH_LOADING,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  RESET_SEARCH_STATE
} from '../types/searchTypes';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  search: null,
  loading: false,
  error: null
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE: {
      return {
        ...state,
        ...action.payload
      };
    }
    case SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.payload,
        error: null
      };
    case SEARCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case RESET_SEARCH_STATE:
      return {
        ...state,
        search: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export default searchReducer;
