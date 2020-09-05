import React from 'react';
import Spinner from './Spinner';
import '../assets/styles/components/RootLoader.scss';

const RootLoader = () => {
  const background =
    typeof localStorage !== 'undefined' &&
    localStorage !== null &&
    localStorage.getItem('authBackground');
  return (
    <div
      className={`rootLoader-container ${background && 'rootLoader-authColor'}`}
    >
      <Spinner rootLoader />
    </div>
  );
};

export default RootLoader;
