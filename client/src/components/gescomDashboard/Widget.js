// src/components/gestionnaireCommercial/Widget.js
import React from 'react';
import './Widget.css'; // Assurez-vous que le chemin d'accès est correct

const Widget = ({ title, value, icon }) => {
  return (
    <div className="widget">
      <div className="widget-icon">{icon}</div>
      <div className="widget-content">
        <h3 className="widget-title">{title}</h3>
        <p className="widget-value">{value}</p>
      </div>
    </div>
  );
};

export default Widget;