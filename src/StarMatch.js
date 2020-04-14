import React, { useState, useEffect } from 'react';
import './Star-match.css';
import PlayNumber from './PlayNumber';
import Stars from './Stars';
import utils from './Utils';
import PlayAgainBtn from './PlayAgainBtn';

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidateNumbers, setCandidateNumbers] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const candidatesAreWrong = utils.sum(candidateNumbers) > stars;
  const gameStatus = availableNumbers.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNumbers(utils.range(1, 9));
    setCandidateNumbers([]);
  };

  const numberStatus = (number) => {
    if (!availableNumbers.includes(number)) {
      return 'used';
    }
    if (candidateNumbers.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || gameStatus !== 'active') {
      return;
    }
    const newCandidateNums =
      currentStatus === 'available' ? candidateNumbers.concat(number) : candidateNumbers.filter((cn) => cn !== number);
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNumbers(newCandidateNums);
    } else {
      const newAvailableNums = availableNumbers.filter((n) => !newCandidateNums.includes(n));
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNumbers(newAvailableNums);
      setCandidateNumbers([]);
    }
  };

  return (
    <div className="game">
      <div className="help">Pick 1 or more numbers that sum to the number of stars</div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? <PlayAgainBtn onClick={resetGame} gameStatus={gameStatus} /> : <Stars count={stars} />}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber key={number} number={number} status={numberStatus(number)} onClick={onNumberClick} />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft} </div>
    </div>
  );
};

export default StarMatch;
