import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import './modifiersEntreprise.css';

export const ModifierEntreprise = () => {
  const { id } = useParams();
  const [entreprise, setEntreprise] = useState("");
  const [nom, setNom] = useState("Nom");
  const [prenom, setPrenom] = useState("Prénom");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/user/users/${id}`, { credentials: 'include' })
      .then(result => result.json())
      .then(data => {
        setEntreprise(data.firm_name);
        setNom(data.last_name);
        setPrenom(data.first_name);
        setTelephone(data.phone_number);
        setEmail(data.email);
        setIdentifiant(data.identifiant);
        setIsAdmin(data.is_admin);
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération des détails de l'utilisateur ${id}:`, error);
      });
  }, [id]);

  const handleSave = () => {
    const userData = {
      firm_name: entreprise,
      last_name: nom,
      first_name: prenom,
      phone_number: telephone,
      email: email,
      identifiant: identifiant,
      is_admin: isAdmin
    };

    fetch(`http://localhost:3000/user/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Utilisateur mis à jour avec succès:', data);
      // Vous pouvez ajouter des messages de succès ou rediriger l'utilisateur ici
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis !");
    // Ajoutez le reste de votre logique de soumission ici
  };
  return (
    <div>
      <img className='description' src="/imagefront/Nouveau-projet-2.png" alt="description de l'image" />
      <center>
        <div>
          <img className='fleche' src="/front/imagefront/cb5cab0bfc052025f4cc429df0098483.png" alt="description de l'image" />
          <p className='texte'>Entreprise</p>
        </div>
      </center>

      <div>
        <form onSubmit={handleSubmit} className="form-vertical">
          <div className="form-group">
            <label className='antreprise label-input' htmlFor="entreprise">Entreprise :</label>
            <input
              type="text"
              id="entreprise"
              value={entreprise}
              onChange={(e) => setEntreprise(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className='contact label-input' htmlFor="contact">Contact :</label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="form-control"
              placeholder="Nom"
            />
            <input
              type="text"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="form-control"
              placeholder="Prénom"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telephone">Numéro de téléphone :</label>
            <input
              type="tel"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className='identifiant label-input' htmlFor="identifiant">Identifiant :</label>
            <input
              type="text"
              id="identifiant"
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className='admin' htmlFor="isAdmin">Admin :</label>
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
          </div>
 
          {/* Bouton "Enregistrer" */}
          <div className="form-group">
            <button type="button" onClick={handleSave} className="btn btn-dark btn-save">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
