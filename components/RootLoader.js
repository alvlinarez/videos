import React from 'react';
import Spinner from './Spinner';
import '../styles/components/RootLoader.scss';

const RootLoader = () => {
  const background = localStorage.getItem('authBackground');
  return (
    <div
      className={`rootLoader-container ${background && 'rootLoader-authColor'}`}
    >
      <Spinner rootLoader />
    </div>
  );
};

export default RootLoader;
