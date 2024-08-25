// src/components/admin/Widget.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './Widget.css'; // Assurez-vous d'importer le fichier CSS pour les styles

function Widget({ title, value, icon }) {
  return (
    <Card className="widget mb-4">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="widget-icon">{icon}</div>
          <div className="ml-3">
            <Card.Title className="widget-title">{title}</Card.Title>
            <Card.Text className="widget-value">{value}</Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Widget;
