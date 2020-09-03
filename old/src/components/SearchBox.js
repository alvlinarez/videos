import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovieAction } from '../actions/searchActions';
import searchIcon from '../assets/static/search-icon.png';
import '../assets/styles/components/Search.scss';

const SearchBox = (props) => {
  const { query } = props;
  const history = useHistory();
  const [movieSearch, setMovieSearch] = useState(query || '');
  // get all movies
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  // start searching when user press enter
  const handleSearch = (e) => {
    // search with enter button only or click in search icon
    if (e.key && e.key !== 'Enter') return;
    if (movieSearch.trim() !== '' && movies) {
      dispatch(searchMovieAction(movieSearch, movies));
      if (query === movieSearch) return; // avoid researching
      history.push(`/search?q=${movieSearch}`);
    }
  };

  return (
    <section className="main">
      <h2 className="main__title">What do you want to watch?</h2>
      <div className="main__search-container">
        <input
          type="text"
          id="search"
          spellCheck="false"
          aria-label="Search"
          aria-haspopup="false"
          role="button"
          name="search"
          onChange={(e) => setMovieSearch(e.target.value)}
          className="main__search-container-main__input"
          placeholder="Search..."
          onKeyPress={handleSearch}
          value={movieSearch}
        />
        <span className="main__search-container-main__span">
          <img src={searchIcon} alt="search-icon" onClick={handleSearch} />
        </span>
      </div>
    </section>
  );
};

export default SearchBox;
