import React from 'react';
import NotFound from './NotFound';

import '../assets/styles/components/Player.scss';

const Player = (props) => {
  //const { id } = props.match.params;
  //const hasPlaying = Object.keys(props.playing).length > 0;
  const hasPlaying = true;
  const url = 'https://aws-alg-drive.s3.amazonaws.com/skins/1_Tony.mp4';
  return hasPlaying ? (
    <div className="Player">
      <video key={url} controls autoPlay>
        {/*<source src={props.playing.source} type="video/mp4" />*/}
        <source src={url} type="video/mp4" />
      </video>
      <div className="Player-back">
        <button type="button" onClick={() => props.history.goBack()}>
          Back
        </button>
      </div>
    </div>
  ) : (
    NotFound
  );
};

export default Player;
