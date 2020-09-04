import React from 'react';
import categoriesStyles from '../styles/components/Categories.module.scss';

const Categories = ({ children, title }) => {
  return (
    <section className={`${categoriesStyles.categories}`}>
      <div className={`${categoriesStyles.categoriesContainer}`}>
        <h3 className={`${categoriesStyles.categoriesContainerTitle}`}>
          {title}
        </h3>
        {children}
      </div>
    </section>
  );
};

export default Categories;
