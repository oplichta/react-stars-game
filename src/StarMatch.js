import React from 'react';
import './Star-match.css';
import PlayNumber from './PlayNumber';
import Stars from './Stars';
import utils from './Utils';
import PlayAgainBtn from './PlayAgainBtn';
import useGameState from './UseGameState';

const StarMatch = (props) => {
  const { stars, availableNumbers, candidateNumbers, secondsLeft, setGameState } = useGameState();
  const candidatesAreWrong = utils.sum(candidateNumbers) > stars;
  const gameStatus = availableNumbers.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

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
    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">Pick 1 or more numbers that sum to the number of stars</div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? <PlayAgainBtn onClick={props.startNewGame} gameStatus={gameStatus} /> : <Stars count={stars} />}
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
