import React from 'react';

const PurchaseDialog = ({ property, onPurchase, onCancel }) => {
  return (
    <div className="purchase-dialog">
      <p>Do you want to buy {property.name} for ${property.cost}?</p>
      <button onClick={() => onPurchase(true)}>Yes</button>
      <button onClick={() => onCancel()}>No</button>
    </div>
  );
};

export default PurchaseDialog;
