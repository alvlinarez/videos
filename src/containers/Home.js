import React from 'react';

import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';

const Home = () => {
  return (
    <>
      <Header />
      <Search isHome />

      <Categories title="My List">
        <Carousel>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={item} {...item} isList />
          ))}
        </Carousel>
      </Categories>
    </>
  );
};

export default Home;
