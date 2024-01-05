import { NavBar } from './Navbar';
import { fetchAllUsers } from '../apiService';
import { useEffect, useState } from 'react';

export const AccueilAdmin=()=>{
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        const fetchData = async () => {
            const token = 'votre_token_d_authentification'; // Remplacez par votre mécanisme d'authentification
            const usersData = await fetchAllUsers(token);
            if (usersData) {
                setUsers(usersData);
            }
        };

        fetchData();
    },[]);

    return(
        <>
            <NavBar />
            <div>
                <h2>Liste des Utilisateurs</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            {/* Ajoutez d'autres colonnes en fonction de vos données utilisateur */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.last_name}</td>
                                <td>{user.first_name}</td>
                                {/* Ajoutez d'autres cellules en fonction de vos données utilisateur */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}