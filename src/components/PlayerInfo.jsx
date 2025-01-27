import React from 'react';

const PlayerInfo = ({ players }) => {
  return (
    <div id="player-info" className="my-4">
      {players.map(player => (
        <div key={player.id} className="mb-2">
          <strong>{player.name}</strong>: ${player.balance}
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;
