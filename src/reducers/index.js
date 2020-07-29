import { combineReducers } from 'redux';
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import playlistReducer from './playlistReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  playlist: playlistReducer,
  search: searchReducer
});
