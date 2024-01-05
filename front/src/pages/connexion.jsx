import React from 'react';

export const Connexion = () => {
  return (
    <div>
      <nav>
        <img src="./imagefront/Nouveau-projet-1.png" alt="logo projet" />
      </nav>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="entreprise">Entreprise :</label>
        <textarea
          id="entreprise"
          name="entreprise"
          rows="4"
          cols="50"
          defaultValue="Entreprise"
        ></textarea>
        <img
          src="./imagefront/fleche-bas.png"
          alt="flèche vers le bas"
          style={{ marginLeft: '10px', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};
