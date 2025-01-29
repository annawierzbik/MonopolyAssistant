import React, { useState } from 'react';
import Dice from './components/Dice';
import Player from './components/Player';
import board from './boardValues';
// import chance from "./chanceValues"; // Import szansy
import PurchaseDialog from './components/PurchaseDialog';
import ChanceDialog from "./components/ChanceDialog";
import JailDialog from "./components/JailDialog";
import GetOutOfJailDialog from "./components/GetOutOfJailDialog";
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
  const [jailDialog, setJailDialog] = useState(false);
  const [getOutOfJailDialog, setGetOutOfJailDialog] = useState(false);
  const[taxDialog, setTaxDialog] = useState(false);

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
      setChanceCard,
      setJailDialog,
      setGetOutOfJailDialog,
      setTaxDialog
    );
  };

  const handleChanceClose = () => {
    handleChance(chanceCard, players, currentPlayerIndex, setPlayers, setChanceDialog, setChanceCard, setIsDiceDisabled, board);
    nextPlayer();
  };

  const handleGetOutOfJail = () => {
    console.log(`${currentPlayer.name} is using a "Get Out of Jail" card.`);
    currentPlayer.inJail = false;
    currentPlayer.hasJailCard = false;
    setGetOutOfJailDialog(false);
    setIsDiceDisabled(false);
  };

  const nextPlayer = () => {
    console.log(`Switching to the next player.`);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    setIsDiceDisabled(false); // Odblokowanie przycisku na koniec tury
  };

  const renderAllPlayersProperties = () => {
    return (
      <div>
        {players.map((player, index) => {
          // Filtrujemy nieruchomości dla każdego gracza
          const playerProperties = board.filter(space => space.owner === player);
  
          let positionClass = '';
          if (player.name === 'Player 1') {
            positionClass = 'top-left'; // Prawy górny róg
          } else if (player.name === 'Player 2') {
            positionClass = 'bottom-left'; // Lewy dolny róg
          }
          else if (player.name === 'Player 3') {
            positionClass = 'bottom-left'; // Lewy dolny róg
          }
          else if (player.name === 'Player 4') {
            positionClass = 'bottom-right'; // Lewy dolny róg
          }
  
          return (
            <div key={index} className={`player-properties ${positionClass}`}>
              <h4>{player.name}'s Properties:</h4>
              {playerProperties.length === 0 ? (
                <p>{player.name} doesn't own any properties.</p>
              ) : (
                <ul>
                  {playerProperties.map((property, idx) => (
                    <li key={idx}>{property.name}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  

  return (
    <div>
      <div>
        {renderAllPlayersProperties()}
      </div>

      <div>
        <h1>Monopoly Game</h1>
        <h2>Current Player: {currentPlayer.name}</h2>
        <h3>Current Space: {currentSpace.name}</h3>
        <p>Balance: ${currentPlayer.balance}</p>
        <p>Owner: {currentSpace.owner ? currentSpace.owner.name : 'none'}</p>

        <Dice
          rollDice={handleRollDice}
          isDisabled={isDiceDisabled} 
        />

        {purchaseDialog && (
          <PurchaseDialog
            property={currentProperty}
            onPurchase={(purchase) => {
              handlePurchase(purchase, players, currentPlayerIndex, currentProperty, setPlayers, setPurchaseDialog, setCurrentProperty);
              nextPlayer();
            }}
            onCancel={() => {
              setPurchaseDialog(false);
              setCurrentProperty(null);
              nextPlayer();
            }}
          />
        )}

        {chanceDialog && <ChanceDialog chanceCard={chanceCard} onClose={handleChanceClose} />}
        
        {taxDialog && (
          <div>
            <h3>You need to pay {currentSpace.cost}$</h3>
            <h3>Do you want to move on to the next player?</h3>
            <button
              onClick={() => {
                console.log(`${currentPlayer.name} is moving on to the next player.`);
                setTaxDialog(false);
                nextPlayer();
              }}
            >
              Yes, move on!
            </button>
          </div>
        )}
        
        {jailDialog && (
          <div>
            <JailDialog />
            <h3>Do you want to move on to the next player?</h3>
            <button
              onClick={() => {
                console.log(`${currentPlayer.name} is moving on to the next player.`);
                setJailDialog(false);
                nextPlayer();
              }}
            >
              Yes, move on!
            </button>
          </div>
        )}

        {getOutOfJailDialog && (
          <GetOutOfJailDialog
            onUseCard={() => {
              handleGetOutOfJail();
            }}
            onStay={() => {
              console.log(`${currentPlayer.name} chose to stay in jail.`);
              setGetOutOfJailDialog(false);
              nextPlayer();
            }}
          />
        )}

        {skipDialog && isDiceDisabled && !purchaseDialog && !chanceDialog && !jailDialog && !taxDialog &&(
          <div>
            <h3>Do you want to move on to the next player?</h3>
            <button
              onClick={() => {
                console.log(`${currentPlayer.name} is skipping to the next player.`);
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
