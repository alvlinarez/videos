import {
  SEARCH_LOADING,
  SEARCH_ERROR,
  SEARCH_SUCCESS
} from '../types/searchTypes';

export const searchMovieAction = (query, movies) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_LOADING,
      payload: query
    });
    try {
      const results = movies.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.series.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
      dispatch({
        type: SEARCH_SUCCESS,
        payload: results
      });
    } catch (e) {
      dispatch({
        type: SEARCH_ERROR,
        payload: e
      });
    }
  };
};
