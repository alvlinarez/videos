import { combineReducers } from 'redux';
import authReducer from './authReducer';
import videosReducer from './videosReducer';
import playlistReducer from './playlistReducer';

export default combineReducers({
  auth: authReducer,
  videos: videosReducer,
  playlist: playlistReducer
});
