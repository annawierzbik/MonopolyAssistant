import chance from "./chanceValues";

const rollDice = (
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
) => {
  const currentPlayer = players[currentPlayerIndex];
  const steps = diceResult[0] + diceResult[1];
  currentPlayer.move(steps);

  const currentSpace = board[currentPlayer.position];

  if (currentSpace.type === "property" && !currentSpace.owner) {
    setCurrentProperty(currentSpace);
    setPurchaseDialog(true);
  } else if (currentSpace.type === "property" && currentSpace.owner !== currentPlayer) {
    const owner = currentSpace.owner;
    const rent = currentSpace.rent[0];

    if (!currentPlayer.payRent(rent)) {
      alert(`Not enough money to pay rent! ${currentPlayer.name} lost`);
    } else {
      owner.getRent(rent);
      alert(`${currentPlayer.name} paid ${rent} in rent to ${owner.name}`);
    }

    setSkipDialog(true);
    } else if (currentSpace.type === "chance") {
      const drawnCard = chance[Math.floor(Math.random() * chance.length)]; // Draw a random Chance card
      setChanceCard(drawnCard);
      setChanceDialog(true); // Show the Chance card dialog
    
      // Wait for the player to close the dialog before applying the effect
      return;
    } else {
    setSkipDialog(true);
  }
};

export default rollDice;