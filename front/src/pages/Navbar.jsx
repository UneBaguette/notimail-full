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