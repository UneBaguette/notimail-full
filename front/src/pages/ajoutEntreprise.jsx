import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export const AjoutEntreprise = ({ onSubmit, onCancel }) => {
  const [entreprise, setEntreprise] = useState("");
  const [nom, setNom] = useState("Nom");
  const [prenom, setPrenom] = useState("Prénom");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <img src="/imagefront/Nouveau-projet-2.png" alt="description de l'image" style={{ width: '10%' }} />
      <center>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img className='fleche' src="/front/imagefront/cb5cab0bfc052025f4cc429df0098483.png" alt="description de l'image" style={{ width: '20%' }} />
          <p className='texte' style={{ /* Styles pour le texte */ }}>Entreprise</p>
        </div>
      </center>

      <div style={{ width: '50%', border: '1px solid #ccc', borderRadius: '52px', padding: '20px', marginTop: '20px', backgroundColor: '#E3E3E3' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="entreprise" style={{ textAlign: 'right', color: '#006C92' }}>Entreprise :</label>
            <input
              color='#006C92'
              type="text"
              id="entreprise"
              value={entreprise}
              onChange={(e) => setEntreprise(e.target.value)}
              style={{ width: '70%', height: '30px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="contact" style={{ textAlign: 'right', color: '#006C92' }}>Contact :</label>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                  <label htmlFor="nom" style={{ textAlign: 'right', color: '#006C92', marginRight: '10px' }}></label>
                  <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    style={{ width: '100%', height: '30px' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                  <label htmlFor="prenom" style={{ textAlign: 'right', color: '#006C92', marginRight: '10px' }}></label>
                  <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    style={{ width: '100%', height: '30px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="telephone" style={{ textAlign: 'right', color: '#006C92' }}>Numéro de téléphone :</label>
            <input
              type="tel"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              style={{ width: '70%', height: '30px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="email" style={{ textAlign: 'right', color: '#006C92' }}>Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '70%', height: '30px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="identifiant" style={{ textAlign: 'right', color: '#006C92' }}>Identifiant :</label>
            <input
              type="text"
              id="identifiant"
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              style={{ width: '70%', height: '30px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <label htmlFor="isAdmin" style={{ marginRight: '5px', textAlign: 'right', color: '#006C92' }}>Admin :</label>
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              style={{ marginTop: '5px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '50%' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button type="button" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleDelete}>
                Supprimer
              </button>
              <div style={{ width: '40px' }}></div> {/* Espace entre les boutons */}
              <button type="button" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleSubmit}>
                Terminer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
