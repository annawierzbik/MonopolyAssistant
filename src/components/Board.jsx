import React from 'react';
import Tile from './Title';

const Board = ({ board, players }) => {
  return (
    <div id="board" className="grid grid-cols-11 grid-rows-11 border-2">
      {board.map((tile, index) => (
        <Tile key={index} tile={tile} players={players} />
      ))}
    </div>
  );
};

export default Board;
