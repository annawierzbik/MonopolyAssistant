// Dice.js
import React, { useState } from 'react';

const Dice = ({ rollDice }) => {
  const [dice, setDice] = useState([1, 1]);

  const roll = () => {
    const rollResult = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    setDice(rollResult);
    rollDice(rollResult);  // Przekazujemy wynik rzutu z powrotem do App.js
  };

  return (
    <div>
      <button onClick={roll}>Roll Dice</button>
      <div>
        <p>Dice: {dice[0]} - {dice[1]}</p>
      </div>
    </div>
  );
};

export default Dice;
