const board = [
    {
        "name": "Go",
        "type": "go",
        "corner": true,
        "owner": null
    },
    {
        "name": "Mediterranean Avenue",
        "type": "property",
        "cost": 60,
        "color": "#955438",
        "rent": [2,10,30,90,160,250],
        "group": [1, 1, 2],
        "house": 50,
        "owner": null
    },
    {
        "name": "Community Chest",
        "type": "community-chest",
        "owner": null
    },
    {
        "name": "Baltic Avenue",
        "type": "property",
        "cost": 60,
        "color": "#955438",
        "rent": [4,20,60,180,320,450],
        "group": [1, 2, 2],
        "house": 50,
        "owner": null
    },
    {
        "name": "Income Tax",
        "type": "tax",
        "cost": 200,
        "owner": null
    },
    {
        "name": "Reading Railroad",
        "type": "railroad",
        "cost": 200,
        "group": [9, 1, 4],
        "owner": null
    },
    {
        "name": "Oriental Avenue",
        "type": "property",
        "cost": 100,
        "color": "#aae0fa",
        "rent": [6,30,90,270,400,550],
        "group": [2, 1, 3],
        "house": 50,
        "owner": null
    },
    {
        "name": "Chance",
        "type": "chance",
        "owner": null
    },
    {
        "name": "Vermont Avenue",
        "type": "property",
        "cost": 100,
        "color": "#aae0fa",
        "rent": [6,30,90,270,400,550],
        "group": [2, 2, 3],
        "house": 50,
        "owner": null
    },
    {
        "name": "Connecticut Avenue",
        "type": "property",
        "cost": 120,
        "color": "#aae0fa",
        "rent": [8,40,100,300,450,600],
        "group": [2, 3, 3],
        "house": 50,
        "owner": null
    },
    {
        "name": "Jail",
        "type": "jail",
        "corner": true,
        "owner": null
    },
    {
        "name": "St. Charles Place",
        "type": "property",
        "cost": 140,
        "color": "#d93a96",
        "rent": [10,50,150,450,625,750],
        "group": [3, 1, 3],
        "house": 100,
        "owner": null
    },
    {
        "name": "Electric Company",
        "type": "utility",
        "cost": 150,
        "group": [10, 1, 2],
        "owner": null
    },
    {
        "name": "States Avenue",
        "type": "property",
        "cost": 140,
        "color": "#d93a96",
        "rent": [10,50,150,450,625,750],
        "group": [3, 2, 3],
        "house": 100,
        "owner": null
    },
    {
        "name": "Virginia Avenue",
        "type": "property",
        "cost": 160,
        "color": "#d93a96",
        "rent": [12,60,180,500,700,900],
        "group": [3, 3, 3],
        "house": 100,
        "owner": null
    },
    {
        "name": "Pennsylvania Railroad",
        "type": "railroad",
        "cost": 200,
        "group": [9, 2, 4],
        "owner": null
    },
    {
        "name": "St. James Place",
        "type": "property",
        "cost": 180,
        "color": "#f7941d",
        "rent": [14,70,200,550,750,950],
        "group": [4, 1, 3],
        "house": 100,
        "owner": null
    },
    {
        "name": "Community Chest",
        "type": "community-chest",
        "owner": null
    },
    {
        "name": "Tennessee Avenue",
        "type": "property",
        "cost": 180,
        "color": "#f7941d",
        "rent": [14,70,200,550,750,950],
        "group": [4, 2, 3],
        "house": 100,
        "owner": null
    },
    {
        "name": "New York Avenue",
        "type": "property",
        "cost": 200,
        "color": "#f7941d",
        "rent": [16,80,220,600,800,1000],
        "group": [4, 3, 3],
        "house": 100,
        "owner": null
    },
    {
        "name": "Free Parking",
        "type": "free-parking",
        "corner": true,
        "owner": null
    },
    {
        "name": "Kentucky Avenue",
        "type": "property",
        "cost": 220,
        "color": "#ed1b24",
        "rent": [18,90,250,700,875,1050],
        "group": [5, 1, 3],
        "house": 150,
        "owner": null
    },
    {
        "name": "Chance",
        "type": "chance",
        "owner": null
    },
    {
        "name": "Indiana Avenue",
        "type": "property",
        "cost": 220,
        "color": "#ed1b24",
        "rent": [18,90,250,700,875,1050],
        "group": [5, 2, 3],
        "house": 150,
        "owner": null
    },
    {
        "name": "Illinois Avenue",
        "type": "property",
        "cost": 240,
        "color": "#ed1b24",
        "rent": [20,100,300,750,925,1100],
        "group": [5, 3, 3],
        "house": 150,
        "owner": null
    },
    {
        "name": "B. & O. Railroad",
        "type": "railroad",
        "cost": 200,
        "group": [9, 3, 4],
        "owner": null
    },
    {
        "name": "Atlantic Avenue",
        "type": "property",
        "cost": 260,
        "color": "#fef200",
        "rent": [22,110,330,800,975,1150],
        "group": [6, 1, 3],
        "house": 150,
        "owner": null
    },
    {
        "name": "Ventura Avenue",
        "type": "property",
        "cost": 260,
        "color": "#fef200",
        "rent": [22,110,330,800,975,1150],
        "group": [6, 2, 3],
        "house": 150,
        "owner": null
    },
    {
        "name": "Water Works",
        "type": "utility",
        "cost": 150,
        "group": [10, 2, 2],
        "owner": null
    },
    {
        "name": "Marvin Gardens",
        "type": "property",
        "cost": 280,
        "color": "#fef200",
        "rent": [24,120,360,850,1025,1200],
        "group": [6, 3, 3],
        "house": 150,
        "owner": null
    },
    {
        "name": "Go To Jail",
        "type": "go-to-jail",
        "corner": true,
        "owner": null
    },
    {
        "name": "Pacific Avenue",
        "type": "property",
        "cost": 300,
        "color": "#1fb25a",
        "rent": [26,130,390,900,1100,1275],
        "group": [7, 1, 3],
        "house": 200,
        "owner": null
    },
    {
        "name": "North Carolina Avenue",
        "type": "property",
        "cost": 300,
        "color": "#1fb25a",
        "rent": [26,130,390,900,1100,1275],
        "group": [7, 2, 3],
        "house": 200,
        "owner": null
    },
    {
        "name": "Community Chest",
        "type": "community-chest",
        "owner": null
    },
    {
        "name": "Pennsylvania Avenue",
        "type": "property",
        "cost": 320,
        "color": "#1fb25a",
        "rent": [28,150,450,1000,1200,1400],
        "group": [7, 3, 3],
        "house": 200,
        "owner": null
    },
    {
        "name": "Shortline",
        "type": "railroad",
        "cost": 200,
        "group": [9, 4, 4],
        "owner": null
    },
    {
        "name": "Chance",
        "type": "chance",
        "owner": null
    },
    {
        "name": "Park Place",
        "type": "property",
        "cost": 350,
        "color": "#0072bb",
        "rent": [35,175,500,1100,1300,1500],
        "group": [8, 1, 2],
        "house": 200,
        "owner": null
    },
    {
        "name": "Luxury Tax",
        "type": "tax",
        "cost": 100,
        "owner": null
    },
    {
        "name": "Boardwalk",
        "type": "property",
        "cost": 400,
        "color": "#0072bb",
        "rent": [50,200,600,1400,1700,2000],
        "group": [8, 2, 2],
        "house": 200,
        "owner": null
    }
  ];
  
  export default board;
  