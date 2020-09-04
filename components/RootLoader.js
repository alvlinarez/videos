import React from 'react';
import Spinner from './Spinner';
import rootLoaderStyles from '../styles/components/RootLoader.module.scss';

const RootLoader = () => {
  const background = localStorage.getItem('authBackground');
  return (
    <div
      className={`${rootLoaderStyles.rootLoaderContainer} ${
        background && rootLoaderStyles.rootLoaderAuthColor
      }`}
    >
      <Spinner rootLoader />
    </div>
  );
};

export default RootLoader;
