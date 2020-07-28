import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import { getMoviesAction } from '../actions/moviesActions';
import { getPlaylistAction } from '../actions/playlistActions';

const Home = () => {
  const dispatch = useDispatch();
  const mostWatched = useSelector((state) => state.movies.mostWatched);
  const originals = useSelector((state) => state.movies.originals);
  const playlist = useSelector((state) => state.playlist.playlist);
  useEffect(() => {
    if (mostWatched === null || originals === null) dispatch(getMoviesAction());
    if (playlist === null) dispatch(getPlaylistAction());
  }, []);

  return (
    <>
      <Header />
      <Search isHome />

      <Categories title="My Playlist">
        <Carousel movies={playlist} />
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
