const rollDice = (diceResult, players, currentPlayerIndex, setPlayers, setCurrentPlayerIndex, setPurchaseDialog, setCurrentProperty, setSkipDialog, board) => {
  const currentPlayer = players[currentPlayerIndex];
  const steps = diceResult[0] + diceResult[1];
  currentPlayer.move(steps);

  const currentSpace = board[currentPlayer.position];

  // Sprawdzamy, czy gracz stoi na nieruchomości, którą można kupić
  if (currentSpace.type === "property" && !currentSpace.owner) {
    console.log("Property space, showing purchase dialog if needed");
    setCurrentProperty(currentSpace);
    setPurchaseDialog(true);
  } else if (currentSpace.type === "property" && currentSpace.owner !== currentPlayer) {
    // Gracz musi zapłacić czynsz
    const owner = currentSpace.owner;
    const rent = currentSpace.cost / 10; // Zakładamy prosty czynsz
    if(!currentPlayer.payRent(rent)){
      alert(`Not enough money to pay rent! ${currentPlayer.name} lost`)
    }
    owner.getRent(rent);
    alert(`${currentPlayer.name} paid ${rent} in rent to ${owner.name}`);
    setSkipDialog(true);
  } else {
    // Jeśli pole nie jest nieruchomością, wyświetlamy dialog przejścia
    setSkipDialog(true);
    console.log("Non-property space, showing skip dialog");
  }
};

export default rollDice;
