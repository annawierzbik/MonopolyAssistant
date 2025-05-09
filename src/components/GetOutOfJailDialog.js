import React from 'react';

const GetOutOfJailDialog = ({ onUseCard, onStay }) => {
  return (
    <div className="dialog">
      <h2>You are in jail!</h2>
      <p>How would you like to get out?</p>

      <div className="neon-button-small">
        <button onClick={onUseCard}>Use Get-Out-Of-Jail Card</button>
        <button onClick={onStay}>Stay in Jail</button>
      </div>
    </div>
  );
};

export default GetOutOfJailDialog;
