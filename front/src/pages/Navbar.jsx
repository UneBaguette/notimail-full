import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router"
import { useNavigate } from 'react-router-dom';
import './NavBar.css'

export const NavBar=()=>{

    const navigate = useNavigate();

    const { pathname }  = useLocation();

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

    return(
        <>        
            {pathname === '/' ? null : (
                <nav>
                    <div id="left-content">
                        <img src="/imagefront/Nouveauprojet1.png" alt="logo projet"/>
                    </div>

                    <div id='right-content'>
                        {pathname === '/accueilAdmin'? <span>Admin</span>: <spam>Entreprise***</spam>}
                        <button onClick={handleClick}>Déconnexion</button>
                    </div>  
            </nav>
            )}
        </>
    )
}