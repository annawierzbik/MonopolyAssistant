// handlePurchase.js

const handlePurchase = (purchase, players, currentPlayerIndex, currentProperty, setPlayers, setPurchaseDialog, setCurrentProperty) => {
    const currentPlayer = players[currentPlayerIndex];
    const property = currentProperty;
  
    if (purchase && property) {
      // Gracz próbuje kupić nieruchomość
      if (currentPlayer.buyProperty(property)) {
        alert(`${currentPlayer.name} bought ${property.name} for $${property.cost}`);
      } else {
        alert("You don't have enough money to buy this property!");
      }
    }
  
    // Zamykamy dialog po zakupie
    setPurchaseDialog(false);
    setCurrentProperty(null);
  };
  
  export default handlePurchase;
  