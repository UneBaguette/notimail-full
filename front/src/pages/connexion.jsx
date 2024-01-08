import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Définit un composant fonctionnel Connexion
export const Connexion = () => {
  const navigate = useNavigate();

  // Utilise le hook useState pour gérer l'état du mot de passe, de l'entreprise, de la liste des entreprises, et des erreurs
  const [password, setPassword] = useState('');
  const [selectedEntreprise, setSelectedEntreprise] = useState('');
  const [entreprise, setEntreprise] = useState([]);
  const [error, setError] = useState('');

  // Effectue une requête GET pour récupérer la liste des entreprises depuis le backend
  useEffect(() => {
    fetch(`http://localhost:3000/user/users`)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setEntreprise(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fonction appelée lorsque l'utilisateur choisit une entreprise dans le formulaire
  const handleEntrepriseSelection = (e) => {
    const selectedEntreprise = e.target.value;
    setSelectedEntreprise(selectedEntreprise);
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Effectue une requête POST pour l'authentification vers le backend
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
        console.log('Authentification réussie');
        // Redirige l'utilisateur vers la page d'accueil des utilisateurs
        navigate('/accueilUsers');
      } else {
        // Authentification échouée
        console.error('Authentification échouée');
        setError('Identifiants incorrects');
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      setError("Erreur lors de l'authentification");
    }
  };

  // Rendu du composant
  return (
    <div>
      <h2>Connexion</h2>
      <img src="/imagefront/Nouveauprojet1.png" alt="Description de l'image" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Entreprise:
          <select name="entreprise" value={selectedEntreprise} onChange={handleEntrepriseSelection}>
            <option value="">Sélectionnez une entreprise</option>
            {entreprise.map((entreprise) => (
              <option key={entreprise.id} value={entreprise.firm_name}>
                {entreprise.firm_name}
              </option>
            ))}
          </select>
          <img
            className="image-container"
            src="front/imagefront/pngtree-vector-down-arrow-icon-png-image_4184901 1.png"
            alt="description de l'image"
          />
        </label>
        <br />
        <label>
          Mot de Passe:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <img src="/imagefront/pngtree-black-padlock-png-image_3729324 (1) 1.png" alt="description de l'image" />
        </label>
        <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};
