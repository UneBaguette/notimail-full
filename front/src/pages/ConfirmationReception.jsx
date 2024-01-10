// ConfirmationReception.js
import React from 'react';
import './acceilUser.css'; // Assurez-vous d'importer le fichier CSS pour les styles

export const ConfirmationReception = ({ closeModal }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h1>Confirmer la réception du courrier</h1>
        {/* Ajoutez d'autres éléments ou messages si nécessaire */}
        <button onClick={closeModal}>Fermer</button>
      </div>
    </div>
  );
};
