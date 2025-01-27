// rollDice.js

const rollDice = (diceResult, players, currentPlayerIndex, setPlayers, setCurrentPlayerIndex, setPurchaseDialog, setCurrentProperty, board) => {
  const currentPlayer = players[currentPlayerIndex];
  const steps = diceResult[0] + diceResult[1];
  currentPlayer.move(steps);

  const currentSpace = board[currentPlayer.position];

  // Sprawdzamy, czy gracz stoi na nieruchomości, którą można kupić
  if (currentSpace.type === "property" && !currentSpace.owner) {
    setCurrentProperty(currentSpace);
    setPurchaseDialog(true);
  } else if (currentSpace.type === "property" && currentSpace.owner !== currentPlayer) {
    // Gracz musi zapłacić czynsz
    const owner = currentSpace.owner;
    const rent = currentSpace.cost / 10; // Zakładamy prosty czynsz
    currentPlayer.balance -= rent;
    owner.balance += rent;
    alert(`${currentPlayer.name} paid ${rent} in rent to ${owner.name}`);
  }

};

export default rollDice;
