import React from 'react';
import PlayerInfo from './PlayerInfo';
import Controls from './Controls';

const Sidebar = ({ players, currentPlayer, diceRoll, rollDice, endTurn }) => {
  return (
    <div id="sidebar" className="w-1/3 p-4 border-l-2">
      <h2 className="text-2xl font-bold">Monopoly</h2>
      <PlayerInfo players={players} />
      <Controls
        currentPlayer={currentPlayer}
        diceRoll={diceRoll}
        rollDice={rollDice}
        endTurn={endTurn}
      />
    </div>
  );
};

export default Sidebar;
