import { axiosClient } from '../src/config/axios';

exports.getInitialState = async (token) => {
  let initialState = {
    auth: {
      authLoading: true,
      error: null,
      isAuth: false,
      loading: false,
      message: null,
      user: {}
    },
    movies: {
      error: null,
      loading: true,
      mostWatched: null,
      movies: null,
      originals: null,
      playing: {}
    },
    playlist: {
      error: null,
      loading: false,
      playlist: null
    },
    search: {
      error: null,
      loading: false,
      search: null
    }
  };
  if (token) {
    try {
      let user = await axiosClient().post('auth', {
        token
      });
      user = user.data;
      let movies = await axiosClient().post('moviesSsr', { token });
      movies = movies.data;
      const originals = movies.filter((movie) => movie.original);
      // Get first 7 most watched movies
      const mostWatched = [
        ...movies
          .sort(function compare(a, b) {
            if (a.timesWatched < b.timesWatched) {
              return 1;
            }
            if (a.timesWatched > b.timesWatched) {
              return -1;
            }
            return 0;
          })
          .slice(0, 7)
      ];

      let playlist = await axiosClient().post('playlists/byUserSsr', { token });
      playlist = playlist.data.movies;
      initialState = {
        ...initialState,
        auth: {
          user,
          authLoading: true,
          error: null,
          isAuth: true,
          loading: false,
          message: null
        },
        movies: {
          error: null,
          loading: true,
          mostWatched,
          movies,
          originals,
          playing: {}
        },
        playlist: {
          error: null,
          loading: false,
          playlist
        }
      };
    } catch (e) {
      initialState = {
        ...initialState,
        auth: {
          authLoading: true,
          error: null,
          isAuth: false,
          loading: false,
          message: null,
          user: {}
        },
        movies: {
          error: null,
          loading: true,
          mostWatched: null,
          movies: null,
          originals: null,
          playing: {}
        },
        playlist: {
          error: null,
          loading: false,
          playlist: null
        }
      };
    }
  }
  return initialState;
};
