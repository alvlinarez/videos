import React from 'react';
import '../styles/components/NotFound.scss';

const NotFound = () => {
  return (
    <>
      <section className="main-404">
        <div className="main-404__container">
          <div className="main-404__container--title">
            <h2 className="pulse">404</h2>
          </div>
          <div className="main-404__container--subtitle">
            <p>Page Not Found</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
