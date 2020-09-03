import React from 'react';
import '../styles/components/Spinner.scss';

const Spinner = (props) => {
  const { rootLoader } = props;
  return (
    <div className={`spinner ${rootLoader ? 'rootLoader' : ''}`}>
      <div className="double-bounce1" />
      <div className="double-bounce2" />
    </div>
  );
};

export default Spinner;
