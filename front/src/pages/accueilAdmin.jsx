import { useEffect, useState } from 'react';
import './accueilAdmin.css';
import { FaPlus } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";
import { SearchUser } from './searchUser';

export const AccueilAdmin=()=>{
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserSelect, setSelectedUserSelect] = useState(null);

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
    
    const handleUserClick = (user, event) => {
        console.log('handleUserClick called');
        console.log('Event target classes:', event.target.classList);
    
        if (event.target.classList.contains('nohide')) {
            console.log('Clicked on .nohide element');
            setSelectedUser((prevSelectedUser) => {
                return prevSelectedUser === user.id ? null : user.id;
            });
        }
    
        // Ajoute ou retire la classe .show de l'élément .hidedetail
        const hidedetailElement = event.target.nextSibling;
        console.log('Hidedetail element:', hidedetailElement);
        if (hidedetailElement && hidedetailElement.classList.contains('hidedetail')) {
            hidedetailElement.classList.toggle('show');
        }
    };    

    const handleUserClickSelect = (user) => {
        setSelectedUserSelect((prevSelectedUserSelect) => {
            return prevSelectedUserSelect === user.id ? null : user.id;
        });
    };

    return(
        <div className="content-container">
            <h2>Liste des Utilisateurs</h2>
            {/* <SearchUser /> */}
            <section className="contact">
                {users.map((user) => (
                    <div key={user.id}>
                        <div className="align_items">
                            <h3
                                className={`nohide ${selectedUser === user.id ? 'show' : ''}`}
                                onClick={(event) => handleUserClick(user, event)}
                            >
                                {user.firm_name}
                            </h3>
                            <div 
                                className={`slideOne ${selectedUserSelect === user.id ? 'slideOneChecked' : ''} ${selectedUserSelect ? 'selected' : ''}`} 
                                onClick={() => handleUserClickSelect(user)}
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
                        <section className={`hidedetail ${selectedUser === user.id ? 'show' : ''}`}>
                            <p>Email: {user.email}</p>
                            <p>Téléphone: {user.phone_number}</p>
                            <p>Indentifiant: {user.id}</p>
                        </section>
                    </div>
                ))}
            </section>
            <section class="ajoutUser">
                <a href="/ajoutEntreprise" className="blue-background">
                    <FaPlus />
                </a>
                <a href="#" className="blue-background">
                    <RiMailSendLine />
                </a>
            </section>
        </div>
    )
}