import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TicTacToeGame from './Games/TicTacToe/TicTacToeGame';
import SnakeGame from './Games/SnakeGame/SnakeGame';
import Home from './Home';
import { GameName } from './types';
import { GameNameContext } from './contexts/GameNameContext';

function App() {

  const [gameName, setGameName] = useState<GameName>(GameName.NoGameSelected);

  return (
    <GameNameContext.Provider value={{ gameName, setGameName }}>
      <div className="App">
        {gameName === GameName.NoGameSelected ? <Home />
          : gameName === GameName.TicTacToe ? <TicTacToeGame />
            : gameName === GameName.SnakeGame ? <SnakeGame />
              : <div></div>}
      </div>
    </GameNameContext.Provider>
  );
}

export default App;
