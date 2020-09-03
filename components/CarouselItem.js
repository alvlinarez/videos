import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import secondsToTime from '../utils/secondsToTime';

import '../styles/components/CarouselItem.scss';
// swiper styles
//import '../styles/swiper/swiper.scss';
//import '../styles/swiper/scrollbar/scrollbar.scss';

import {
  addMovieToPlaylistAction,
  removeMovieToPlaylistAction
} from '../actions/playlistActions';
import { updateMostWatchedAction } from '../actions/moviesActions';

const CarouselItem = (props) => {
  const {
    id,
    title,
    year,
    contentRating,
    duration,
    cover,
    isInPlaylist
  } = props;
  const dispatch = useDispatch();

  const handleSetFavorite = () => {
    dispatch(addMovieToPlaylistAction(id));
  };
  const handleDeleteFavorite = () => {
    dispatch(removeMovieToPlaylistAction(id));
  };
  return (
    <>
      <img className="swiper-image" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div className="carousel-item__details--img-container">
          <Link
            to={`/player/${id}`}
            onClick={() => dispatch(updateMostWatchedAction(id))}
          >
            <img
              className="carousel-item__details--img"
              src="/static/play-icon.png"
              alt="Play Icon"
            />
          </Link>
          {isInPlaylist === undefined ? ( // this key is undefined when movie is already in playlist
            <img
              className="carousel-item__details--img"
              src="/static/remove-icon.png"
              alt="Remove Icon"
              onClick={handleDeleteFavorite}
            />
          ) : isInPlaylist ? (
            <img
              className="carousel-item__details--img"
              src="/static/remove-icon.png"
              alt="Remove Icon"
              onClick={handleDeleteFavorite}
            />
          ) : (
            <img
              className="carousel-item__details--img"
              src="/static/plus-icon.png"
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
