import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router"
import { useNavigate } from 'react-router-dom';
import './NavBar.css'

export const NavBar=({ userData })=>{

    const navigate = useNavigate();

    const location = useLocation();
    const path = location.pathname;

    const handleClick = () => {
        fetch('http://localhost:3000/auth/deconnexion', {
            credentials: 'include', // Inclure les cookies dans la requête
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Déconnexion échouée - ${response.status}`);
            }
    
            navigate('/');
        })
        .catch(error => {
            console.error('Erreur lors de la déconnexion :', error.message);
            // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
        });
    };    
    
    // Fonction pour obtenir le texte en fonction de l'URL
    const getNavbarText = () => {
        if (path.endsWith('/accueilAdmin')) {
            return 'Admin';
        } else if (path.endsWith('/accueilUser')) {
            return 'Entreprise***';
        }
        // Si l'URL ne se termine par aucune des valeurs attendues, retournez une chaîne vide ou un texte par défaut
        return '';
    };

    return(
        <nav>
            <div id="left-content">
                <img src="/imagefront/Nouveauprojet1.png" alt="logo projet"/>
            </div>

            <div id='right-content'>
                <span>{getNavbarText()}</span>
                {/* <button onClick={handleClick}>Déconnexion</button> */}
                {userData && <button onClick={handleClick}>Déconnexion</button>}
            </div>  
        </nav>
    )
}