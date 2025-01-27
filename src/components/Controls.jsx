import React from 'react';

const Controls = ({ currentPlayer, diceRoll, rollDice, endTurn }) => {
  return (
    <div id="controls" className="my-4">
      <div>
        <strong>Current Player:</strong> {currentPlayer.name}
      </div>
      {diceRoll && <div>Dice Roll: {diceRoll}</div>}
      <button
        onClick={rollDice}
        className="p-2 m-2 bg-blue-500 text-white rounded"
        disabled={diceRoll !== null}
      >
        Roll Dice
      </button>
      <button
        onClick={endTurn}
        className="p-2 m-2 bg-green-500 text-white rounded"
        disabled={diceRoll === null}
      >
        End Turn
      </button>
    </div>
  );
};

export default Controls;
