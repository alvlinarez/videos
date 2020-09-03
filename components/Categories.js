import React from 'react';
import '../styles/components/Categories.scss';

const Categories = ({ children, title }) => {
  return (
    <section className="categories">
      <div className="categories-container">
        <h3 className="categories-container__title">{title}</h3>
        {children}
      </div>
    </section>
  );
};

export default Categories;
