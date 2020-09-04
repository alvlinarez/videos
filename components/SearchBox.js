import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovieAction } from '../actions/searchActions';
import searchStyles from '../styles/components/Search.module.scss';

const SearchBox = (props) => {
  const { query } = props;
  const router = useRouter();
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
      router.push(`/search?q=${movieSearch}`);
    }
  };

  return (
    <section className={`${searchStyles.main}`}>
      <h2 className={`${searchStyles.mainTitle}`}>
        What do you want to watch?
      </h2>
      <div className={`${searchStyles.mainSearchContainer}`}>
        <input
          type="text"
          id="search"
          spellCheck="false"
          aria-label="Search"
          aria-haspopup="false"
          role="button"
          name="search"
          onChange={(e) => setMovieSearch(e.target.value)}
          className={`${searchStyles.mainSearchContainerMainInput}`}
          placeholder="Search..."
          onKeyPress={handleSearch}
          value={movieSearch}
        />
        <span className={`${searchStyles.mainSearchContainerMainSpan}`}>
          <img
            src="/static/search-icon.png"
            alt="search-icon"
            onClick={handleSearch}
          />
        </span>
      </div>
    </section>
  );
};

export default SearchBox;
