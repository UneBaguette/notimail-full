// Importez useState et useEffect si ce n'est pas déjà fait
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './accueilUser.css';
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
  }, [setShowModal, showModal]);

  // Au clic sur le bouton confirmer, on POST la récup du mail, et on ferme la modal
  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:3000/mail/picked-up-mail/${user?.userConnected?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({}),
      });

      if (response.ok) {
        console.log('Récupération Confirmée');
        setShowModal(false);
      } else {
        console.error('Récupération échouée');
      }
    } catch (error) {
      console.error('Erreur lors de la réception:', error);
      setError('Erreur lors de la reception');
    }
  };

  // Au clic sur le bouton annulé du Modal confirmation, on repasse le Modal en invisible
  const handleCancel = () => {
    setShowModal(false);
  };

  // Au clic sur le bouton Réceptionné on ouvre le Modal pour confirmer
  const handleSubmit = () => {
    setShowModal(true);
  };

  return (
    <>
      {user?.userConnected && user?.userConnected?.has_mail !== true ? (
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
              <img className='croisrouge' src="/imagefront/def54c9845eaeb6c1436c961ee578878.png" onClick={handleCancel} alt="Anuler" />
              <img className='boutonbleue' src="/imagefront/b26453a42cefa881913585877925b0fa.png" onClick={handleConfirm} alt="Valider" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
