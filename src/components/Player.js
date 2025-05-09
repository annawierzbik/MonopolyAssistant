export default class Player {
    constructor(name, balance, number) {
      this.name = name;  
      this.balance = balance;  
      this.position = 0;  
      this.properties = [];  
      this.inJail = false;
      this.hasJailCard = false;
      this.railroadCount = 0;
      this.utilityCount = 0;
      this.number = number;
    }
  
    move(steps) {
      this.position = (this.position + steps) % 40; 
    }
  
    buyProperty(property) {
      if (this.balance >= property.cost) {
        this.balance -= property.cost;
        this.properties.push(property);
        if(property.type === "railroad"){
          this.railroadCount += 1;
        }
        else if (property.type === "utility"){
          this.utilityCount += 1;
        }
        property.owner = this;
        return true;
      }
      return false;
    }
  
    pay(amount) {
      if (this.balance >= amount) {
        this.balance -= amount;
        return true;
      }
      return false;
    }

    get(amount){
      this.banace += amount;
    }

    sendToJail(){
        this.position = 10;
        this.inJail = true;
    }
  }
  