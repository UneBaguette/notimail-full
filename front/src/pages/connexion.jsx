// Connexion.js

import React, { useState, useEffect } from 'react';
// Importe le hook useNavigate de react-router-dom pour gérer la navigation
import { useNavigate } from "react-router-dom";

export const Connexion = () => {

  // Utilise le hook useNavigate pour gérer la navigation
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [selectedEntreprise, setSelectedEntreprise] = useState('');
  const [entreprise, setEntreprise] = useState([]);
  const [error, setError] = useState('');

  // Effectue une requête GET pour récupérer la liste des catégories
  useEffect(() => {
    fetch(`http://localhost:3000/user/users`)
        .then(result => result.json())
        .then(data => {
            console.log(data);
            setEntreprise(data);
        })
        .catch(Error => {
            console.log(Error);
        })
  }, [])

  
  // Fonction qui est appelé lorsque l'on choisi une entreprise
  const handleEntrepriseSelection = (e) => {
    // On définit que le selectedEntreprise est celui qui correspond au tableau cliqué
    const selectedEntreprise = e.target.value;
    
    // On met à jour le selectedEntreprise via le setter
    setSelectedEntreprise(selectedEntreprise);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Effectuer la requête POST vers le backend pour l'authentification
    try {
      const response = await fetch('http://localhost:3000/auth/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firm_name: selectedEntreprise,
          password: password,
        }),
      });

      if (response.ok) {
        // Authentification réussie
        // Rediriger l'utilisateur ou effectuer d'autres actions nécessaires
        console.log('Authentification réussie');
        // Navigue vers la HomePage
        navigate("/accueilUsers");
      } else {
        // Authentification échouée
        console.error('Authentification échouée');
        setError('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error);
      setError('Erreur lors de l\'authentification');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Entreprise:
          <select name="entreprise" value={selectedEntreprise} onChange={handleEntrepriseSelection}>
            <option value="">
              Sélectionnez une entreprise
            </option>
            {entreprise.map((entreprise) => (
              <option key={entreprise.id} value={entreprise.firm_name}>
                {entreprise.firm_name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Mot de Passe:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </label>
        <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};
