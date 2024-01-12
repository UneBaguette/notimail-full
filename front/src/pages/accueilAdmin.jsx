import { useEffect, useState } from 'react';
import './accueilAdmin.css';

export const AccueilAdmin=()=>{
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Effectue une requête GET pour récupérer la liste des catégories
    useEffect(() => {
        fetch(`http://localhost:3000/user/users`,{credentials:'include'})
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

    const handleUserClick = (user) => {
        setSelectedUser((prevSelectedUser) => {
            return prevSelectedUser === user.id ? null : user.id;
        });
    };

    return(
        <div className="content-container">
            <h2>Liste des Utilisateurs</h2>
            <section className="contact">
                {users.map((user) => (
                    <div key={user.id}>
                        <section className="nohide">
                            <div className="align_items">
                                <h3>{user.firm_name}</h3>
                                <div 
                                    className={`slideOne ${selectedUser === user.id ? 'slideOneChecked' : ''} ${selectedUser ? 'selected' : ''}`} 
                                    onClick={() => handleUserClick(user)}
                                >
                                    <input type="checkbox" value="None" id={`slideOne_${user.id}`} name="check" checked />
                                    <label htmlFor={`slideOne_${user.id}`}></label>
                                </div>
                            </div>
                            <div className="align_items">
                                <div className="colomun_items">
                                    <p>Nom Contact</p>
                                    {/* Formatage de la date */}
                                    <p>{new Date(user.last_received_mail).toLocaleDateString()}</p>
                                </div>    
                                <img src="../../imagefront/888_edit.png" alt="edit"/>
                            </div>
                        </section>
                        <section className={`hidedetail ${selectedUser ? 'show' : ''}`}>  
                            <p>Email: {user.email}</p>
                            <p>Téléphone: {user.phone_number}</p>
                            <p>Indentifiant: {user.id}</p>
                        </section>
                    </div>
                ))}
            </section>
        </div>
    )
}