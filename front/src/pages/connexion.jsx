import React, { useState } from 'react';

export const Connexion = () => {
  const [entrepriseValue, setEntrepriseValue] = useState("Entreprise");

  const handleTextareaClick = () => {
    if (entrepriseValue === "Entreprise") {
      setEntrepriseValue("");
    }
  };

  return (
    <div>
      <nav>
        <img src="./imagefront/Nouveau-projet-1.png" alt="logo projet" />
      </nav>
      <div>
        <label htmlFor="entreprise">Entreprise :</label>
        <textarea
          id="entreprise"
          name="entreprise"
          rows="4"
          cols="50"
          value={entrepriseValue}
          onClick={handleTextareaClick}
          onChange={(e) => setEntrepriseValue(e.target.value)}
        ></textarea>
        <img
          src="front/imagefront/pngtree-vector-down-arrow-icon-png-image_4184901 1.png"
          alt="flèche vers le bas"
        />
      </div>
    </div>
  );
};
