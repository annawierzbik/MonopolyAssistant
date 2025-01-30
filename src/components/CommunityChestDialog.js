import React from "react";

const CommunityChestDialog = ({ chanceCard, onClose }) => {
  if (!chanceCard) return null;

  return (
    <div className="dialog">
      <h2>Community Chest Card</h2>
      <p>{chanceCard.title}</p>
      <button class="neon-button-small" onClick={onClose}>OK</button>
    </div>
  );
};

export default CommunityChestDialog;