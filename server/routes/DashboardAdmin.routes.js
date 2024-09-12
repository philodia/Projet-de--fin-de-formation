// routes/DashboardAdmin.routes.js

const express = require('express');
const router = express.Router();
const {
  getDashboardAdmin,
  updateDashboardAdmin,
  createDashboardAdminController
} = require('../controllers/DashboardAdminController');

// Middleware pour vérifier l'authentification et les rôles
const { authMiddleware, checkRole } = require('../middlewares/AuthMiddleware');

/**
 * Route pour obtenir les données du tableau de bord administrateur
 * Accessible uniquement aux administrateurs.
 */
router.get(
  '/',
  authMiddleware,             // Vérification du token d'authentification
  checkRole(['administrateur']), // Vérification du rôle 'administrateur'
  getDashboardAdmin             // Contrôleur qui gère la logique métier
);

/**
 * Route pour mettre à jour les données du tableau de bord administrateur
 * Accessible uniquement aux administrateurs.
 */
router.put(
  '/',
  authMiddleware,              // Vérification du token d'authentification
  checkRole(['administrateur']), // Vérification du rôle 'administrateur'
  updateDashboardAdmin          // Contrôleur qui gère la mise à jour
);

/**
 * Route pour créer un nouveau tableau de bord administrateur
 * Accessible uniquement aux administrateurs.
 */
router.post(
  '/',
  authMiddleware,               // Vérification du token d'authentification
  checkRole(['administrateur']),  // Vérification du rôle 'administrateur'
  createDashboardAdminController  // Contrôleur qui gère la création
);

module.exports = router;
