const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middlewares/AuthMiddleware'); // Assurez-vous que ce middleware est bien défini pour l'authentification

// Route d'inscription
router.post('/register', AuthController.register);

// Route de connexion
router.post('/login', AuthController.login);

// Route pour obtenir tous les utilisateurs (nécessite une authentification)
router.get('/users', AuthMiddleware, AuthController.getUsers);

// Route pour mettre à jour un utilisateur (nécessite une authentification)
router.put('/users/:id', AuthMiddleware, AuthController.updateUser);

// Route pour supprimer un utilisateur (nécessite une authentification)
router.delete('/users/:id', AuthMiddleware, AuthController.deleteUser);

// Route pour la déconnexion (peut nécessiter une authentification pour valider la déconnexion)
router.post('/logout', AuthMiddleware, AuthController.logout);

// Route pour vérifier le statut de connexion (nécessite une authentification)
router.get('/status', AuthMiddleware, AuthController.checkStatus);

module.exports = router;
