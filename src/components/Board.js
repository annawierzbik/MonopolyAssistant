// Board.js
import React from 'react';
import board from '../boardValues';  // Zaimportuj dane planszy
import './Board.css';         // Zaimportuj stylizacje dla planszy

const Board = () => {
  return (
    <div id="board">
      {board.map((tile, index) => (
        <div key={index} className={`tile ${tile.type}`} style={{ backgroundColor: tile.color || '#fff' }}>
          <h4>{tile.name}</h4>
          {tile.type === 'property' && (
            <div>
              <p>Cost: ${tile.cost}</p>
              <p>Rent: {tile.rent.join(', ')}</p>
              <p>House Cost: ${tile.house}</p>
            </div>
          )}
          {tile.type === 'railroad' && <p>Railroad Cost: ${tile.cost}</p>}
          {tile.type === 'utility' && <p>Utility Cost: ${tile.cost}</p>}
          {tile.type === 'tax' && <p>Tax: ${tile.cost}</p>}
          {tile.type === 'corner' && <p>Special Tile: {tile.name}</p>}
        </div>
      ))}
    </div>
  );
};

export default Board;
