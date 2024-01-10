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
                        <div className="nohide">
                            <h3>{user.firm_name}</h3>
                            <p>Nom Contact</p>
                            {/* Formatage de la date */}
                            <div className="align_items">
                                <p>{new Date(user.last_received_mail).toLocaleDateString()}</p>
                                <img src="../../imagefront/888_edit.png" alt="edit"/>
                            </div>
                        </div>
                        <div className="hidedetail">  
                            <p>Email: {user.email}</p>
                            <p>Téléphone: {user.phone_number}</p>
                            <p>Indentifiant: {user.id}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}