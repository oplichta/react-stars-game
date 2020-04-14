import React, { useState } from 'react';
import colors from './Colors';

const PlayNumber = (props) => (
  <button
    key={props.number}
    className="number"
    style={{ backgroundColor: colors[props.status] }}
    onClick={() => console.log('Num', props.number)}
  >
    {props.number}
  </button>
);
export default PlayNumber;
