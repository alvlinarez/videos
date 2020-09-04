import React from 'react';
import notFoundStyles from '../styles/components/notFound.module.scss';

const NotFound = () => {
  return (
    <>
      <section className={`${notFoundStyles.main404}`}>
        <div className={`${notFoundStyles.main404Container}`}>
          <div className={`${notFoundStyles.main404ContainerTitle}`}>
            <h2 className={`${notFoundStyles.pulse}`}>404</h2>
          </div>
          <div className={`${notFoundStyles.pulse}`}>
            <p>Page Not Found</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
