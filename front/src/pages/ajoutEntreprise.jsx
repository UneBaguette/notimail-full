import React, { useState } from 'react';

export const AjoutEntreprise = ({ onSubmit }) => {
  const [entreprise, setEntreprise] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [identifiant, setIdentifiant] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      entreprise,
      nom,
      prenom,
      telephone,
      email,
      identifiant,
    };

    // Appeler la fonction de soumission du formulaire parent
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Ajout d'entreprise</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="entreprise" style={{ textAlign: 'right' }}>Nom de l'entreprise :</label>
          <textarea
            id="entreprise"
            value={entreprise}
            onChange={(e) => setEntreprise(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nom" style={{ textAlign: 'right' }}>Nom du contact :</label>
          <textarea
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prenom" style={{ textAlign: 'right' }}>Prénom du contact :</label>
          <textarea
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="telephone" style={{ textAlign: 'right' }}>Numéro de téléphone :</label>
          <textarea
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" style={{ textAlign: 'right' }}>Email :</label>
          <textarea
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="identifiant" style={{ textAlign: 'right' }}>Identifiant :</label>
          <textarea
            id="identifiant"
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
          />
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};
