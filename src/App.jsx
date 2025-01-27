import React, { useState } from 'react';
import Board from './components/Board';
import Sidebar from './components/Sidebar';
import board from './board';

const App = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', position: 0, balance: 1500 },
    { id: 2, name: 'Player 2', position: 0, balance: 1500 },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = players[currentPlayerIndex];
    const newPosition = (currentPlayer.position + roll) % board.length;

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = {
      ...currentPlayer,
      position: newPosition,
    };

    setPlayers(updatedPlayers);
    setDiceRoll(roll);
  };

  const endTurn = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setDiceRoll(null);
  };

  return (
    <div id="game-container" className="flex">
      <Board board={board} players={players} />
      <Sidebar
        players={players}
        currentPlayer={players[currentPlayerIndex]}
        diceRoll={diceRoll}
        rollDice={rollDice}
        endTurn={endTurn}
      />
    </div>
  );
};

export default App;
