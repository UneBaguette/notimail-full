import { NavBar } from './Navbar';
import { fetchAllUsers } from '../apiService';
import { useEffect, useState } from 'react';

export const AccueilAdmin=()=>{
    const [users, setUsers] = useState([]);

    // Effectue une requête GET pour récupérer la liste des catégories
    useEffect(() => {
        fetch(`http://localhost:3000/user/users`)
            .then(result => result.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            })
            .catch(Error => {
                console.log(Error);
            })
    }, [])

    return(
        <>
            <NavBar />
            <div>
                <h2>Liste des Utilisateurs</h2>  
                {users.map((user) => (
                    <div key={user.id}>
                        <p>{user.last_name}</p>
                        <p>{user.first_name}</p>
                        <p>{user.email}</p>
                        <p>{user.phone_number}</p>
                        {/* Ajoutez d'autres cellules en fonction de vos données utilisateur */}
                    </div>
                ))}
            </div>
        </>
    )
}