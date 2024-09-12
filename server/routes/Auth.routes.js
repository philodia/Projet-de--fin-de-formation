const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { authMiddleware, checkRole } = require('../middlewares/AuthMiddleware');

// Route d'inscription (accessible uniquement aux administrateurs avec la permission de création)
router.post('/register', authMiddleware, checkRole(['administrateur'], { canCreate: true }), AuthController.register);

// Route pour créer un administrateur (accessible uniquement aux administrateurs avec les permissions nécessaires)
router.post('/create-admin', authMiddleware, checkRole(['administrateur'], { canCreate: true }), AuthController.createAdmin);

// Route de connexion (accessible à tous)
router.post('/login', AuthController.login);

// Route pour obtenir tous les utilisateurs (accessible uniquement aux administrateurs)
router.get('/users', authMiddleware, checkRole(['administrateur']), AuthController.getUsers);

// Route pour mettre à jour un utilisateur (accessible uniquement aux administrateurs)
router.put('/users/:id', authMiddleware, checkRole(['administrateur']), AuthController.updateUser);

// Route pour supprimer un utilisateur (accessible uniquement aux administrateurs)
router.delete('/users/:id', authMiddleware, checkRole(['administrateur']), AuthController.deleteUser);

// Route pour la déconnexion (nécessite une authentification)
router.post('/logout', authMiddleware, AuthController.logout);

// Route pour vérifier le statut de connexion (nécessite une authentification)
router.get('/status', authMiddleware, AuthController.checkStatus);

module.exports = router;
