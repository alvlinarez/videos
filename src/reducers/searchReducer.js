import {
  SEARCH_LOADING,
  SEARCH_SUCCESS,
  SEARCH_ERROR
} from '../types/searchTypes';

const initialState = {
  search: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
