import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/components/Search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovieAction } from '../actions/searchActions';

const SearchBox = (props) => {
  const { query } = props;
  const history = useHistory();
  const [movieSearch, setMovieSearch] = useState(query || '');
  // get all movies
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  // start searching when user press enter
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (movieSearch.trim() !== '' && movies) {
        dispatch(searchMovieAction(movieSearch, movies));
        history.push(`/search?q=${movieSearch}`);
      }
    }
  };

  return (
    <section className="main">
      <h2 className="main__title">What do you want to watch?</h2>
      <input
        type="text"
        name="search"
        onChange={(e) => setMovieSearch(e.target.value)}
        className="main__input"
        placeholder="Search..."
        onKeyPress={handleSearch}
        value={movieSearch}
      />
    </section>
  );
};

export default SearchBox;
