import React, { useState } from 'react';

const Dice = ({ rollDice, isDisabled }) => {
  const [dice, setDice] = useState([1, 1]);

  const roll = () => {
    const rollResult = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    setDice(rollResult);
    rollDice(rollResult);  
  };

  return (
    <div>
      <button 
        className={`neon-button ${isDisabled ? 'disabled' : ''}`} 
        onClick={roll} 
        disabled={isDisabled}
      >
        Roll dice
      </button>
      <div>
        <p class="dice" >Dice: {dice[0]} - {dice[1]}</p>
      </div>
    </div>
  );
};

export default Dice;
