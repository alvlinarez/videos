import React, { useLayoutEffect, useCallback, useState } from 'react';
import NotFound from './NotFound';

import '../assets/styles/components/Player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayingMovieAction } from '../actions/moviesActions';
import Spinner from '../components/Spinner';

const Player = (props) => {
  const { id } = props.match.params;

  const playing = useSelector((state) => state.movies.playing);

  const loading = useSelector((state) => state.movies.loading);

  const dispatch = useDispatch();
  const hasPlaying = Object.keys(playing).length > 0;

  // useCallback is used cause trends and originals objects are finally filled inside
  // const getMovie = useCallback(() => {
  //   if (trends === null || originals === null) {
  //     dispatch(getPlayingMovieAction(id, true));
  //   } else {
  //     dispatch(getPlayingMovieAction(id));
  //   }
  // }, []);

  useLayoutEffect(() => {
    dispatch(getPlayingMovieAction(id));
  }, []);

  if (loading) {
    return (
      <div className="player-spinner__container">
        <Spinner />
      </div>
    );
  }

  return hasPlaying ? (
    <div className="Player">
      <video key={playing.source} controls autoPlay>
        <source src={playing.source} type="video/mp4" />
      </video>
      <div className="Player-back">
        <button type="button" onClick={() => props.history.goBack()}>
          Back
        </button>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Player;
