import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router"
import { useNavigate } from 'react-router-dom';
import './NavBar.css'

export const NavBar=()=>{

    const navigate = useNavigate();

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

    const handleClick = () => {
        fetch ('http://localhost:3000/auth/deconnexion')
        navigate('/');
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
                <button onClick={handleClick}>Déconnexion</button>
            </div>  
        </nav>
    )
}