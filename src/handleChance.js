const handleChance = (chanceCard, players, currentPlayerIndex, setPlayers, setChanceDialog, setChanceCard, setIsDiceDisabled, board) => {
    if (!chanceCard) return;
  
    const currentPlayer = players[currentPlayerIndex];
  
    switch (chanceCard.action) {
      case "move":
        if (chanceCard.count) {
          // Move player by specific count (e.g., "Go Back 3 Spaces")
          currentPlayer.position = Math.max(0, currentPlayer.position + chanceCard.count);
        } else {
          // Move player to specific tile (e.g., "Advance to Boardwalk")
          if (chanceCard.tileid < currentPlayer.position) {
            currentPlayer.balance += 200; // Collect $200 if passing Go
            alert(`${currentPlayer.name} moved to ${board[chanceCard.tileid].name} and collected $200!`);
          } else {
            alert(`${currentPlayer.name} moved to ${board[chanceCard.tileid].name}.`);
          }
          currentPlayer.position = chanceCard.tileid;
        }
        break;
  
      case "movenearest":
        // Move to the nearest Utility or Railroad
        const nearestTile = board.find(tile => tile.group === chanceCard.groupid);
        if (nearestTile) {
          currentPlayer.position = nearestTile.id;
          alert(`${currentPlayer.name} moved to the nearest ${nearestTile.name}.`);
          // Rent logic if owned
          if (nearestTile.owner && nearestTile.owner !== currentPlayer) {
            const rent = (chanceCard.rentmultiplier || 1) * 10;
            currentPlayer.balance -= rent;
            nearestTile.owner.balance += rent;
            alert(`${currentPlayer.name} paid ${rent} to ${nearestTile.owner.name} for landing on their ${nearestTile.name}.`);
          }
        }
        break;
  
      case "addfunds":
        // Add money (e.g., "Bank pays you dividend of $50")
        currentPlayer.balance += chanceCard.amount;
        alert(`${currentPlayer.name} received $${chanceCard.amount} from a Chance card!`);
        break;
  
      case "removefunds":
        // Deduct money (e.g., "Pay poor tax of $15")
        currentPlayer.balance -= chanceCard.amount;
        alert(`${currentPlayer.name} lost $${chanceCard.amount} due to a Chance card!`);
        break;
  
      case "removefundstoplayers":
        // Pay each player (e.g., "Chairman of the Board - Pay each player $50")
        players.forEach(player => {
          if (player !== currentPlayer) {
            currentPlayer.balance -= chanceCard.amount;
            player.balance += chanceCard.amount;
          }
        });
        alert(`${currentPlayer.name} paid $${chanceCard.amount} to each player.`);
        break;

      case "addfundsfromplayers":
        // Get paid from each player (e.g., "Grand Opera Night - Collect $50 from every player for opening night seats",)
        players.forEach(player => {
          if (player !== currentPlayer) {
            currentPlayer.balance += chanceCard.amount;
            player.balance -= chanceCard.amount;
          }
        });
        alert(`${currentPlayer.name} got $${chanceCard.amount} from each player.`);
        break;
  
      case "propertycharges":
        // Pay for houses and hotels
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
  
    setPlayers([...players]); // Update players
    setChanceDialog(false);
    setChanceCard(null);
    setIsDiceDisabled(false); // Unlock the dice for the next player
  };
  
  export default handleChance;