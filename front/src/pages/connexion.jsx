export const connexion=()=>{
    
}

import React, { useState } from 'react';

const App = (connexion) => {
  // State pour stocker les informations du formulaire
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Fonction pour gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoute ici la logique de connexion avec les données du formulaire (formData)
    console.log('Formulaire soumis avec :', formData);
  };

  return (
    <div>
      <h2>Page de Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default App;
