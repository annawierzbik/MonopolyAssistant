import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import board from "./board"; // Import the board
import './App.css';

const GameList = () => {
  const [games, setGames] = React.useState(
    JSON.parse(localStorage.getItem("monopolyGames")) || []
  );

  return (
    <div className="list">
      <h1 style={{ fontSize: 35 }} >Monopoly Asistant</h1>
      <ul style={{ display: "flex", }}>
        {games.map((game) => (
          <Link className="listA" to={`/game/${game.id}`}>
            <button key={game.id}>
              {game.name}
            </button>
          </Link>
        ))}
      </ul>
      <Link to={`/createGame`} style={{marginTop: 25}}>
        <button>
          Create New Game
        </button>
      </Link>
    </div>
  );
};

///onClick={createGame}

const CreateGame = () => {
  const [games, setGames] = React.useState(
    JSON.parse(localStorage.getItem("monopolyGames")) || []
  );
  const [gameName, setGameName] = React.useState("");
  const [playerName, setPlayerName] = React.useState("");
  const [players, setPlayers] = React.useState([]);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const addPlayer = () => {
    if (!playerName.trim()) {
      alert("Please enter a player name!");
      return;
    }

    setPlayers([
      ...players,
      { name: playerName, position: 0, money: 1500, properties: [] },
    ]);
    setPlayerName(""); // Clear player name input
  };

  const createGame = () => {
    if (!gameName.trim()) {
      alert("Please enter a game name!");
      return;
    }
    if (players.length === 0) {
      alert("Please add at least one player!");
      return;
    }

    const newGame = {
      id: Date.now(),
      name: gameName,
      players: players,
      active: false,
      turnIndex: 0,
    };

    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    localStorage.setItem("monopolyGames", JSON.stringify(updatedGames));

    // Navigate to the new game page after saving
    navigate(`/game/${newGame.id}`);

    // Clear inputs and players list
    setGameName("");
    setPlayers([]);
  };

  return (
    <div className="gameSetup">
      <h1>Create a New Game</h1>

      {/* Input for game name */}
      <input
        type="text"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        placeholder="Enter game name"
      />
      <br />

      {/* Input for player name */}
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter player name"
      />
      <button onClick={addPlayer}>Add Player</button>

      {/* Display added players */}
      <h2>Players:</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>

      {/* Button to create the game */}
      <button onClick={createGame}>Create Game</button>

      {/* Navigation to game list */}
      <Link to="/">
        <button>Go to Games</button>
      </Link>
    </div>
  );
};


const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Import useNavigate from react-router-dom
  const [game, setGame] = React.useState(() => {
    const games = JSON.parse(localStorage.getItem("monopolyGames")) || [];
    return games.find((g) => g.id === Number(id)) || null;
  });

  const rollDice = () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = game.players[game.turnIndex];
    const newPosition = (currentPlayer.position + diceRoll) % board.length;

    const tile = board[newPosition];
    console.log(`${currentPlayer.name} landed on ${tile.name}`);

    let updatedPlayer = { ...currentPlayer, position: newPosition };

    if (tile.type === "property" && !tile.owner) {
      const wantsToBuy = window.confirm(`${tile.name} is available for $${tile.price}. Buy it?`);
      if (wantsToBuy && updatedPlayer.money >= tile.price) {
        updatedPlayer.money -= tile.price;
        tile.owner = updatedPlayer.name;
        updatedPlayer.properties = [...updatedPlayer.properties, tile.name];
      }
    } else if (tile.type === "property" && tile.owner && tile.owner !== currentPlayer.name) {
      const owner = game.players.find((p) => p.name === tile.owner);
      const rent = tile.rent;
      updatedPlayer.money -= rent;
      owner.money += rent;
      alert(`${currentPlayer.name} paid $${rent} in rent to ${tile.owner}.`);
    } else if (tile.action === "collect_200") {
      updatedPlayer.money += 200;
    } else if (tile.action === "pay_tax") {
      updatedPlayer.money -= 100;
      alert(`${currentPlayer.name} paid $100 in taxes.`);
    } else if (tile.action === "chance" || tile.action === "community_chest") {
      alert(`Draw a ${tile.action.replace("_", " ")} card!`);
    }

    const updatedPlayers = game.players.map((p, i) =>
      i === game.turnIndex ? updatedPlayer : p
    );
    const updatedGame = {
      ...game,
      players: updatedPlayers,
      turnIndex: (game.turnIndex + 1) % game.players.length,
    };

    updateGame(updatedGame);
  };

  const updateGame = (updatedGame) => {
    const games = JSON.parse(localStorage.getItem("monopolyGames")) || [];
    const updatedGames = games.map((g) => (g.id === updatedGame.id ? updatedGame : g));
    localStorage.setItem("monopolyGames", JSON.stringify(updatedGames));
    setGame(updatedGame);
  };

  const deleteGame = () => {
    const games = JSON.parse(localStorage.getItem("monopolyGames")) || [];
    const updatedGames = games.filter((g) => g.id !== Number(id));
    localStorage.setItem("monopolyGames", JSON.stringify(updatedGames));
    alert(`Game "${game.name}" has been deleted.`);
    navigate("/"); // Redirect back to the main page
  };

  if (!game) {
    return <div className="text-center text-red-600">Game not found!</div>;
  }

  return (
    <div className="game">
      <h1>Game: {game.name}</h1>
      <button onClick={rollDice}>Roll Dice</button>
      <h2>Players</h2>
      <ul>
        {game.players.map((player, index) => (
          <li key={index}>
            <div>
              <span>{player.name}</span>
              <span>
                ${player.money} - Position: {player.position}
              </span>
            </div>
            {player.properties.length > 0 && (
              <div>
                Properties: {player.properties.join(", ")}
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={deleteGame} className="bg-red-500 text-white p-2 rounded">
        Delete Game
      </button>
      <Link to="/">
        <button>Exit Game</button>
      </Link>
    </div>
  );
};



const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/createGame" element={<CreateGame />} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default App;
