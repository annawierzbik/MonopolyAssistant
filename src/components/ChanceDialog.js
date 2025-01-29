import React from "react";

const ChanceDialog = ({ chanceCard, onClose }) => {
  if (!chanceCard) return null;

  return (
    <div className="dialog">
      <h2>Chance Card</h2>
      <p>{chanceCard.title}</p>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default ChanceDialog;