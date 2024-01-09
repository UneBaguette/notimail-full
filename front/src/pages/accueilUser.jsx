import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from "./Navbar"
import './acceilUser.css';

export const AccueilUser=()=>{
    
    return(
        <>
            <NavBar />

            <img className='cercle' src="/imagefront/44849e8b90ebf9de43ed123e14a739b0.png" alt="description de l'image" />
        </>
    )
}