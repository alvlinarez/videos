import { combineReducers } from 'redux';
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import playlistReducer from './playlistReducer';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  playlist: playlistReducer
});
