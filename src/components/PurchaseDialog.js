import React from 'react';

const PurchaseDialog = ({ property, onPurchase, onCancel }) => {
  return (
    <div className="dialog">
      <p>Do you want to buy {property.name} for ${property.cost}?</p>
      <button class="neon-button-small" onClick={() => onPurchase(true)}>Yes</button>
      <button class="neon-button-small" onClick={() => onCancel()}>No</button>
    </div>
  );
};

export default PurchaseDialog;
