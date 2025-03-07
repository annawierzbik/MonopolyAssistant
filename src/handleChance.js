const handleChance = (chanceCard, players, currentPlayerIndex, setPlayers, setChanceDialog, setChanceCard, setIsDiceDisabled, board) => {
    if (!chanceCard) return;
  
    const currentPlayer = players[currentPlayerIndex];
  
    switch (chanceCard.action) {
      case "move":
        if (chanceCard.count) {
          currentPlayer.position = Math.max(0, currentPlayer.position + chanceCard.count);
        } else {
          if (chanceCard.tileid < currentPlayer.position) {
            currentPlayer.balance += 200; 
            alert(`${currentPlayer.name} moved to ${board[chanceCard.tileid].name} and collected $200!`);
          } else {
            alert(`${currentPlayer.name} moved to ${board[chanceCard.tileid].name}.`);
          }
          currentPlayer.position = chanceCard.tileid;
        }
        break;
  
      case "movenearest":
        const nearestTile = board.find(tile => tile.group === chanceCard.groupid);
        if (nearestTile) {
          currentPlayer.position = nearestTile.id;
          alert(`${currentPlayer.name} moved to the nearest ${nearestTile.name}.`);
          if (nearestTile.owner && nearestTile.owner !== currentPlayer) {
            const rent = (chanceCard.rentmultiplier || 1) * 10;
            currentPlayer.balance -= rent;
            nearestTile.owner.balance += rent;
            alert(`${currentPlayer.name} paid ${rent} to ${nearestTile.owner.name} for landing on their ${nearestTile.name}.`);
          }
        }
        break;
  
      case "addfunds":
        currentPlayer.balance += chanceCard.amount;
        alert(`${currentPlayer.name} received $${chanceCard.amount} from a Chance card!`);
        break;
  
      case "removefunds":
        currentPlayer.balance -= chanceCard.amount;
        alert(`${currentPlayer.name} lost $${chanceCard.amount} due to a Chance card!`);
        break;
  
      case "removefundstoplayers":
        players.forEach(player => {
          if (player !== currentPlayer) {
            currentPlayer.balance -= chanceCard.amount;
            player.balance += chanceCard.amount;
          }
        });
        alert(`${currentPlayer.name} paid $${chanceCard.amount} to each player.`);
        break;
  
      case "propertycharges":
        const houseCount = currentPlayer.properties.reduce((total, prop) => total + (prop.houses || 0), 0);
        const hotelCount = currentPlayer.properties.reduce((total, prop) => total + (prop.hotels || 0), 0);
        const totalCharge = houseCount * chanceCard.buildings + hotelCount * chanceCard.hotels;
        currentPlayer.balance -= totalCharge;
        alert(`${currentPlayer.name} paid $${totalCharge} for property repairs.`);
        break;
  
    
      case "jail":
        if (chanceCard.subaction === "goto") {
          currentPlayer.sendToJail();
          alert(`${currentPlayer.name} is sent to Jail!`);
        } else if (chanceCard.subaction === "getout") {
          currentPlayer.hasJailCard = true;
          console.log("Jail card ")
          alert(`${currentPlayer.name} received a Get Out of Jail Free card!`);
        }
        break;
        
      default:
        alert("Unknown Chance Card action.");
    }
  
    setPlayers([...players]); 
    setChanceDialog(false);
    setChanceCard(null);
    setIsDiceDisabled(false); 
  };
  
  export default handleChance;