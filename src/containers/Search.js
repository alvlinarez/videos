import React, { useEffect } from 'react';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesAction } from '../actions/moviesActions';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import { searchMovieAction } from '../actions/searchActions';

const Search = (props) => {
  const { q } = queryString.parse(props.location.search);
  // get all movies
  const movies = useSelector((state) => state.movies.movies);
  // get moviesLoader
  const moviesLoading = useSelector((state) => state.movies.loading);
  // getResults
  const resultsSearch = useSelector((state) => state.search.search);
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
  }, [movies]);

  return (
    <>
      <Header />
      <SearchBox query={q} />

      <Categories title="Results">
        <Carousel movies={resultsSearch} />
      </Categories>
    </>
  );
};

export default Search;
