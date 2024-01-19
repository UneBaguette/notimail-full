import { useEffect, useState } from 'react';
import './accueilAdmin.css';
import { IoAddCircleOutline } from "react-icons/io5";
import { BiMailSend } from "react-icons/bi";
import { SearchUser } from './searchUser';
import Modal from 'react-modal';

export const AccueilAdmin=()=>{
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [detailUser, setDetailUser] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [entrepriseData, setEntrepriseData] = useState(null);

    // Effectue une requête GET pour récupérer la liste des catégories
    useEffect(() => {
        fetch(`http://localhost:3000/user/users`,{credentials:'include'})
            .then(result => result.json())
            .then(data => {
                console.log(data);
                const filteredUsers = data.filter(user => user.username !== 'Entrepise admin');
                setUsers(filteredUsers);
            })
            .catch(Error => {
                console.log(Error);
            })
    }, [])
    
    const handleUserClick = (user, event) => {
        console.log('handleUserClick called');
        console.log('Event target classes:', event.target.classList);

        // Si la balise cliquée est .nohide
        if (event.target.classList.contains('nohide')) {
            console.log('Clicked on .nohide element');

            // Si detailUser est déjà égal à l'ID de l'utilisateur, masquer les détails
            if (detailUser === user.id) {
                setDetailUser(null);
            } else {
                // Sinon, afficher les détails en mettant à jour avec l'ID de l'utilisateur
                setDetailUser(user.id);
            }
        }
    
        // Récupérer l'élément hidedetail correspondant à cet utilisateur
        const hidedetailElement = event.target.parentElement.parentElement.querySelector('.hidedetail');
        console.log('Hidedetail element:', hidedetailElement);
        if (hidedetailElement && hidedetailElement.classList.contains('hidedetail')) {
            hidedetailElement.classList.toggle('show');
        }
    };
    
    const handleUserClickSelect = (user) => {
        setSelectedUsers((prevSelectedUsers) => {
            return prevSelectedUsers.includes(user.id) 
                ? prevSelectedUsers.filter((userId) => userId !== user.id)
                : [...prevSelectedUsers, user.id];
        });
    };

    return(
        <>
            <div className="content-container">
                {/* <h2>Liste des Utilisateurs</h2> */}
                <SearchUser />
                <section className="contact">
                    {users.map((user) => (
                        <div key={user.id}>
                            <section className="top">
                                <div className="align_items">
                                    <h3
                                        className={`nohide ${detailUser === user.id ? 'show' : ''}`}
                                        onClick={(event) => handleUserClick(user, event)}
                                    >
                                        {user.firm_name}
                                    </h3>
                                    <div 
                                        className={`slideOne ${selectedUsers.includes(user.id) ? 'slideOneChecked' : ''} ${selectedUsers.length > 0 ? 'selected' : ''}`} 
                                        onClick={() => handleUserClickSelect(user)}
                                    >
                                        <input type="checkbox" value="None" id={`slideOne_${user.id}`} name="check" checked={selectedUsers && selectedUsers.includes(user.id)} readOnly />
                                        <label htmlFor={`slideOne_${user.id}`}></label>
                                    </div>
                                </div>    
                                <div className="align_items">
                                    <div className="colomun_items">
                                        <p>Nom Contact</p>
                                        {/* Formatage de la date */}
                                        <p>{new Date(user.last_received_mail).toLocaleDateString()}</p>
                                    </div>
                                    <a href="/ajoutEntreprise">
                                        <img src="../../imagefront/888_edit.png" alt="edit"/>
                                    </a> 
                                </div>
                            </section>
                            <section className={`hidedetail ${detailUser === user.id ? 'show' : ''}`}>
                                <p>Email: {user.email}</p>
                                <p>Téléphone: {user.phone_number}</p>
                                <p>Identifiant: {user.id}</p>
                            </section>
                        </div>
                    ))}
                </section>
                <section class="ajoutUser">
                    <a href="/ajoutEntreprise" className="blue-background">
                        <IoAddCircleOutline />
                    </a>
                    <a href="#" className="blue-background" onClick={() => setShowModal(true)}>
                        <BiMailSend />
                    </a>
                </section>
            </div>

            {/* Modale pour les utilisateur selectionner */}
            <Modal isOpen={showModal}>
                <div className='modal-overlay'>
                    <div className='modal'>
                    <h3>Vous vous apprêtez à notifier :</h3>
                    {/* Affichez ici la liste des utilisateurs sélectionnés */}
                    <div className='listeEntrepriseSelect'>
                    {selectedUsers.map(userId => {
                        const selectedUser = users.find(user => user.id === userId);
                        return <div key={selectedUser.id}>{selectedUser.firm_name}</div>;
                    })}                    
                    </div>
                    <button onClick={() => setShowModal(false)}>Fermer</button>
                    <button>Envoyer</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}