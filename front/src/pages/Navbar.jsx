import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router"
import { useNavigate } from 'react-router-dom';
import './NavBar.css'

export const NavBar=()=>{

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const { pathname }  = useLocation();

    // Effectue une requête GET pour récupérer les infos sur l'utilisateur connecté
    useEffect(() => {
        fetch(`http://localhost:3000/auth/connecteduser`, {
            credentials: 'include', // Inclure les cookies
        })
            .then(result => result.json())
            .then(data => {
                console.log(data);;
                setUsers(data);
            })
            .catch(Error => {
                console.log(Error);
            })
    }, [])

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
                        {pathname === `/accueilUser`? (<span>Entreprise {users.firm_name}</span>):(<span>Admin</span>)}
                        <button onClick={handleClick}>Déconnexion</button>
                    </div>  
            </nav>
            )}
        </>
    )
}