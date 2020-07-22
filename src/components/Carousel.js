import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar } from 'swiper';
import CarouselItem from './CarouselItem';

import '../assets/styles/components/Carousel.scss';
import 'swiper/swiper.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Scrollbar]);

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

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={2}
      slidesPerGroup={2}
      breakpoints={breakpoints}
      scrollbar={{ draggable: true, dragClass: 'swiper-scrollbar-drag' }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
        <SwiperSlide key={item}>
          <CarouselItem {...item} isList />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
