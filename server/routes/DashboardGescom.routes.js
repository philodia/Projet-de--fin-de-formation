const express = require('express');
const { getDashboardData, updateDashboardData } = require('../controllers/DashboardGescomController');
const { authMiddleware, checkRole } = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Route pour obtenir les données du tableau de bord Gescom
router.get(
  '/',
  authMiddleware, // Vérification de l'authentification
  checkRole(['gestionnaire_commercial']), // Seuls les gestionnaires commerciaux peuvent accéder
  getDashboardData
);

// Route pour mettre à jour les données du tableau de bord Gescom
router.post(
  '/update',
  authMiddleware, // Vérification de l'authentification
  checkRole(['administrateur']), // Seul l'administrateur peut mettre à jour les données
  updateDashboardData
);

module.exports = router;
