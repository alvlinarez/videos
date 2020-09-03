import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar } from 'swiper';
import CarouselItem from './CarouselItem';

import '../styles/components/Carousel.scss';
// swiper styles
//import '../styles/swiper/swiper.scss';
//import '../styles/swiper/scrollbar/scrollbar.scss';

SwiperCore.use([Scrollbar]);

// Responsive slides of carousel values
const breakpoints = {
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
    slidesPerGroup: 1
  },
  480: {
    slidesPerView: 4,
    spaceBetween: 10,
    slidesPerGroup: 2
  },
  768: {
    slidesPerView: 5,
    spaceBetween: 20
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 10
  },
  1200: {
    slidesPerView: 7,
    spaceBetween: 20
  }
};

const Carousel = ({ movies }) => {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={2}
      slidesPerGroup={2}
      breakpoints={breakpoints}
      scrollbar={{ draggable: true, dragClass: 'swiper-scrollbar-drag' }}
    >
      {movies &&
        movies.map((item) => (
          <SwiperSlide key={item.id}>
            <CarouselItem {...item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Carousel;
