import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccueilAdmin } from "./pages/accueilAdmin";
import { Mail } from "./pages/mail";
import { AccueilUser } from "./pages/accueilUser";
import { Connexion } from "./pages/connexion";
import { Confirm } from "./pages/confirm";
import { User } from "./pages/user";
import { Edit } from "./pages/edit";
import { NavBar } from "./pages/Navbar";
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
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/user" element={<User />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; // Exportez le composant par défaut
