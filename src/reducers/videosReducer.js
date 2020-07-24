import {
  GET_VIDEOS,
  GET_VIDEOS_ERROR,
  GET_VIDEO_PLAYING,
  GET_VIDEO_PLAYING_ERROR,
  LOADING
} from '../types/videosTypes';

const initialState = {
  videos: [],
  trends: [],
  originals: [],
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
    case GET_VIDEOS:
      return {
        ...state,
        loading: false,
        videos: action.payload.videos,
        trends: action.payload.trends,
        originals: action.payload.originals
      };
    case GET_VIDEO_PLAYING:
      return {
        ...state,
        loading: false,
        playing: state.videos.find((item) => item.id === action.payload) || {}
      };
    case GET_VIDEO_PLAYING_ERROR:
    case GET_VIDEOS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
