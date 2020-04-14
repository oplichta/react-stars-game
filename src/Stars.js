import React from 'react';
import utils from './Utils';

const Stars = (props) => (
  <>
    {utils.range(1, props.count).map((starId) => (
      <div key={starId} className="star"></div>
    ))}
  </>
);
export default Stars;
