import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './connexion.css';

export const Connexion = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [selectedEntreprise, setSelectedEntreprise] = useState('');
  const [entreprise, setEntreprise] = useState([]);
  const [error, setError] = useState('');

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

  const handleEntrepriseSelection = (e) => {
    const selectedEntreprise = e.target.value;
    setSelectedEntreprise(selectedEntreprise);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        const user = await response.json(); // Récupérer les informations de l'utilisateur depuis la réponse
        console.log('Authentification réussie', user);

        // Extrait les cookies de la réponse (si nécessaire)
        const cookies = response.headers.get('token');
        console.log(cookies);

        if (user.user.is_admin === true) {
          navigate('/accueilAdmin');
        } else {
          navigate('/accueilUser');
        }
      } else {
        console.error('Authentification échouée');
        setError('Identifiants incorrects');
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      setError("Erreur lors de l'authentification");
    }
  };

  return (
    <div className="container">
      <img src="/imagefront/Nouveauprojet1.png" alt="Description de l'image" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className='Entreprise'>
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
            src="/imagefront/pngtree-vector-down-arrow-icon-png-image_41849011.png"
            alt="description de l'image"
          />
        </label>
        <br />
        <label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <img 
              className='cadenas' 
              src="/imagefront/pngtree-black-padlock-png-image_37293241.png" 
              alt="description de l'image" /> 
        </label>
      </form>
    </div>
  );
};
