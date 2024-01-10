import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './acceilUser.css';

export const AccueilUser = () => {

  const [user, setUser] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/auth/connecteduser`, {
      credentials: 'include',
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/mail/picked-up-mail/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({}),
      });

      if (response.ok) {
        console.log('Récupération Confirmée');
        window.location.reload();
      } else {
        console.error('Récupération échouée');
      }
    } catch (error) {
      console.error('Erreur lors de la réception:', error);
      setError('Erreur lors de la reception');
    }
  };

  return (
    <>
      {user.decodedToken && user.decodedToken.has_mail !== true ? (

        <div className='conteneur'>
          {/* Image enveloppe */}

          <img src='/imagefront/44849e8b90ebf9de43ed123e14a739b0.png' alt='enveloppe' />

          <div className='texte'>
            <h3>Vous n'avez pas de courrier en attente</h3>
          </div>

        </div>
      ) : (
        
        <div className='conteneur'>

          {/* Image enveloppe */}          
          <img src='/imagefront/44849e8b90ebf9de43ed123e14a739b0.png' alt='enveloppe' />
          
          <span className='petit-cercle' />
          
          <div className='texte'>
            <h3>Vous avez du courrier en attente</h3>
          </div>
          
          <button className='bouton-bleu' onClick={handleSubmit}>
            Réceptionner
          </button>
          
        </div>
      ) }
    </>
  );
};
