import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import { getMoviesAction } from '../actions/moviesActions';
import { getPlaylistAction } from '../actions/playlistActions';

const Home = () => {
  const dispatch = useDispatch();
  let mostWatched = useSelector((state) => state.movies.mostWatched);
  let originals = useSelector((state) => state.movies.originals);
  const playlist = useSelector((state) => state.playlist.playlist);

  useEffect(() => {
    // Fill movies
    if (mostWatched === null || originals === null) dispatch(getMoviesAction());
    // Get playlist
    if (playlist === null) dispatch(getPlaylistAction());
  }, []);

  const shapeMovieArray = (movieArray) => {
    let flag = false;
    for (let i = 0; i < movieArray.length; i++) {
      flag = false;
      for (let j = 0; j < playlist.length; j++) {
        if (movieArray[i].id === playlist[j].id) {
          flag = true;
        }
      }
      movieArray[i].isInPlaylist = flag;
    }
    return movieArray;
  };

  // Add the property isInPlaylist to each movie for add or remove in playlist
  const reshapeMovies = () => {
    if (mostWatched && originals && playlist) {
      mostWatched = shapeMovieArray(mostWatched);
      originals = shapeMovieArray(originals);
    }
  };

  return (
    <>
      {reshapeMovies()}
      <Header />
      <SearchBox />

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
