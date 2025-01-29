import React, { useState } from 'react';
import Dice from './components/Dice';
import Player from './components/Player';
import board from './boardValues';
// import chance from "./chanceValues"; // Import szansy
import PurchaseDialog from './components/PurchaseDialog';
import ChanceDialog from "./components/ChanceDialog";
import handlePurchase from './handlePurchase';
import rollDice from './rollDice';
import './App.css'; // Zdefiniuj style w oddzielnym pliku CSS
import handleChance from "./handleChance";

const App = () => {
  const [players, setPlayers] = useState([
    new Player("Player 1", 1500),
    new Player("Player 2", 1500),
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [purchaseDialog, setPurchaseDialog] = useState(false);
  const [skipDialog, setSkipDialog] = useState(false); // Stan dla skip dialogu
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isDiceDisabled, setIsDiceDisabled] = useState(false); // Nowy stan do blokowania przycisku
  const [chanceDialog, setChanceDialog] = useState(false);
  const [chanceCard, setChanceCard] = useState(null);

  const currentPlayer = players[currentPlayerIndex];
  const currentSpace = board[currentPlayer.position];

   const handleRollDice = (diceResult) => {
    console.log("Dice rolled:", diceResult);
    setIsDiceDisabled(true);

    rollDice(
      diceResult,
      players,
      currentPlayerIndex,
      setPlayers,
      setCurrentPlayerIndex,
      setPurchaseDialog,
      setCurrentProperty,
      setSkipDialog,
      board,
      setChanceDialog,
      setChanceCard
    );
  };

  const handleChanceClose = () => {
    handleChance(chanceCard, players, currentPlayerIndex, setPlayers, setChanceDialog, setChanceCard, setIsDiceDisabled, board);
  };

  const nextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    setIsDiceDisabled(false); // Odblokowanie przycisku na koniec tury
  };

  // Funkcja do wyświetlania posiadłości gracza
  const renderPlayerProperties = () => {
    const playerProperties = board.filter(space => space.owner === currentPlayer);

    if (playerProperties.length === 0) {
      return <p>{currentPlayer.name} doesn't own any properties.</p>;
    }

    return (
      <div>
        <h3>{currentPlayer.name}'s Properties:</h3>
        <ul>
          {playerProperties.map((property, index) => (
            <li key={index}>{property.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Kontener na posiadłości po lewej stronie */}
      <div className="left-panel">
        {renderPlayerProperties()}
      </div>
  
      {/* Kontener na treści po prawej stronie */}
      <div className="right-panel">
        <h1>Monopoly Game</h1>
        <h2>Current Player: {currentPlayer.name}</h2>
        <h3>Current Space: {currentSpace.name}</h3>
        <p>Balance: ${currentPlayer.balance}</p>
        <p>Owner: {currentSpace.owner ? currentSpace.owner.name : 'none'}</p>
  
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
  
        {/* Dialog kart szansy */}
        {chanceDialog && <ChanceDialog chanceCard={chanceCard} onClose={handleChanceClose} />}
  
        {/* Dialog przejścia do kolejnego gracza */}
        {skipDialog && isDiceDisabled && !purchaseDialog && !chanceDialog && (
          <div>
            <h3>Do you want to move on to the next player?</h3>
            <button
              onClick={() => {
                setSkipDialog(false);
                nextPlayer();
              }}
            >
              Yes, move on!
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default App;
