import React, { useState } from 'react';

const PlayNumber = (props) => (
  <button key={props.number} className="number" onClick={() => console.log('Num', props.number)}>
    {props.number}
  </button>
);
export default PlayNumber;
