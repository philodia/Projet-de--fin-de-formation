// src/components/gestionnaireCommercial/Dashboard.js
import React from 'react';
import './Dashboard.css'; // Assurez-vous que le chemin d'accès est correct

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Tableau de Bord</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Vue d'ensemble</h2>
          <p>Bienvenue dans le tableau de bord. Ici, vous pouvez voir un aperçu de vos données.</p>
        </div>
        <div className="dashboard-card">
          <h2>Statistiques</h2>
          <p>Les statistiques de performance seront affichées ici.</p>
        </div>
        <div className="dashboard-card">
          <h2>Rapports récents</h2>
          <p>Les rapports récents et les activités importantes seront listés ici.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
