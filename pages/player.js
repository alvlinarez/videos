import React, { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NotFound from './not-found';

import '../styles/components/Player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayingMovieAction } from '../actions/moviesActions';
import Spinner from '../components/Spinner';

const Player = (props) => {
  const { id } = props.match.params;
  const router = useRouter();
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.movies.playing);
  // get movie loader from api
  const loading = useSelector((state) => state.movies.loading);

  // if movie exists or not
  const hasPlaying = Object.keys(playing).length > 0;
  // if movie is fully loaded loader
  const [movieLoading, setMovieLoading] = useState(true);

  useLayoutEffect(() => {
    dispatch(getPlayingMovieAction(id));
  }, []);

  const handleBackButton = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="player-spinner__container">
        <Spinner />
      </div>
    );
  }

  return hasPlaying ? (
    <>
      {movieLoading && (
        <div className="player-spinner__container">
          <Spinner />
        </div>
      )}
      <div className="Player">
        <video
          style={{ display: `${movieLoading ? 'none' : 'block'}` }}
          key={playing.source}
          src={playing.source}
          controls
          autoPlay
          onLoadedData={() => {
            setMovieLoading(false);
          }}
        />
        <div className="Player-back">
          <button type="button" onClick={handleBackButton}>
            Back
          </button>
        </div>
      </div>
    </>
  ) : (
    <NotFound />
  );
};

export default Player;
