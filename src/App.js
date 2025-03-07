import React, { useState } from 'react';
import Dice from './components/Dice';
import Player from './components/Player';
import board from './boardValues';
import PurchaseDialog from './components/PurchaseDialog';
import ChanceDialog from './components/ChanceDialog';
import JailDialog from './components/JailDialog';
import GetOutOfJailDialog from './components/GetOutOfJailDialog';
import handlePurchase from './handlePurchase';
import rollDice from './rollDice';
import './App.css'; 
import handleChance from './handleChance';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [purchaseDialog, setPurchaseDialog] = useState(false);
  const [skipDialog, setSkipDialog] = useState(false); 
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isDiceDisabled, setIsDiceDisabled] = useState(false); 
  const [chanceDialog, setChanceDialog] = useState(false);
  const [chanceCard, setChanceCard] = useState(null);
  const [jailDialog, setJailDialog] = useState(false);
  const [getOutOfJailDialog, setGetOutOfJailDialog] = useState(false);
  const [taxDialog, setTaxDialog] = useState(false);
  const [numPlayers, setNumPlayers] = useState(2);
  const [gameStarted, setGameStarted] = useState(false); 
  const [playerNames, setPlayerNames] = useState(Array(4).fill('')); 

  const handleNumPlayersChange = (e) => {
    const value = parseInt(e.target.value);
    setNumPlayers(value);
    setPlayerNames(Array(value).fill('')); 
  };

  const handlePlayerNameChange = (index, name) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  const handleAddPlayers = () => {
    const newPlayers = [];
    for (let i = 1; i <= numPlayers; i++) {
      newPlayers.push(new Player(playerNames[i-1], 1500, i)); 
    }
    setPlayers(newPlayers);
    setGameStarted(true); 
  };

  const currentPlayer = players[currentPlayerIndex] || { name: 'Unknown', position: 0 };
  const currentSpace = board[currentPlayer.position] || { name: 'Unknown', owner: null };

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
    setIsDiceDisabled(false); 
  };

  const renderAllPlayersInfo = () => {
    return (
      <div>
        {players.map((player, index) => {
          const playerProperties = board.filter(space => space.owner === player);

          let positionClass = '';
          if (player.number === 1 ) {
            positionClass = 'top-left'; 
          } else if (player.number === 2) {
            positionClass = 'top-right'; 
          }
          else if (player.number === 3) {
            positionClass = 'bottom-right'; 
          }
          else if (player.number === 4) {
            positionClass = 'bottom-left'; 
          }

          return (
            <div key={index} className={`player-properties ${positionClass}`}>
              <h4>{player.name ? player.name : `Player ${index+1}`}’s Properties:</h4>
              {playerProperties.length === 0 ? (
                <p>{player.name ? player.name : `Player ${index+1}`} doesn't own any properties.</p>
              ) : (
                <ul>
                  {playerProperties.map((property, idx) => (
                    <li key={idx}>{property.name}</li>
                  ))}
                </ul>
              )}
              <h4>
                {player.name ? player.name : `Player ${index+1}`}’s Balance: {player.balance}
              </h4>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {!gameStarted ? (
        <div>
          <div class="start-text">Enter Number of Players:</div>
          <input 
            type="number" 
            value={numPlayers} 
            onChange={handleNumPlayersChange}
            min="2" 
            max="4"
          />
          <div>
            <div class="start-text">Enter Player Names:</div>
            {Array.from({ length: numPlayers }).map((_, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={playerNames[index]}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  placeholder={`Player ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <button class="neon-button" onClick={handleAddPlayers}>Start Game</button>
        </div>
      ) : (
        <div>
          <div>
            {renderAllPlayersInfo()}
          </div>

          <div>
            <div class = "title">Monopoly Game</div>
            <div class="game-info">Current Player: {currentPlayer.name}</div>
            <div class="game-info">Current Space: {currentSpace.name}</div>
            <div class='game-info'>Owner: {currentSpace.owner ? currentSpace.owner.name : 'none'}</div>

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
                <div class="dialog">You need to pay {currentSpace.cost}$</div>
                <div class="dialog">Do you want to move on to the next player?</div>
                <button class="neon-button-small"
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
                <div class="dialog">Do you want to move on to the next player?</div>
                <button class="neon-button-small"
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
                <div class="dialog">Do you want to move on to the next player?</div>
                <button class="neon-button-small"
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
      )}
    </div>
  );
};

export default App;
