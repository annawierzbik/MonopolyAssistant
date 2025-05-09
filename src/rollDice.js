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
  setChanceCard,
  setJailDialog,
  setGetOutOfJailDialog,
  setTaxDialog
) => {
  const currentPlayer = players[currentPlayerIndex];
  const steps = diceResult[0] + diceResult[1];

  console.log(`${currentPlayer.name} rolls the dice: ${diceResult[0]} + ${diceResult[1]} = ${steps} steps`);

  if (currentPlayer.inJail) {
    console.log(`${currentPlayer.name} is in jail. Moving to jail exit...`);
    console.log(`${currentPlayer.hasJailCard} has jail card value`);
    if(currentPlayer.hasJailCard){
      console.log(`${currentPlayer.name} has jail card`);
      setGetOutOfJailDialog(true);
      currentPlayer.inJail = false;
    }
    else{
      currentPlayer.inJail = false;
      setJailDialog(true); 
      console.log(`${currentPlayer.name} is no longer in jail.`);
    }
  } else {
    console.log(`${currentPlayer.name} moves ${steps} steps.`);
    currentPlayer.move(steps); 
  }

  const currentSpace = board[currentPlayer.position];
  console.log(`${currentPlayer.name} is now on space: ${currentSpace.name} (Type: ${currentSpace.type})`);

  if ((currentSpace.type === "property" || currentSpace.type === "railroad" || currentSpace.type === "utility") && !currentSpace.owner) {
    console.log(`${currentSpace.name} is available for purchase.`);
    setCurrentProperty(currentSpace);
    setPurchaseDialog(true); 
  } else if ((currentSpace.type === "property" || currentSpace.type === "railroad" || currentSpace.type === "utility") && currentSpace.owner !== currentPlayer) {
    const owner = currentSpace.owner;
    let rent = 0;
    if(currentSpace.type === "property"){
      rent = currentSpace.rent[0];
    }
    else if(currentSpace.type === "railroad"){
      rent = owner.railroadCount * 25;
    }
    else{
      console.log(`utility count ${owner.utilityCount}`)
      if(owner.utilityCount === 1){
        rent = steps * 4;
      }
      else{
        rent = steps * 10;
      }
    }
    console.log(`${currentPlayer.name} owes rent of ${rent} to ${owner.name}`);

    if (!currentPlayer.pay(rent)) {
      console.log(`${currentPlayer.name} doesn't have enough money to pay rent.`);
      alert(`Not enough money to pay rent! ${currentPlayer.name} lost`);
    } else {
      owner.get(rent);
      console.log(`${currentPlayer.name} paid ${rent} in rent to ${owner.name}`);
      alert(`${currentPlayer.name} paid ${rent} in rent to ${owner.name}`);
    }
    setSkipDialog(true);

  } else if (currentSpace.type === "chance") {
    const drawnCard = chance[Math.floor(Math.random() * chance.length)]; 
    console.log(`Chance card drawn: ${drawnCard.description}`);
    setChanceCard(drawnCard);
    setChanceDialog(true); 
    return;

  } else if (currentSpace.type === "go-to-jail") {
    console.log(`${currentPlayer.name} landed on Go to Jail. Moving to Jail...`);
    alert("Go to Jail");
    currentPlayer.inJail = true;
    currentPlayer.position = 10; 
    console.log(`${currentPlayer.name} is now in jail.`);
    setSkipDialog(true);
  } else if (currentSpace.type === "tax"){
    console.log(`${currentPlayer.name} landed on tax`);
    const cost = currentSpace.cost;
    setTaxDialog(true);
    if(!currentPlayer.pay(cost)){
      alert(`Not enough money to pay rent! ${currentPlayer.name} lost`);
    }
  } else {
    console.log(`${currentPlayer.name} ends their turn.`);
    setSkipDialog(true);
  }
};

export default rollDice;
