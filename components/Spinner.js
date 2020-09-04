import React from 'react';
import spinnerStyles from '../styles/components/Spinner.module.scss';

const Spinner = (props) => {
  const { rootLoader } = props;
  return (
    <div
      className={`${spinnerStyles.spinner} ${
        rootLoader ? spinnerStyles.rootLoader : ''
      }`}
    >
      <div className={`${spinnerStyles.doubleBounce1}`} />
      <div className={`${spinnerStyles.doubleBounce2}`} />
    </div>
  );
};

export default Spinner;
