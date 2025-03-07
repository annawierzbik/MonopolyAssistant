import React from 'react';
import board from '../boardValues';

const Board = ({ players }) => {
  return (
    <div className="board">
      {board.map((space, index) => (
        <div key={index} className="space">
          <div>{space.name}</div>
          {space.type === 'property' && space.owner && (
            <div>Owned by: {space.owner.name}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
