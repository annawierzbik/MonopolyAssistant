// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Zaimportuj createRoot z react-dom/client
import './index.css';
import App from './App';

// Tworzymy root i renderujemy aplikację
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
