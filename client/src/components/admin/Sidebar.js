// src/components/admin/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaDollarSign, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css'; // Assurez-vous que le chemin d'accès est correct

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/dashboard" activeClassName="active">
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" activeClassName="active">
            <FaUsers /> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/revenue" activeClassName="active">
            <FaDollarSign /> Revenue
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/analytics" activeClassName="active">
            <FaChartLine /> Analytics
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" activeClassName="active">
            <FaSignOutAlt /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;