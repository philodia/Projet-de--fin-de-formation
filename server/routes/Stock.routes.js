// routes/Stock.routes.js

const express = require('express');
const router = express.Router();
const StockController = require('../controllers/StockController');
const { authMiddleware, checkRole } = require('../middlewares/AuthMiddleware');

// Route pour créer un stock (réservé aux administrateurs)
router.post('/', authMiddleware, checkRole(['administrateur'], { canCreate: true }), StockController.createStock);

// Route pour obtenir tous les stocks
router.get('/', authMiddleware, StockController.getStocks);

// Route pour mettre à jour un stock (réservé aux administrateurs)
router.put('/:id', authMiddleware, checkRole(['administrateur'], { canUpdate: true }), StockController.updateStock);

// Route pour supprimer un stock (réservé aux administrateurs)
router.delete('/:id', authMiddleware, checkRole(['administrateur'], { canDelete: true }), StockController.deleteStock);

module.exports = router;
