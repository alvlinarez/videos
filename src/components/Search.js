import React from 'react';
import '../assets/styles/components/Search.scss';

const Search = () => {
  return (
    <section className="main">
      <h2 className="main__title">What do you want to watch?</h2>
      <input type="text" className="main__input" placeholder="Search..." />
    </section>
  );
};

export default Search;
