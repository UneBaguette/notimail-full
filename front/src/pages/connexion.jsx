import React, { useState, useEffect } from 'react';

export const Connexion = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
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
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }

      const data = await response.json();
      console.log('Réponse du serveur :', data);
      // Traitez la réponse du serveur en conséquence

    } catch (error) {
      console.error('Erreur :', error.message);
      // Gérez les erreurs ici
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/users');
        if (!response.ok) {
          throw new Error('Erreur lors de la requête');
        }

        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Erreur :', error.message);
        // Gérez les erreurs ici
      }
    };

    fetchUsers();
  }, []); // Le tableau vide signifie que cet effet ne s'exécutera qu'une fois après le rendu initial


  return (
    <form onSubmit={handleSubmit}>
      <select value={selectedUser} onChange={handleUserChange}>
          <option value="">Sélectionnez votre Entreprise</option>
          {users.map((user) => (
            <option key={user.id} value={user.email}>
              {user.firm_name}
            </option>
          ))}
      </select>
      <br />
      <label>
        Mot de passe:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <img
          src="front/imagefront/pngtree-vector-down-arrow-icon-png-image_4184901 1.png"
          alt="flèche vers le bas"
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};