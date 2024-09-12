// src/components/admin/InfoCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './InfoCard.css'; // Assurez-vous d'importer le fichier CSS pour les styles

// Importer des icônes spécifiques si nécessaire
import { FaUser, FaDollarSign, FaChartLine } from 'react-icons/fa';

function InfoCard({ title, value, icon: Icon, color }) {
  return (
    <Card className="info-card mb-4" style={{ borderLeft: `5px solid ${color}` }}>
      <Card.Body>
        <div className="d-flex align-items-center">
          {Icon && <Icon className="info-card-icon" style={{ color }} />}
          <div className="ml-3">
            <Card.Title className="info-card-title">{title}</Card.Title>
            <Card.Text className="info-card-value">{value}</Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
