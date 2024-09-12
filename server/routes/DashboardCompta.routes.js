const express = require('express');
const { getDashboardCompta, updateDashboardCompta } = require('../controllers/DashboardComptaController');
const { authMiddleware, checkRole } = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Route pour obtenir les données du tableau de bord comptabilité
// Accessible uniquement aux utilisateurs ayant le rôle de 'comptable'
router.get(
  '/', 
  authMiddleware, // Vérification de l'authentification
  checkRole(['comptable']), // Seuls les comptables peuvent accéder
  getDashboardCompta
);

// Route pour mettre à jour les données du tableau de bord comptabilité
// Accessible uniquement aux administrateurs
router.put(
  '/', 
  authMiddleware, // Vérification de l'authentification
  checkRole(['administrateur']), // Seuls les administrateurs peuvent mettre à jour
  updateDashboardCompta
);

module.exports = router;
