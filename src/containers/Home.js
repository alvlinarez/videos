import React from 'react';

import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';

const Home = () => {
  return (
    <>
      <Header />
      <Search isHome />

      <Categories title="My Playlist">
        <Carousel />
      </Categories>

      <Categories title="Trending">
        <Carousel />
      </Categories>

      <Categories title="Original">
        <Carousel />
      </Categories>
    </>
  );
};

export default Home;
