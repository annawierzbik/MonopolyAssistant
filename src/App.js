import React, { useState } from 'react';
import Dice from './components/Dice';
import Player from './components/Player';
import board from './boardValues';
import PurchaseDialog from './components/PurchaseDialog';
import rollDice from './rollDice';
import handlePurchase from './handlePurchase';

const App = () => {
  const [players, setPlayers] = useState([
    new Player("Player 1", 1500),
    new Player("Player 2", 1500),
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [purchaseDialog, setPurchaseDialog] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  const currentPlayer = players[currentPlayerIndex];
  const currentSpace = board[currentPlayer.position];

  return (
    <div>
      <h1>Monopoly Game</h1>
      <h2>Current Player: {currentPlayer.name}</h2>
      <h3>Current Space: {currentSpace.name}</h3>
      <p>Balance: ${currentPlayer.balance}</p>
      <p>Owner: {currentSpace.owner ? currentSpace.owner.name : 'none'}</p> {/* Wyświetlanie właściciela */}

      <Dice
        rollDice={(diceResult) => {
          // Wywołanie funkcji rollDice, teraz z przekazaniem setCurrentPlayerIndex
          rollDice(
            diceResult, 
            players, 
            currentPlayerIndex, 
            setPlayers, 
            setCurrentPlayerIndex, 
            setPurchaseDialog, 
            setCurrentProperty, 
            board
          );
        }}
      />

      {/* Dialog zakupu nieruchomości */}
      {purchaseDialog && (
        <PurchaseDialog
          property={currentProperty}
          onPurchase={(purchase) => handlePurchase(purchase, players, currentPlayerIndex, currentProperty, setPlayers, setPurchaseDialog, setCurrentProperty)}
          onCancel={() => {
            setPurchaseDialog(false);
            setCurrentProperty(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
