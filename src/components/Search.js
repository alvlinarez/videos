import React from 'react';
import '../assets/styles/components/Search.scss';

const Search = ({ isHome }) => {
  return (
    <section className="main">
      <h2 className="main__title">What do you want to watch?</h2>
      <input
        type="text"
        className={`input ${isHome ? 'isHome' : ''}`}
        placeholder="Search..."
      />
    </section>
  );
};

export default Search;
