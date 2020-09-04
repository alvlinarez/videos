import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import secondsToTime from '../utils/secondsToTime';

import carouselItemStyles from '../styles/components/CarouselItem.module.scss';
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
      <div className={`${carouselItemStyles.carouselItemDetails}`}>
        <div
          className={`${carouselItemStyles.carouselItemDetailsImgContainer}`}
        >
          <Link
            href="/player/[id]"
            as={`/player/${id}`}
            onClick={() => dispatch(updateMostWatchedAction(id))}
          >
            <a>
              <img
                className={`${carouselItemStyles.carouselItemDetailsImg}`}
                src="/static/play-icon.png"
                alt="Play Icon"
              />
            </a>
          </Link>
          {isInPlaylist === undefined ? ( // this key is undefined when movie is already in playlist
            <img
              className={`${carouselItemStyles.carouselItemDetailsImg}`}
              src="/static/remove-icon.png"
              alt="Remove Icon"
              onClick={handleDeleteFavorite}
            />
          ) : isInPlaylist ? (
            <img
              className={`${carouselItemStyles.carouselItemDetailsImg}`}
              src="/static/remove-icon.png"
              alt="Remove Icon"
              onClick={handleDeleteFavorite}
            />
          ) : (
            <img
              className={`${carouselItemStyles.carouselItemDetailsImg}`}
              src="/static/plus-icon.png"
              alt="Plus Icon"
              onClick={handleSetFavorite}
            />
          )}
        </div>
        <p className={`${carouselItemStyles.carouselItemDetailsTitle}`}>
          {title}
        </p>
        <p
          className={`${carouselItemStyles.carouselItemDetailsSubtitle}`}
        >{`${year} ${contentRating.name} ${secondsToTime(duration)}`}</p>
      </div>
    </>
  );
};

export default CarouselItem;
