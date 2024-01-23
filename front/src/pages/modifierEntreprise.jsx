import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import './modifierEntreprise.module.css';

export const ModifierEntreprise =()=>{
    const { id } = useParams();
    const [entreprise, setEntreprise] = useState("");
    const [nom, setNom] = useState("Nom");
    const [prenom, setPrenom] = useState("Prénom");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [identifiant, setIdentifiant] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
  
    const navigate = useNavigate();

    // Assurez-vous que le useEffect a le deuxième paramètre [id] pour qu'il se déclenche lorsque l'ID change.
    useEffect(() => {
        // Utilisez l'ID pour effectuer une requête pour récupérer les données de l'utilisateur
        fetch(`http://localhost:3000/user/users/${id}`, { credentials: 'include' })
        .then(result => result.json())
        .then(data => {
            // Mettez à jour l'état ou effectuez d'autres opérations avec les données de l'utilisateur
            console.log(data);
        })
        .catch(Error => {
            console.log(Error);
        });
    }, [id]);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const userData = {
        firm_name: entreprise,
        first_name: prenom,
        last_name: nom,
        phone_number: telephone,
        email: email,
        password: "",  // Note: You should handle password securely on the server side
        has_mail: true,
        is_admin: isAdmin
      };
  
      try {
        const response = await fetch('http://localhost:3000/user/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          // La requête a réussi
          const data = await response.json();
          console.log(data);  // Afficher la réponse du serveur
          navigate('/accueilAdmin');
        } else {
          // La requête a échoué
          console.error('Erreur lors de la requête POST');
        }
      } catch (error) {
        console.error('Erreur lors de la requête POST', error);
      }
    };
  
    const handleDelete = () => {
      // Logique de suppression ici
      console.log("Supprimer");
      navigate('/accueilAdmin'); // Appeler la fonction d'annulation pour revenir à la page d'accueil
    };
  
  
    return (
      <div >
        <img src="/imagefront/Nouveau-projet-2.png" alt="description de l'image" style={{ width: '10%' }} />
        <center>
          <div >
            <img className='fleche' src="/front/imagefront/cb5cab0bfc052025f4cc429df0098483.png" alt="description de l'image" style={{ width: '20%' }} />
            <p className='texte' >Entreprise</p>
          </div>
        </center>
  
        <div >
          <form onSubmit={handleSubmit}>
            <div >
              <label htmlFor="entreprise" >Entreprise :</label>
              <input
                color='#006C92'
                type="text"
                id="entreprise"
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
              />
            </div>
  
            <div>
              <div>
                <label htmlFor="contact" style={{ textAlign: 'right', color: '#006C92' }}>Contact :</label>
                <div >
                  <div>
                    <label htmlFor="nom"></label>
                    <input
                      type="text"
                      id="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                  <div >
                    <label htmlFor="prenom"></label>
                    <input
                      type="text"
                      id="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
  
            <div >
              <label htmlFor="telephone">Numéro de téléphone :</label>
              <input
                type="tel"
                id="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
  
            <div>
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div>
              <label htmlFor="identifiant" style={{ textAlign: 'right', color: '#006C92' }}>Identifiant :</label>
              <input
                type="text"
                id="identifiant"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
              />
            </div>
  
            <div >
              <label htmlFor="isAdmin" >Admin :</label>
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                style={{ marginTop: '5px' }}
              />
            </div>
  
            <div >
              <div >
                <button type="button" onClick={handleDelete}>
                  Supprimer
                </button>
                <div ></div> {/* Espace entre les boutons */}
                <button type="button" onClick={handleSubmit}>
                  Terminer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}