import React, { useState } from 'react';
import './ajoutEntreprise.css';

export const AjoutEntreprise = ({ onSubmit }) => {
  const [entreprise, setEntreprise] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const maskText = (text) => {
    return '•'.repeat(text.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      entreprise,
      nom,
      prenom,
      telephone,
      email,
      identifiant,
      isAdmin,
    };

    // Appeler la fonction de soumission du formulaire parent
    onSubmit(formData);
  };

  const handleDelete = () => {
    // Logique de suppression ici
    console.log("Supprimer");
  };

  const handleFinish = () => {
    // Logique de terminaison ici
    console.log("Terminer");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Ajout de l'image centrée en haut avec arrière-plan bleu */}
        <img src="/imagefront/Nouveau-projet-2.png" alt="description de l'image" style={{ width: '10%' }} />
        <center>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img className='fleche' src="/imagefront/cb5cab0bfc052025f4cc429df0098483.png" alt="description de l'image" style={{ width: '20%' }} />
    <p className='texte'>Entreprise</p>
  </div>
</center>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', justifyContent: 'center', width: '50%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <label htmlFor="entreprise">Nom de l'entreprise :</label>
          <input
            type="text"
            id="entreprise"
            value={maskText(entreprise)}
            onChange={(e) => setEntreprise(e.target.value)}
            style={{ width: '50%', height: '30px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <label htmlFor="nom">Nom du contact :</label>
          <input
            type="text"
            id="nom"
            value={maskText(nom)}
            onChange={(e) => setNom(e.target.value)}
            style={{ width: '50%', height: '30px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <label htmlFor="prenom">Prénom du contact :</label>
          <input
            type="text"
            id="prenom"
            value={maskText(prenom)}
            onChange={(e) => setPrenom(e.target.value)}
            style={{ width: '50%', height: '30px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <label htmlFor="telephone">Numéro de téléphone :</label>
          <input
            type="tel"
            id="telephone"
            value={maskText(telephone)}
            onChange={(e) => setTelephone(e.target.value)}
            style={{ width: '50%', height: '30px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={maskText(email)}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '50%', height: '30px' }}
          />
        </div>

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
  <label htmlFor="identifiant">Identifiant :</label>
  <input
    type="text"
    id="identifiant"
    value={maskText(identifiant)}
    onChange={(e) => setIdentifiant(e.target.value)}
    style={{ width: '50%', height: '30px' }}
  />
</div>
<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
  <label htmlFor="isAdmin" style={{ marginRight: '5px' }}>Admin :</label>
  <input
    type="checkbox"
    id="isAdmin"
    checked={isAdmin}
    onChange={() => setIsAdmin(!isAdmin)}
    style={{ marginTop: '5px' }}
  />
</div>



<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
  <div style={{ display: 'flex', gap: '5px' }}>
    <button type="button" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleDelete}>
      Supprimer
    </button>
    {/* Ajout de la séparation */}
    <div style={{ width: '5px' }}></div>
    <button type="button" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleFinish}>
      Terminer
    </button>
  </div>
</div>
</form>
    </div>
  );
};
