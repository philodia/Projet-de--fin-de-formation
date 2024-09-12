// routes/Product.routes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware, checkRole } = require('../middlewares/AuthMiddleware');

// Route pour créer un produit (réservée aux administrateurs)
router.post('/', authMiddleware, checkRole(['administrateur'], { canCreate: true }), ProductController.createProduct);

// Route pour obtenir tous les produits
router.get('/', ProductController.getProducts);

// Route pour obtenir un produit par ID
router.get('/:id', ProductController.getProductById);

// Route pour mettre à jour un produit (réservée aux administrateurs)
router.put('/:id', authMiddleware, checkRole(['administrateur'], { canUpdate: true }), ProductController.updateProduct);

// Route pour supprimer un produit (réservée aux administrateurs)
router.delete('/:id', authMiddleware, checkRole(['administrateur'], { canDelete: true }), ProductController.deleteProduct);

module.exports = router;
