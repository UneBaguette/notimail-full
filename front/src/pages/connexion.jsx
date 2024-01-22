import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./connexion.css";

export const Connexion = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [selectedEntreprise, setSelectedEntreprise] = useState("");
  const [entreprise, setEntreprise] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/auth/firm_names`)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setEntreprise(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEntrepriseSelection = (e) => {
    const selectedEntreprise = e.target.value;
    setSelectedEntreprise(selectedEntreprise);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firm_name: selectedEntreprise,
          password: password,
        }),
      });

      if (response.ok) {
        const user = await response.json(); // Récupérer les informations de l'utilisateur depuis la réponse
        console.log("Authentification réussie", user);

        if (user.user.is_admin === true) {
          navigate(`/accueilAdmin`);
        } else {
          navigate(`/accueilUser`);
        }
      } else {
        console.error("Authentification échouée");
        setError("Identifiants incorrects");
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      setError("Erreur lors de l'authentification");
    }
  };

  return (
    <div className="container">
      {/* LOGO NOTIMAIL */}
      <img
        className="logonotimail"
        src="/imagefront/Nouveauprojet1.png"
        alt="Icon Notimail"
      />
      {/* MESSAGE D'ERREUR SI ID OU MP INCORECT */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* FORMAULAIRE DE CONNEXION */}
      <form className="formulaire" onSubmit={handleSubmit}>
        {/* CHOIX ENTREPRISE */}
        <label className="Entreprise">
          <select
            name="entreprise"
            value={selectedEntreprise}
            onChange={handleEntrepriseSelection}
          >
            <option className="entreprise" key="" value="">
              Entreprise
            </option>
            {entreprise.map((entreprise) => (
              <option key={entreprise} value={entreprise}>
                {entreprise}
              </option>
            ))}
          </select>

          {/* SPAN TIRET SEPARATION */}
          <span />
          <button id="entrepriseToggle" tabIndex="0">
            <img
              className="iconbas"
              src="/imagefront/pngtree-vector-down-arrow-icon-png-image_41849011.png"
              alt="icon fleche bas"
            />
          </button>
        </label>

        <br />
        <br />

        {/* LABEL PASSWORD */}
        <label>
          {/* INPUT POUR ENTRER LE PASSWORD */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* SPAN TIRET SEPARATION */}
          <span></span>

          {/* ICON CADENA */}
          <img
            className="cadenas"
            src="/imagefront/pngtree-black-padlock-png-image_37293241.png"
            alt="description de l'image"
          />
        </label>
      </form>
    </div>
  );
};
