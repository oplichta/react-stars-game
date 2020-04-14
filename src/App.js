import React, { useState } from 'react';
import StarMatch from './StarMatch';
import './App.css';

function App() {
  const [gameId, setGameId] = useState(1);
  return (
    <div className="App">
      <header className="App-header">
        <StarMatch key={gameId} startNewGame={() => setGameId(gameId + 1)} />
      </header>
    </div>
  );
}

export default App;
