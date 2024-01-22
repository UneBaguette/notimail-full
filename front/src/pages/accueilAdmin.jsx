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
    const [mailSent, setMailSent] = useState(false);

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
    
    const handleMailSend = () => {
        // Assurez-vous qu'il y a au moins un utilisateur sélectionné
        if (selectedUsers.length === 0) {
            console.error('Aucun utilisateur sélectionné pour l\'envoi du courrier');
            return;
        }
    
        // Itérez sur chaque utilisateur sélectionné
        selectedUsers.forEach(userId => {
            const selectedUser = users.find(user => user.id === userId);
    
            // Votre code pour envoyer le courrier ici
            fetch(`http://localhost:3000/mail/received-mail/${selectedUser.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedUsers: [selectedUser.id],
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(`Mail sent successfully for user ${selectedUser.firm_name}:`, data);
    
                // Si c'est la dernière itération, marquez comme envoyé
                if (userId === selectedUsers[selectedUsers.length - 1]) {
                    setMailSent(true);
                    // Réinitialisez la liste des utilisateurs sélectionnés si nécessaire
                    setSelectedUsers([]);
                }
            })
            .catch(error => {
                console.error(`Error sending mail for user ${selectedUser.firm_name}:`, error);
    
                // Si c'est la dernière itération, marquez comme envoyé
                if (userId === selectedUsers[selectedUsers.length - 1]) {
                    // Réinitialisez la liste des utilisateurs sélectionnés si nécessaire
                    setSelectedUsers([]);
                }
            });
        });
    };
    
    return(
        <>
            <div className="content-container">
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
                    <div className="blue-background" onClick={() => setShowModal(true, users.find(user => user.id === selectedUsers[0]))}>
                        <BiMailSend />
                    </div>
                </section>
            </div>

            {/* Modale pour les utilisateur selectionner */}
            <Modal isOpen={showModal}>
                <div className='modal-overlay'>
                    <div className='modal'>
                        {mailSent ? (
                            <>
                                <h3>Courrier envoyé avec succès !</h3>
                                <button onClick={() => setShowModal(false)}>Fermer</button>
                            </>
                        ) : (
                            <>
                                <h3>Vous vous apprêtez à notifier :</h3>
                                <div className='listeEntrepriseSelect'>
                                    {selectedUsers.map(userId => {
                                        const selectedUser = users.find(user => user.id === userId);
                                        return <div key={selectedUser.id}>{selectedUser.firm_name}</div>;
                                    })}
                                </div>
                                <button onClick={() => setShowModal(false)}>Fermer</button>
                                <button
                                    className={mailSent ? "blue-background sent" : "blue-background send-button"}
                                    onClick={handleMailSend}
                                >
                                    Envoyer
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}