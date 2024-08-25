// src/components/gestionnaireCommercial/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBell, FaUserCircle, FaCog } from 'react-icons/fa';
import './Navbar.css'; // Assurez-vous que le chemin d'accès est correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Dashboard Gescom</h1>
        </div>
        <div className="navbar-menu">
          <div className="navbar-item">
            <FaBell className="navbar-icon" />
            <span className="badge">3</span> {/* Badge pour les notifications */}
          </div>
          <div className="navbar-item">
            <FaCog className="navbar-icon" />
          </div>
          <div className="navbar-item">
            <NavLink to="/profile" className="navbar-link">
              <FaUserCircle className="navbar-icon" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
