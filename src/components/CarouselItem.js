import React from 'react';
import { Link } from 'react-router-dom';

import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

import secondsToTime from '../utils/secondsToTime';

import 'swiper/swiper.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import '../assets/styles/components/CarouselItem.scss';

const CarouselItem = (props) => {
  const { id, title, year, contentRating, duration, isList, cover } = props;
  const handleSetFavorite = () => {};
  const handleDeleteFavorite = (id) => {};
  return (
    <>
      <img className="swiper-image" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div className="carousel-item__details--img-container">
          <Link to={`/player/${id}`}>
            <img
              className="carousel-item__details--img"
              src={playIcon}
              alt="Play Icon"
            />
          </Link>
          {isList ? (
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="Remove Icon"
              onClick={() => handleDeleteFavorite(id)}
            />
          ) : (
            <img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Plus Icon"
              onClick={handleSetFavorite}
            />
          )}
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">{`${year} ${
          contentRating.name
        } ${secondsToTime(duration)}`}</p>
      </div>
    </>
  );
};

export default CarouselItem;
