// Importez useState et useEffect si ce n'est pas déjà fait
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './accueilUser.css';
import Modal from 'react-modal';
 
export const AccueilUser = () => {
    const [user, setUser] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkUserConnection = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/auth/connecteduser`,
            {
              credentials: "include",
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error(
              "Erreur lors de la récupération des données de l'utilisateur"
            );
          }
        } catch (error) {
          console.error(
            "Erreur lors de la vérification de l'utilisateur:",
            error
          );
        } finally {
          setIsLoading(false);
        }
      };
  
      checkUserConnection();
    }, [navigate, setUser]);
  
    if (isLoading) {
      // Vous pouvez afficher un indicateur de chargement ici si nécessaire
      return <p>Chargement...</p>;
    }
  
    if (!user || !user.userConnected) {
      navigate("/");
      return null; // ou affichez un composant pour un utilisateur non connecté
    }

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
            <h3>Confirmer la Réceptiondu courrier :</h3>
            <p>Voulez-vous vraiment confirmer la réception de votre courrier ? Cette action est irréversible.</p>
            <div className="">
              <button onClick={handleCancel}><img className='croisrouge' src="/imagefront/def54c9845eaeb6c1436c961ee578878.png" alt="Anuler" /></button>
              <button onClick={handleCancel}><img className='boutonbleue' src="/imagefront/b26453a42cefa881913585877925b0fa.png" alt="Valider" /></button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
