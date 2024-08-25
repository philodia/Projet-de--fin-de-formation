// src/components/gestionnaireCommercial/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaShoppingCart, FaChartLine, FaSignOutAlt, FaFileInvoice, FaBoxOpen } from 'react-icons/fa';
import './Sidebar.css'; // Assurez-vous que le chemin d'accès est correct

const Sidebar = () => {
  // Fonction pour ajouter une classe active
  const getClassName = ({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link');

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Gestionnaire Commercial</h3>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <NavLink to="/dashboard" className={getClassName}>
            <FaTachometerAlt className="sidebar-icon" /> Tableau de Bord
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/clients" className={getClassName}>
            <FaUser className="sidebar-icon" /> Clients
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/orders" className={getClassName}>
            <FaShoppingCart className="sidebar-icon" /> Commandes
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/delivery-notes" className={getClassName}>
            <FaBoxOpen className="sidebar-icon" /> Bons de Livraison
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/invoices" className={getClassName}>
            <FaFileInvoice className="sidebar-icon" /> Factures
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/reports" className={getClassName}>
            <FaChartLine className="sidebar-icon" /> Rapports
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/logout" className={getClassName}>
            <FaSignOutAlt className="sidebar-icon" /> Déconnexion
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
