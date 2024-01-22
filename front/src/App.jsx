import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccueilAdmin } from "./pages/accueilAdmin";
import { AccueilUser } from "./pages/accueilUser";
import { Connexion } from "./pages/connexion";
import { NavBar } from "./pages/Navbar";
import { AjoutEntreprise } from "./pages/ajoutEntreprise";
import Modal from 'react-modal';

const App = () => {
  // Initialisation des mon modal qui est lié à la div #root
  Modal.setAppElement('#root');

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/accueilUser" element={<AccueilUser />} />
        <Route path="/accueilAdmin" element={<AccueilAdmin />} />
        <Route path="/ajoutEntreprise" element={<AjoutEntreprise />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App; // Exportez le composant par défaut
