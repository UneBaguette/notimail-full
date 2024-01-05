import React from 'react';

export const Connexion = () => {
  return (
    <div>
      <nav>
        <img src="./imagefront/Nouveau-projet-1.png" alt="logo projet" />
      </nav>

      <div>
        <label htmlFor="entreprise">Entreprise :</label>
        <textarea id="entreprise" name="entreprise" rows="4" cols="50"></textarea>
        <img
          alt="flèche vers le bas"
        />
      </div>
    </div>
  );
};
