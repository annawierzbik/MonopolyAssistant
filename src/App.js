import React, { useState } from 'react';
import Dice from './components/Dice';
import Player from './components/Player';
import board from './boardValues';
import PurchaseDialog from './components/PurchaseDialog';
import handlePurchase from './handlePurchase';
import rollDice from './rollDice';

const App = () => {
  const [players, setPlayers] = useState([
    new Player("Player 1", 1500),
    new Player("Player 2", 1500),
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [purchaseDialog, setPurchaseDialog] = useState(false);
  const [skipDialog, setSkipDialog] = useState(false); // Nowy stan do dialogu przejścia
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isDiceDisabled, setIsDiceDisabled] = useState(false); // Nowy stan do blokowania przycisku

  const currentPlayer = players[currentPlayerIndex];
  const currentSpace = board[currentPlayer.position];

  const handleRollDice = (diceResult) => {
    // Blokujemy przycisk na czas pokazania dialogu
    setIsDiceDisabled(true);

    // Wywołanie funkcji rollDice
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

    // Sprawdzamy, czy pole to działka, jeśli nie, wyświetlamy dialog przejścia
    if (currentSpace.type !== "property") {
      setSkipDialog(true); // Pokazujemy dialog przejścia
    }
  };

  const nextPlayer = () => {
    // Funkcja do zmiany gracza po zakończeniu tury
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    setIsDiceDisabled(false); // Odblokowanie przycisku na koniec tury
  };

  return (
    <div>
      <h1>Monopoly Game</h1>
      <h2>Current Player: {currentPlayer.name}</h2>
      <h3>Current Space: {currentSpace.name}</h3>
      <p>Balance: ${currentPlayer.balance}</p>
      <p>Owner: {currentSpace.owner ? currentSpace.owner.name : 'none'}</p>

      {/* Dodanie stanu isDiceDisabled do komponentu Dice */}
      <Dice
        rollDice={handleRollDice}
        isDisabled={isDiceDisabled} // Blokowanie przycisku na podstawie isDiceDisabled
      />

      {/* Dialog zakupu nieruchomości */}
      {purchaseDialog && (
        <PurchaseDialog
          property={currentProperty}
          onPurchase={(purchase) => {
            handlePurchase(purchase, players, currentPlayerIndex, currentProperty, setPlayers, setPurchaseDialog, setCurrentProperty);
            nextPlayer(); // Zmiana gracza po zakończeniu zakupu
          }}
          onCancel={() => {
            setPurchaseDialog(false);
            setCurrentProperty(null);
            nextPlayer(); // Zmiana gracza po anulowaniu zakupu
          }}
        />
      )}

      {/* Dialog przejścia do kolejnego gracza */}
      {skipDialog && isDiceDisabled && !purchaseDialog && (
        <div>
          <h3>Do you want to move on to the next player?</h3>
          <button
            onClick={() => {
              setSkipDialog(false);
              nextPlayer(); // Zmiana gracza po przejściu dalej
            }}
          >
            Yes, move on!
          </button>
          <button
            onClick={() => {
              setSkipDialog(false); // Zamknięcie dialogu bez zmiany gracza
            }}
          >
            No, wait
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
