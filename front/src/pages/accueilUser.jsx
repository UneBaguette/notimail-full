import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './acceilUser.css';
import { useParams } from "react-router-dom"
export const AccueilUser = () => {
  
  const { userId } = useParams()
console.log(userId)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:3000/mail/picked-up-mail/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
            }),
          });
    
          if (response.ok) {
    
          } else {
            console.error('Récupération échouée');
          }
        } catch (error) {
          console.error("Erreur lors de la réception:", error);
          setError("Erreur lors de la reception");
        }
      };
    return (
        <>
            <div className='conteneur'>
                {/* Image enveloppe */}
                <img src="/imagefront/44849e8b90ebf9de43ed123e14a739b0.png" alt="enveloppe" />
                <span className='petit-cercle' />
                <div className='texte'>
                <h3>Vous avez du courrier en attente</h3>
                </div>

                <div className='textes'>
                  <button onSubmit={handleSubmit}>Réceptionner</button>  
                </div>
            </div>
        </>
    )
}