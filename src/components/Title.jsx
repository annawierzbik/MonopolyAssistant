import React from 'react';

const Tile = ({ tile, players }) => {
  const playersOnTile = players.filter(player => player.position === tile.index);

  return (
    <div
      className={`tile border flex flex-col justify-center items-center ${
        tile.corner ? 'bg-gray-300 font-bold' : 'bg-white'
      }`}
      style={{ backgroundColor: tile.color || 'white' }}
    >
      <div>{tile.name}</div>
      <div className="flex">
        {playersOnTile.map(player => (
          <span key={player.id} className="text-xs mx-1">
            {player.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tile;
