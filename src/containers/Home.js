import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import { getMoviesAction } from '../actions/moviesActions';
import { getPlaylistAction } from '../actions/playlistActions';
import moviesInPlaylist from '../utils/moviesInPlaylist';
import '../assets/styles/containers/Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  let mostWatched = useSelector((state) => state.movies.mostWatched);
  let originals = useSelector((state) => state.movies.originals);
  const playlist = useSelector((state) => state.playlist.playlist);

  useEffect(() => {
    // Fill movies
    if (mostWatched === null || originals === null) {
      dispatch(getMoviesAction());
    }
    // Get playlist
    if (playlist === null) dispatch(getPlaylistAction());
  }, [mostWatched]);

  // If movies is in playlist
  const reshapeMovies = () => {
    if (mostWatched && originals && playlist) {
      mostWatched = moviesInPlaylist(mostWatched, playlist);
      originals = moviesInPlaylist(originals, playlist);
    }
  };

  return (
    <>
      {reshapeMovies()}
      <Header />
      <SearchBox />

      <Categories title="My Playlist">
        {playlist && Object.keys(playlist).length === 0 ? (
          <div className="playlist-notfound_container">
            <h3>No movies in your playlist. Start adding some movies!</h3>
          </div>
        ) : (
          <Carousel movies={playlist} />
        )}
      </Categories>

      <Categories title="Most Watched">
        <Carousel movies={mostWatched} />
      </Categories>

      <Categories title="Originals">
        <Carousel movies={originals} />
      </Categories>
    </>
  );
};

export default Home;
