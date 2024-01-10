// Importez useState et useEffect si ce n'est pas déjà fait
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './acceilUser.css';
import Modal from 'react-modal';


export const AccueilUser = () => {
  const [user, setUser] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  // Au clic sur le bouton confirmer, on passe le modal en visible (true)
  const handleConfirm = async (e) => {
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

// Au clic sur le bouton cancel du pop-up confirmation, on repasse le pop-up en invisible
const handleCancel = () => {
    setShowModal(false);
};

  const handleSubmit = async (e) => {
    setShowModal(true);
   
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
      )}

      {/* Modal pour la confirmation */}
      <Modal isOpen={showModal}>
        <div className='modal-overlay'>
          <div className='modal'>
            <h3>Confirmer la Réception</h3>
            <p>Voulez-vous vraiment confirmer la réception de votre courrier ? Cette action est irréversible.</p>
            <div className="">
              <button onClick={handleCancel}>Annuler</button>
              <button onClick={handleConfirm}>Valider</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
