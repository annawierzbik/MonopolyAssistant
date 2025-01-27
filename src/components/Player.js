// Player.js
export default class Player {
    constructor(name, balance) {
      this.name = name;  // Imię gracza
      this.balance = balance;  // Saldo gracza
      this.position = 0;  // Pozycja gracza na planszy
      this.properties = [];  // Lista posiadanych nieruchomości
    }
  
    move(steps) {
      this.position = (this.position + steps) % 40; // Przesuwamy gracza na planszy
    }
  
    buyProperty(property) {
      if (this.balance >= property.cost) {
        this.balance -= property.cost;
        this.properties.push(property);
        property.owner = this;
        return true;
      }
      return false;
    }
  
    payRent(amount) {
      if (this.balance >= amount) {
        this.balance -= amount;
        return true;
      }
      return false;
    }
  }
  