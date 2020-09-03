import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesAction } from '../actions/moviesActions';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import { searchMovieAction } from '../actions/searchActions';
import moviesInPlaylist from '../utils/moviesInPlaylist';
import '../styles/containers/Search.scss';

const Search = (props) => {
  const { q } = queryString.parse(props.location.search);
  // get all movies
  const movies = useSelector((state) => state.movies.movies);
  // get playlist
  const playlist = useSelector((state) => state.playlist.playlist);
  // get moviesLoader
  const moviesLoading = useSelector((state) => state.movies.loading);
  // getResults
  let resultsSearch = useSelector((state) => state.search.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movies) {
      // if no movies after refresh
      dispatch(getMoviesAction());
    }
    if (!moviesLoading && movies) {
      // get results after refresh
      dispatch(searchMovieAction(q.toLowerCase(), movies));
    }
  }, [movies, q]);

  // If movies' results are in playlist to show add and remove buttons
  const reshapeMovies = () => {
    if (resultsSearch && playlist) {
      resultsSearch = moviesInPlaylist(resultsSearch, playlist);
    }
  };

  return (
    <>
      {reshapeMovies()}
      <Header />
      <SearchBox query={q} />

      {resultsSearch && Object.keys(resultsSearch).length === 0 ? (
        <div className="search-notfound_container">
          <h2>No results found</h2>
        </div>
      ) : (
        <Categories title="Results">
          <Carousel movies={resultsSearch} />
        </Categories>
      )}
    </>
  );
};

export default Search;
