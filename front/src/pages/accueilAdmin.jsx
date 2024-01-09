import { useEffect, useState } from 'react';
import './accueilAdmin.css';

export const AccueilAdmin=()=>{
    const [users, setUsers] = useState([]);

    // Effectue une requête GET pour récupérer la liste des catégories
    useEffect(() => {
        fetch(`http://localhost:3000/user/users`)
            .then(result => result.json())
            .then(data => {
                console.log(data);
                const filteredUsers = data.filter(user => user.username !== 'admin');
                setUsers(filteredUsers);
            })
            .catch(Error => {
                console.log(Error);
            })
    }, [])

    return(
        <div className="content-container">
            <h2>Liste des Utilisateurs</h2>
            <div className="contact">
                {users.map((user) => (
                    <div key={user.id}>
                        <p>{user.last_name}</p>
                        <p>{user.first_name}</p>
                        <p>{user.email}</p>
                        <p>{user.phone_number}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}