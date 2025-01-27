// App.js
import React from 'react';
import Board from './components/Board';  // Zaimportuj komponent planszy
import './App.css'; // Zaimportuj główne style aplikacji

const App = () => {
  return (
    <div className="App">
      <h1>Monopoly</h1>
      <Board /> {/* Renderowanie komponentu Board */}
    </div>
  );
};

export default App;
