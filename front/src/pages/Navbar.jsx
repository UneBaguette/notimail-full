import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router"
import './NavBar.css'

export const NavBar=()=>{
    const location = useLocation();
    const path = location.pathname;
    const [userName,setUserName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          const userData = await fetchUserData();
          if (userData) {
            setUserName(`${userData.first_name} ${userData.last_name}`);
          }
        };
    
        fetchData();
    }, []);

    const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:3000/user/currentUser', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${yourAuthToken}`, // Remplacez par votre mécanisme d'authentification
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const userData = await response.json();
            return userData;
          } else {
            console.error('Failed to fetch user data');
            return null;
          }
        } catch (error) {
          console.error('Error fetching user data', error);
          return null;
        }
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
            <img src="./imagefront/Nouveau-projet-1.png" alt="logo projet"/>
            <div id='button'>
                <span>{getNavbarText()}</span>
                <button><a href="/">Déconnexion</a></button>
            </div>  
        </nav>
    )
}