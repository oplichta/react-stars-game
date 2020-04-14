import React, { useState } from 'react';
import './Star-match.css';
import PlayNumber from './PlayNumber';
import Stars from './Stars';
import utils from './Utils';

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidateNumbers, setCandidateNumbers] = useState([]);
  const candidatesAreWrong = utils.sum(candidateNumbers) > stars;
  const numberStatus = (number) => {
    if (!availableNumbers.includes(number)) {
      return 'used';
    }
    if (candidateNumbers.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };
  return (
    <div className="game">
      <div className="help">Pick 1 or more numbers that sum to the number of stars</div>
      <div className="body">
        <div className="left">
          <Stars count={stars} />
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber key={number} number={number} status={numberStatus(number)} />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

export default StarMatch;
