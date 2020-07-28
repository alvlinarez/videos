import React, { useLayoutEffect } from 'react';
import NotFound from './NotFound';

import '../assets/styles/components/Player.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlayingMovieAction,
  updateMostWatchedAction
} from '../actions/moviesActions';
import Spinner from '../components/Spinner';

const Player = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.movies.playing);
  const loading = useSelector((state) => state.movies.loading);
  const hasPlaying = Object.keys(playing).length > 0;

  useLayoutEffect(() => {
    dispatch(getPlayingMovieAction(id));
  }, []);

  const handleBackButton = () => {
    // Update list of most watched movies
    dispatch(updateMostWatchedAction());
    props.history.goBack();
  };

  if (loading) {
    return (
      <div className="player-spinner__container">
        <Spinner />
      </div>
    );
  }

  return hasPlaying ? (
    <div className="Player">
      <video key={playing.source} src={playing.source} controls autoPlay />
      <div className="Player-back">
        <button type="button" onClick={handleBackButton}>
          Back
        </button>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Player;
