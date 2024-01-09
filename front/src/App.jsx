import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccueilAdmin } from "./pages/accueilAdmin";
import { Mail } from "./pages/mail";
import { AccueilUser } from "./pages/accueilUser";
import { Connexion } from "./pages/connexion";
import { Confirm } from "./pages/confirm";
import { User } from "./pages/user";
import { Edit } from "./pages/edit";
import { NavBar } from "./pages/Navbar";

const App = () => {
  useEffect(() => {
    document.title = "Notimail";
  }, []);

  const [userData, setUserData] = useState(null);

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/accueilUser/:id" element={<AccueilUser />} />
        <Route path="/accueilAdmin/:id" element={<AccueilAdmin />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/user" element={<User />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; // Exportez le composant par défaut
